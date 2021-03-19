const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const path = require("path");
const morgan = require("morgan");
const methodOverride = require("method-override");
const _handlebars = require("handlebars");
const {allowInsecurePrototypeAccess} = require("@handlebars/allow-prototype-access");
const exhbs = require("express-handlebars");
const {conditionHelper, stringify} = require("./helpers/hbs");
const bodyParser = require("body-parser");
const db = require("./models");
const TreeMap = require("treemap-js");

// routes
const user = require("./routes/user");

// db
const {sequelize} = require("./models");


let hbs = exhbs.create({
    handlebars: allowInsecurePrototypeAccess(_handlebars),
    helpers: {
        conditionHelper: conditionHelper,
        stringify: stringify,
    }
})

// method override
app.use(methodOverride("_method"));

app.set("view engine", "handlebars");
app.engine("handlebars", hbs.engine);

// morgan for server log
app.use(morgan("dev"));

// public path set up
app.use(express.static(path.join(__dirname, "public")));


// body-parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// db
sequelize.sync({force: false})
    .then(() => {
        console.log("DB connection is successful..");
    })
    .catch(err => {
        console.log(err);
    });


// app.set("view engine", "handlebars");
// app.engine("handlebars", hbs.engine);

// error middleware set up
/*
app.use((req,res,next)=>{
    const error = new Error(`${req.method} ${req.url} no routes exists`);
    error.status = 404;
    next(error);
});
*/

/*

app.use((err, req,res, next) => {
    res.locals.message = err.message;

    // if production env, then hide error messages;
    res.locals.error = process.env.NODE_ENV !== "production" ? err : {};
    res.status(err.status || 500);
    res.render("error");
});
*/


app.get("/", (req, res) => {
    let status = {}
    db.sequelize.query(`select users.id
                             , users.name
                             , users.age
                             , users.married
                             , users.created_at
                             , comments.commenter
                             , comments.comment
                             , comments.id as commentId
                        from users
                        left join comments
                        on users.id = comments.commenter;
    `, {
        type: db.sequelize.QueryTypes.SELECT
    }).then(users => {

        // 중복되는 데이터를 어떻게 제거해야 할까 -> set or map 으로 해결하자
        // set과 map 중에서도 key를 써야 한다면 map 을 사용하는 것이 옳다.
        // 키를 기준으로, 데이터 세트를 저장하고 싶다.

        // 데이터가 많은가 많지 않을 것이다. 너무 많으면 limit 을 사용해서 끊어서 가져올것이다. 어차피 사용자도 한번에 보는 것이 아님
        // const userAttrs = Object.keys(users);

        // 입력이 그닥 많진 많을거니까
        const newuser = [];
        const userList = new Map();
        for (let i=0; i < users.length; i++){

            // 중복을 제거하기 위해서, map에 한번 담았다가 꺼내준다.
            let user= {};
            user[users[i].name] = users[i];
            userList.set(users[i].name, users[i]);
        }

        // while 문을 사용하는 걸 못찾겠다.
        for(let [key, value] of userList.entries()){
            newuser.push(value);
        }

        // 코멘트 쓴 사람만 보여준다.
        // 트리맵을 사용해서, 시간순으로 정렬해서 보내준다.
        const comments = [];
        for (let i=0; i < users.length; i++){
            if (users[i].commenter != null){
                comments.push(users[i]);
            }
        }

        // usercomments
        status.comments = comments;
        status.users = newuser;
        status.conditionHelper;
        status.stringify;

    }).catch(err => {
        status.errors = err;
    }).finally(() => {
        res.render("index/home", status);
    })
})
app.use("/user", user)
app.listen(port, () => {
    console.log(`server is now running on port: ${port}`)
})