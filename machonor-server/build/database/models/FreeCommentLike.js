"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sequelize = require("sequelize");
const database_1 = require("database");
const common_1 = require("lib/common");
class FreeCommentsLike {
    static checkExists({ userId, commentId }) {
        const { Model } = this;
        return Model.findOne({
            where: {
                fk_comment_id: commentId,
                fk_user_id: userId,
            },
            raw: true,
            attributes: ['id'],
        }).then((data) => {
            return data;
        });
    }
    static createLike({ userId, commentId }) {
        const { Model } = this;
        return Model.build({
            fk_user_id: userId,
            fk_comment_id: commentId,
        }).save();
    }
    static deletedLike({ userId, commentId }) {
        const { Model } = this;
        return Model.destroy({
            where: {
                fk_user_id: userId,
                fk_comment_id: commentId,
            },
        });
    }
    static findByIdCount(commentId) {
        const { Model } = this;
        return Model.count({
            where: {
                fk_comment_id: commentId,
            },
        });
    }
}
FreeCommentsLike.init = (sequelize, Sequelize) => {
    const Model = sequelize.define('FreeCommentLike', {
        id: common_1.primaryUUID,
        fk_comment_id: Sequelize.UUID,
        fk_user_id: Sequelize.UUID,
    }, {
        timestamps: false,
        tableName: 'FreeCommentLike',
    });
    Model.associate = (models) => {
        Model.belongsTo(models.User, {
            foreignKey: 'fk_user_id',
            onDelete: 'CASCADE',
            onUpdate: 'restrict',
        });
        Model.belongsTo(models.FreeComments, {
            foreignKey: 'fk_comment_id',
            onDelete: 'CASCADE',
            onUpdate: 'restrict',
        });
    };
    return Model;
};
FreeCommentsLike.Model = FreeCommentsLike.init(database_1.sequelize, Sequelize);
exports.default = FreeCommentsLike;
//# sourceMappingURL=FreeCommentLike.js.map