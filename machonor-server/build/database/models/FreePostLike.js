"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sequelize = require("sequelize");
const database_1 = require("database");
const common_1 = require("lib/common");
class FreePostLike {
    static checkExists({ userId, postId }) {
        const { Model } = this;
        return Model.findOne({
            where: {
                fk_post_id: postId,
                fk_user_id: userId,
            },
            raw: true,
            attributes: ['id'],
        }).then((data) => {
            return data ? true : false;
        });
    }
    static createLike({ userId, postId }) {
        const { Model } = this;
        return Model.build({
            fk_user_id: userId,
            fk_post_id: postId,
        }).save();
    }
    static deletedLike({ userId, postId }) {
        const { Model } = this;
        return Model.destroy({
            where: {
                fk_user_id: userId,
                fk_post_id: postId,
            },
        });
    }
    static postLikesCount(postId) {
        const { Model } = this;
        return Model.count({
            where: {
                fk_post_id: postId,
            },
        });
    }
}
FreePostLike.init = (sequelize, Sequelize) => {
    const Model = sequelize.define('FreePostLike', {
        id: common_1.primaryUUID,
        fk_post_id: Sequelize.UUID,
        fk_user_id: Sequelize.UUID,
    }, {
        timestamps: false,
        tableName: 'FreePostLike',
    });
    Model.associate = (models) => {
        Model.belongsTo(models.User, {
            foreignKey: 'fk_user_id',
            onDelete: 'CASCADE',
            onUpdate: 'restrict',
        });
        Model.belongsTo(models.FreePosts, {
            foreignKey: 'fk_post_id',
            onDelete: 'CASCADE',
            onUpdate: 'restrict',
        });
    };
    return Model;
};
FreePostLike.Model = FreePostLike.init(database_1.sequelize, Sequelize);
exports.default = FreePostLike;
//# sourceMappingURL=FreePostLike.js.map