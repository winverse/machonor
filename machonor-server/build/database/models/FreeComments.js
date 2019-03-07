"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sequelize = require("sequelize");
const database_1 = require("database");
const common_1 = require("lib/common");
const models_1 = require("database/models");
class FreeComments {
    static writeComment({ text, postId, userId, replyTo, level, displayname, anonymous, password, ipAddress, }) {
        const { Model } = this;
        return Model.build({
            text,
            replyTo,
            level,
            displayname,
            anonymous,
            password,
            ipAddress,
            fk_post_id: postId,
            fk_user_id: userId,
        }).save();
    }
    static async findById(commentId) {
        const { Model } = this;
        return Model.findOne({
            include: [{
                    model: models_1.User.Model,
                    include: [{ model: models_1.UserProfile.Model, attributes: ['amount'] }],
                    attributes: ['id'],
                }],
            where: {
                id: commentId,
            },
            attributes: [
                'fk_post_id',
                'id',
                'text',
                'displayname',
                'level',
                'likesCount',
                'password',
                'anonymous',
                'replyTo',
                'hasReply',
                'createdAt',
                'deletedAt',
                'ipAddress',
            ],
        });
    }
    static async listComments({ postId, order }) {
        const { Model } = this;
        const bySort = order === 'popular' ? [['likesCount', 'DESC'], ['createdAt', 'DESC']] : (order === 'recently' ? [['createdAt', 'DESC']] : [['createdAt', 'ASC']]);
        try {
            const result = await Model.findAndCountAll({
                include: [{
                        model: models_1.User.Model,
                        include: [{ model: models_1.UserProfile.Model, attributes: ['amount'] }],
                        attributes: ['id'],
                    }],
                where: {
                    fk_post_id: postId,
                    level: 0,
                },
                attributes: [
                    'fk_post_id',
                    'id',
                    'text',
                    'displayname',
                    'level',
                    'likesCount',
                    'password',
                    'anonymous',
                    'replyTo',
                    'hasReply',
                    'createdAt',
                    'deletedAt',
                    'ipAddress',
                ],
                paranoid: false,
                order: bySort,
            });
            const { count, rows: data } = result;
            const comments = data.map(c => c.toJSON());
            for (let c of comments) {
                if (c.hasReply) {
                    const reply = await Model.findAll({
                        include: [{
                                model: models_1.User.Model,
                                include: [{ model: models_1.UserProfile.Model, attributes: ['amount'] }],
                                attributes: ['id'],
                            }],
                        where: {
                            replyTo: c.id,
                            level: 1,
                        },
                        attributes: [
                            'id',
                            'text',
                            'displayname',
                            'level',
                            'password',
                            'anonymous',
                            'createdAt',
                            'replyTo',
                            'deletedAt',
                            'ipAddress',
                        ],
                        paranoid: false,
                        order: [['createdAt', 'DESC']],
                    }).then((data) => {
                        return data;
                    });
                    const parse = { reply };
                    Object.assign(c, parse);
                }
                else {
                    const parse = { reply: [] };
                    Object.assign(c, parse);
                }
            }
            return {
                count,
                rows: comments,
            };
        }
        catch (e) {
            throw (e);
        }
    }
    static hasReplyUpdate(commentId) {
        const { Model } = this;
        return Model.update({ hasReply: true }, { where: { id: commentId } });
    }
    static findCommentReply(commentId) {
        const { Model } = this;
        return Model.find({
            where: {
                replyTo: commentId,
                level: 1,
            },
        });
    }
    static commentCountUpdate({ commentId, add }) {
        const { Model } = this;
        Model.findOne({
            where: {
                id: commentId,
                deletedAt: null,
            },
        }).then((data) => {
            return data.update({ likesCount: data.likesCount + (add) });
        });
    }
    static commentTextUpdate({ commentId, text, displayname, password }) {
        const { Model } = this;
        return Model.findOne({
            where: {
                id: commentId,
                deletedAt: null,
            },
        }).then((data) => {
            return data.update({ text, displayname, password });
        });
    }
    static commentRemove({ commentId, postId }) {
        const { Model } = this;
        return Model.findOne({
            where: Object.assign({}, (postId ? { fk_post_id: postId } : { id: commentId })),
        }).then((data) => {
            if (!data)
                return;
            return data.destroy();
        });
    }
    static checkCommentCount(postId) {
        const { Model } = this;
        return Model.count({
            where: {
                fk_post_id: postId,
            },
        });
    }
}
FreeComments.init = (sequelize, Sequelize) => {
    const Model = sequelize.define('FreeComments', {
        id: common_1.primaryUUID,
        text: Sequelize.TEXT,
        fk_user_id: Sequelize.UUID,
        fk_post_id: Sequelize.UUID,
        level: { type: Sequelize.INTEGER, defaultValue: 0 },
        likesCount: { type: Sequelize.INTEGER, defaultValue: 0 },
        hasReply: { type: Sequelize.BOOLEAN, defaultValue: false },
        replyTo: Sequelize.UUID,
        displayname: Sequelize.STRING,
        password: Sequelize.STRING,
        anonymous: Sequelize.BOOLEAN,
        ipAddress: Sequelize.STRING,
    }, {
        timestamps: true,
        paranoid: true,
        tableName: 'FreeComments',
        indexes: [
            { fields: ['createdAt'] },
        ],
    });
    Model.associate = (models) => {
        Model.belongsTo(models.FreePosts, {
            foreignKey: 'fk_post_id',
            onDelete: 'CASCADE',
            onUpdate: 'restrict',
        });
        Model.belongsTo(models.User, {
            foreignKey: 'fk_user_id',
            onDelete: 'CASCADE',
            onUpdate: 'restrict',
        });
    };
    return Model;
};
FreeComments.Model = FreeComments.init(database_1.sequelize, Sequelize);
exports.default = FreeComments;
//# sourceMappingURL=FreeComments.js.map