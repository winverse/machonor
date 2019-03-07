"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getIp_1 = require("lib/getIp");
class CoreCtrl {
}
CoreCtrl.getLang = async (ctx) => {
    let result;
    try {
        result = await getIp_1.getIpCountry();
    }
    catch (e) {
        ctx.throw(500, e);
    }
    let lang;
    if (result === 'KR') {
        lang = 'ko';
    }
    else {
        lang = 'en';
    }
    ctx.body = lang;
};
exports.default = CoreCtrl;
//# sourceMappingURL=coreCtrl.js.map