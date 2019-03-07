"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dns = require("dns");
const os = require("os");
const ipCountry = require("ip-country");
exports.getIpCountry = () => {
    ipCountry.init({
        fallbackCountry: 'US',
        exposeInfo: false,
    });
    const hostname = os.hostname();
    return new Promise((resolve, reject) => {
        dns.lookup(hostname, (err, address) => {
            if (err)
                reject(err);
            const country = ipCountry.country(address);
            resolve(country);
        });
    });
};
exports.getIpAddress = () => {
    const hostname = os.hostname();
    return new Promise((resolve, reject) => {
        dns.lookup(hostname, (err, address) => {
            if (err)
                reject(err);
            resolve(address);
        });
    });
};
//# sourceMappingURL=getIp.js.map