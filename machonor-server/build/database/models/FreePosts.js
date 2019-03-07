"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sequelize = require("sequelize");
const database_1 = require("database");
const common_1 = require("lib/common");
const User_1 = require("./User");
const UserProfile_1 = require("./UserProfile");
class FreePosts {
    static async getPostsList(page) {
        const { Model } = this;
        const limit = 20;
        const offset = (limit * (page - 1));
        const data = await Model.findAndCountAll({
            offset,
            limit,
            attributes: ['id', 'title', 'displayname', 'createdAt', 'totalViews', 'urlSlug', 'anonymous'],
            raw: false,
            order: [['createdAt', 'DESC']],
            where: {
                displayname: {
                    $not: '운영자',
                },
            },
        });
        const lastPage = Math.ceil(data.count / limit);
        delete data.count;
        Object.assign(data, { lastPage });
        return data;
    }
    static async getNoticeList(page) {
        const { Model } = this;
        const limit = 20;
        const offset = (limit * (page - 1));
        const data = await Model.findAndCountAll({
            offset,
            limit,
            attributes: ['id', 'title', 'displayname', 'createdAt', 'totalViews', 'urlSlug'],
            order: [['createdAt', 'DESC']],
            where: {
                displayname: '운영자',
            },
        });
        const lastPage = Math.ceil(data.count / limit);
        delete data.count;
        Object.assign(data, { lastPage });
        return data;
    }
    static postsWrite({ title, displayname, password, body, urlSlug, fk_user_id, anonymous, ipAddress, }) {
        const { Model } = this;
        return Model.build({
            title,
            displayname,
            password,
            body,
            urlSlug,
            fk_user_id,
            anonymous,
            ipAddress,
        }).save();
    }
    static readPost(urlSlug) {
        const { Model } = this;
        return Model.findOne({
            include: [{
                    model: User_1.default.Model,
                    include: [{ model: UserProfile_1.default.Model, attributes: ['displayname', 'thumbnail', 'shortBio'] }],
                    attributes: ['id'],
                }],
            where: {
                urlSlug,
            },
            attributes: [
                'id',
                'title',
                'displayname',
                'password',
                'body',
                'urlSlug',
                'anonymous',
                'ipAddress',
                'totalViews',
                'createdAt',
            ],
        }).then((data) => {
            if (!data)
                return;
            return data.get({ plain: true });
        });
    }
    static findPostById(postId) {
        const { Model } = this;
        return Model.findOne({
            include: [{
                    model: User_1.default.Model,
                    include: [{ model: UserProfile_1.default.Model, attributes: ['displayname', 'thumbnail', 'shortBio'] }],
                    attributes: ['id'],
                }],
            where: {
                id: postId,
            },
            attributes: [
                'id',
                'title',
                'displayname',
                'password',
                'body',
                'urlSlug',
                'anonymous',
                'ipAddress',
                'totalViews',
                'createdAt',
            ],
        }).then((data) => {
            if (!data)
                return;
            return data.get({ plain: true });
        });
    }
    static postUpdate({ postId, title, body, urlSlug, displayname, password }) {
        const { Model } = this;
        return Model.update({ title, body, urlSlug, displayname, password }, { where: { id: postId } });
    }
    static findByUrlslug(urlSlug) {
        const { Model } = this;
        return Model.findOne({
            include: [{
                    model: User_1.default.Model,
                    attributes: ['id'],
                }],
            where: {
                urlSlug,
            },
            attributes: ['id', 'anonymous'],
        }).then((data) => {
            if (!data)
                return;
            return data.get({ plain: true });
        });
    }
    static removePost(postId) {
        const { Model } = this;
        return Model.findOne({
            where: {
                id: postId,
            },
        }).then((data) => {
            return data.destroy();
        });
    }
    static updateViewsCount({ postId, totalViews }) {
        const { Model } = this;
        return Model.update({ totalViews: totalViews + 1 }, { where: { id: postId } });
    }
    static async searchPost({ criteria, word, page }) {
        const { Model } = this;
        const limit = 5;
        const offset = (limit * (page - 1));
        const data = await Model.findAndCountAll({
            limit,
            offset,
            where: Object.assign({}, (criteria === 'title' ? { title: { $like: `%${word}%` } } : (criteria === 'displayname' ? { displayname: { $like: `%${word}%` } } : ({ [Sequelize.Op.or]: [
                    {
                        title: {
                            $like: `%${word}%`,
                        },
                    },
                    {
                        body: {
                            $like: `%${word}%`,
                        },
                    },
                ] })))),
            attributes: ['id', 'title', 'displayname', 'createdAt', 'totalViews', 'urlSlug'],
            order: [['createdAt', 'DESC']],
        });
        const lastPage = Math.ceil(data.count / limit);
        delete data.count;
        Object.assign(data, { lastPage });
        return data;
    }
}
FreePosts.init = (sequelize, Sequelize) => {
    const Model = sequelize.define('FreePosts', {
        id: common_1.primaryUUID,
        title: Sequelize.STRING,
        displayname: Sequelize.STRING,
        password: Sequelize.STRING,
        body: Sequelize.TEXT,
        urlSlug: Sequelize.STRING,
        fk_user_id: Sequelize.UUID,
        anonymous: Sequelize.BOOLEAN,
        ipAddress: Sequelize.STRING,
        totalViews: { type: Sequelize.INTEGER, defaultValue: 0 },
    }, {
        timestamps: true,
        paranoid: true,
        tableName: 'FreePosts',
        indexes: [
            { fields: ['urlSlug'] },
            { fields: ['createdAt'] },
        ],
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
FreePosts.Model = FreePosts.init(database_1.sequelize, Sequelize);
exports.default = FreePosts;
//# sourceMappingURL=FreePosts.js.map