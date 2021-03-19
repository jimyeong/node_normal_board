const Sequelize = require("sequelize");

module.exports = class User extends Sequelize.Model {
    // static 프로그램 실행시, 클래스들이 메모리에 적재될 때, 딱 한번 실행되고 , 프로그램이 종료 될 떄 메모리에서 삭제된다.

    static init(sequelize) {
        return super.init({
                name: {
                    type: Sequelize.STRING(20),
                    allowNull: false,
                    unique: true
                },
                age: {
                    type: Sequelize.INTEGER.UNSIGNED,
                    allowNull: false
                },
                married: {
                    type: Sequelize.BOOLEAN,
                    allowNull: false,
                },
                comment: {
                    type: Sequelize.TEXT,
                    allowNull: true
                },
                created_at: {
                    type: Sequelize.DATE,
                    allowNull: false,
                    defaultValue: Sequelize.NOW
                }
            }, {
                sequelize,
                timestamps: false,
                underscored: false,
                modelName: "User",
                tableName: "users",
                paranoid: false,
                charset:"utf8",
                collate: "utf8_general_ci"

            }
        )
    }
    static associate(db){
        db.User.hasMany(db.Comment, {foreignKey: "commenter", sourceKey: "id"});
    };
}