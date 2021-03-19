const express = require("express");
const router = express.Router();

const db = require("../models/");
const user = require("../models/user");
const {stringify} = require("../helpers/hbs");


router.get("/", (req, res) => {
    db.sequelize.query('select id, name, age, married from users', {
        type: db.sequelize.QueryTypes.SELECT
    }).then(user => {
        console.log(user)
    }).catch(err => {
        console.log(err);
    })
})


router.post("/signup", (req, res, next) => {
    // db에 저장
    let isMarried = req.body.isMarried === "on" ? 1 : 0;
    let newuser = {
        name: req.body.name,
        age: req.body.age,
        isMarried: isMarried
    }

    // db 추가
    db.sequelize.query('insert into users (name, age, married )values (?)', {
        replacements: [[newuser.name, newuser.age, newuser.isMarried]],
        type: db.sequelize.QueryTypes.INSERT
    }).then(() => {
        res.status(201)
            .redirect("/");
    }).catch((err) => {
        console.log(err);
    });
})

// comment
router.post("/comments", (req, res) => {
    let newComment = {}
    newComment.name = req.body.name;
    newComment.content = req.body.comment;

    // id 가 먼저 있는 지 검색부터 한다.
    db.sequelize.query('select id from users where name=?', {
        type: db.sequelize.QueryTypes.SELECT,
        replacements: [[newComment.name]]
    }).then(result => {
        const id = result[0].id ? result[0].id : new Error({message: "null"})
        db.sequelize.query('insert into comments (comment, commenter) values (?)', {
            replacements: [[newComment.content, id]],
            type: db.sequelize.QueryTypes.INSERT
        })
            .then()
            .catch(err => {
                new Error("no user");
            })
    }).catch(err => {
        console.log(err);
    }).finally(() => {
        res.status(201)
            .redirect("/");
    })
})

router.get("/comment/edit/:commentId", (req, res)=>{
    let status = {};
    db.sequelize.query(`select users.id, users.name, comments.commenter, comments.comment, comments.id as commentId  
                        from comments 
                        left join users on comments.commenter = users.id where comments.id=?`,{
        replacements: [[req.params.commentId]],
        type:db.sequelize.QueryTypes.SELECT
    }).then((user)=>{
        console.log(user);
        status.user = user[0];
        status.stringify = stringify;
    }).catch((err)=>{
        console.log(err);
    }).finally(()=>{
        res.render("users/edit", status);
    })

})

router.put("/comment/edit/:commentId", (req, res) => {
    // 수정

    // 해당 아이디를 먼저 탐색한다.
    // 수정 사항이 날라올 떄, 바로 db문을 실행시켜도 되나
    db.sequelize.query(`update comments set comment=? where id=? `, {
        replacements: [[req.body.comment], [req.params.commentId]],
        type:db.sequelize.QueryTypes.SELECT
    }).then((msg)=>{
        // flash 메시지를 달아주자
        console.log(msg);
        res.redirect("/");
    }).catch((err)=>{
        // 에러처리
        console.log(err)
        res.redirect("/");
    })
})

// delete page, to check if this user trying to delete messages is authorized
router.get("/comment/delete/:commentId", (req, res)=>{
    console.log(req.params.commentId);
    res.render("users/delete", {id: req.params.commentId});
})

// delete request
router.delete("/comment/delete/:commentId", (req, res) => {
    // 삭제
    let msg= [];
    let status = {};


    /**
     * 여기를 수정해야 한다.
     * 서브쿼리를 이용해서 해야 할 것 같긴한데..
     */
    db.sequelize.query(`delete from comments where id=?`, {
        replacements: [[req.params.commentId ], [req.body.signature]],
        type: db.sequelize.QueryTypes.DELETE
    }).then(result =>{
        status.msg = ["delete success!"];
        res.redirect("/");
    }).catch(err=>{
        // error 메시지
        status.msg = ["delete fail"];
        res.redirect("/");
    })

})

module.exports = router;

