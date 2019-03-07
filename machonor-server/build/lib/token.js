"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY: secret, } = process.env;
exports.generateToken = ({ payload, subject }) => {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, secret, {
            subject,
            issuer: 'webuy',
            expiresIn: '7d',
        }, (err, token) => {
            if (err)
                reject(err);
            resolve(token);
        });
    });
};
exports.decodedToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secret, ((err, decoded) => {
            if (err)
                reject(err);
            resolve(decoded);
        }));
    });
};
//# sourceMappingURL=token.js.map