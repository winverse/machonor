"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sequelize = require("sequelize");
const database_1 = require("database");
const common_1 = require("lib/common");
class JusticePosts {
    static postsWrite({ title, postGoal, writerDisclosure, body, fk_user_id, urlSlug, }) {
        const { Model } = this;
        return Model.build({
            title,
            postGoal,
            writerDisclosure,
            body,
            fk_user_id,
            urlSlug,
        }).save();
    }
}
JusticePosts.init = (sequelize, Sequelize) => {
    const Model = sequelize.define('JusticePosts', {
        id: common_1.primaryUUID,
        title: Sequelize.STRING,
        postGoal: Sequelize.STRING,
        writerDisclosure: Sequelize.BOOLEAN,
        body: Sequelize.TEXT,
        urlSlug: Sequelize.STRING,
        fk_user_id: Sequelize.UUID,
    }, {
        timestamps: true,
        paranoid: true,
        tableName: 'JusticePosts',
    });
    Model.associate = (models) => {
        Model.belongsTo(models.User, {
            foreignKey: 'fk_user_id',
            onDelete: 'restrict',
            onUpdate: 'restrict',
        });
    };
    return Model;
};
JusticePosts.Model = JusticePosts.init(database_1.sequelize, Sequelize);
exports.default = JusticePosts;
//# sourceMappingURL=JusticePosts.js.map