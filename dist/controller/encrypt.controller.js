"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const algorithm = 'aes-256-ctr';
const password = '1234567890!@#$%^&*';
function encrypt(text) {
    var cypher = crypto.createCipher(algorithm, password);
    var crypted = cypher.update(text, 'utf8', 'hex');
    crypted += cypher.final('hex');
    return crypted;
}
function decrypt(text) {
    try {
        var decipher = crypto.createDecipher(algorithm, password);
        var dec = decipher.update(text, 'hex', 'utf8');
        dec += decipher.final("utf8");
        return dec;
    }
    catch (err) {
        return "";
    }
}
function jwtVerification(req, res, next) {
    try {
        var token = req.headers.authorization || req.body.token;
        if (!token) {
            return res.json({ 'res': 0, 'msg': "Token is required" });
        }
        else {
            jwt.verify(token, process.env.TOKEN_SECRET, (err, data) => __awaiter(this, void 0, void 0, function* () {
                if (err) {
                    return res.json({ 'res': 0, 'msg': err });
                }
                else {
                    req.body.login_user_id = data.data.id;
                    req.body.login_user_email = data.data.email;
                    req.body.login_user_role = data.data.role;
                    return next();
                }
            }));
        }
    }
    catch (err) {
        return "";
    }
}
module.exports = {
    encrypt,
    decrypt,
    jwtVerification
};
