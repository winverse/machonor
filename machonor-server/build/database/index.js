"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sequelize = require("sequelize");
const { MYSQL_PW } = process.env;
const operatorsAliases_1 = require("./operatorsAliases");
exports.sequelize = new Sequelize('webuy', 'root', MYSQL_PW, {
    operatorsAliases: operatorsAliases_1.default,
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
    port: 3306,
    timezone: 'Asia/Seoul',
    define: {
        freezeTableName: false,
    },
});
const models_1 = require("database/models");
function associate() {
    const models = {
        User: models_1.User.Model,
        UserProfile: models_1.UserProfile.Model,
        JusticePosts: models_1.JusticePosts.Model,
        FreePosts: models_1.FreePosts.Model,
        FreePostLike: models_1.FreePostLike.Model,
        FreeComments: models_1.FreeComments.Model,
        FreeCommentLike: models_1.FreeCommentLike.Model,
    };
    Object.values(models).map((model) => {
        if (model.associate) {
            model.associate(models);
        }
    });
}
function sync() {
    associate();
    exports.sequelize.sync();
}
exports.sync = sync;
//# sourceMappingURL=index.js.map