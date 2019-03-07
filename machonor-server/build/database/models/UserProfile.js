"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sequelize = require("sequelize");
const database_1 = require("database");
const common_1 = require("lib/common");
class UserProfile {
    static localRegister({ displayname, fk_user_id }) {
        const { Model } = this;
        return Model.build({
            displayname,
            fk_user_id,
        }).save();
    }
}
UserProfile.init = (sequelize, Seqeulize) => {
    const Model = sequelize.define('UserProfile', {
        id: common_1.primaryUUID,
        displayname: Sequelize.STRING,
        thumbnail: Seqeulize.STRING,
        shortBio: Sequelize.STRING,
        fk_user_id: Seqeulize.UUID,
        amount: { type: Seqeulize.INTEGER, defaultValue: 0 },
        level: { type: Seqeulize.INTEGER, defaultValue: 1 },
    }, {
        timestamps: true,
        paranoid: true,
        tableName: 'UserProfile',
    });
    return Model;
};
UserProfile.Model = UserProfile.init(database_1.sequelize, Sequelize);
exports.default = UserProfile;
//# sourceMappingURL=UserProfile.js.map