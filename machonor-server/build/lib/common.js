"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sequelize = require("sequelize");
const Moment = require("moment");
const shortid = require("shortid");
exports.primaryUUID = {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
};
exports.generateSlugId = () => {
    // return `${Math.floor(36 + Math.random() * 1259).toString(36)}${Date.now().toString(36)}`;
    return shortid.generate();
};
exports.escapeForUrl = (text) => {
    return text
        .replace(/[^0-9a-zA-Zㄱ-힣.\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf -]/g, '')
        .replace(/ /g, '-')
        .replace(/--+/g, '-');
};
exports.formatFileName = (name) => {
    const date = Moment().format('YYYYMMDD');
    const randomString = Math.random().toString(36).substring(2, 7);
    const claenFileName = name.toLowerCase().replace(/[^a-z0-9가-힣]/g, '-.');
    const newFilename = `justice-${date}-${randomString}-${claenFileName}`;
    return newFilename.substring(0, 70);
};
//# sourceMappingURL=common.js.map