"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sequelize = require("sequelize");
const database_1 = require("database");
const crypto = require("crypto");
const common_1 = require("lib/common");
const models_1 = require("database/models");
const token_1 = require("lib/token");
const { SECRET_KEY, } = process.env;
function hash(password) {
    return crypto.createHmac('sha512', SECRET_KEY).update(password).digest('hex');
}
class User {
    static findByEmail(email) {
        const { Model } = this;
        return Model.findOne({
            include: [{
                    model: models_1.UserProfile.Model,
                    attributes: ['displayname', 'thumbnail', 'shortBio', 'amount', 'level'],
                    required: false,
                }],
            where: {
                email,
            },
        }).then((data) => {
            if (!data)
                return null;
            return data.get({ plain: true });
        });
    }
    static findByDisplayname(displayname) {
        const { Model } = this;
        return Model.findOne({
            include: [{
                    model: models_1.UserProfile.Model,
                    where: {
                        displayname,
                    },
                    attributes: ['displayname', 'thumbnail', 'shortBio', 'amount', 'level'],
                    required: true,
                }],
        }).then((data) => {
            if (!data)
                return;
            return data.get({ plain: true });
        });
    }
    static findByUserId(userid) {
        const { Model } = this;
        return Model.findOne({
            include: [{
                    model: models_1.UserProfile.Model,
                    attributes: ['fk_user_id', 'displayname', 'thumbnail', 'shortBio', 'amount', 'level'],
                    required: true,
                }],
            where: {
                userid,
            },
        }).then((data) => {
            if (!data)
                return;
            return data.get({ plain: true });
        });
    }
    static localRegister({ email, userid, password }) {
        const { Model } = this;
        return Model.build({
            email,
            userid,
            password: hash(password),
        }).save();
    }
    static generatorToken({ instance, id }) {
        const payload = {
            _id: id,
            amount: instance.amount || null,
            level: instance.level || null,
            profile: {
                displayname: instance.displayname,
                thumbnail: instance.thumbnail || null,
                shortBio: instance.shortBio || null,
            },
        };
        return token_1.generateToken({
            payload,
            subject: 'account',
        });
    }
    static validatePassword({ instance, password }) {
        const hashed = hash(password);
        return instance.password === hashed;
    }
}
User.init = (sequelize, Sequelize) => {
    const Model = sequelize.define('User', {
        id: common_1.primaryUUID,
        userid: Sequelize.STRING,
        email: { type: Sequelize.STRING, unique: true },
        password: Sequelize.STRING,
    }, {
        timestamps: true,
        paranoid: true,
        tableName: 'User',
    });
    Model.associate = (models) => {
        Model.hasOne(models.UserProfile, {
            foreignKey: 'fk_user_id',
            onDelete: 'CASCADE',
            onUpdate: 'restrict',
        });
    };
    return Model;
};
User.Model = User.init(database_1.sequelize, Sequelize);
exports.default = User;
//# sourceMappingURL=User.js.map