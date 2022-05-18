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
const express_1 = require("express");
const { dbWriter } = require("../config/dbconfig");
const router = (0, express_1.Router)();
const { encrypt, decrypt, jwtVerification } = require("./encrypt.controller");
const jwt = require("jsonwebtoken");
router.post("/addUser", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.body.firstname) {
            res.json({ 'res': 0, 'msg': "Please enter user first name" });
        }
        else if (!req.body.lastname) {
            res.json({ 'res': 0, 'msg': "Please enter user last name" });
        }
        else if (!req.body.email) {
            res.json({ 'res': 0, 'msg': "Please enter user email" });
        }
        else if (!req.body.password) {
            res.json({ 'res': 0, 'msg': "Please enter user password" });
        }
        else if (!req.body.dob) {
            res.json({ 'res': 0, 'msg': "Please enter user dob" });
        }
        else if (!req.body.role) {
            res.json({ 'res': 0, 'msg': "Please enter user role" });
        }
        else {
            if (req.body.role == "admin" || req.body.role == "user") {
                var uData = yield dbWriter.users.findOne({
                    where: {
                        email: req.body.email
                    }
                });
                if (!uData) {
                    var encPass = yield encrypt(req.body.password);
                    var user = yield dbWriter.users.create({
                        firstname: req.body.firstname,
                        lastname: req.body.lastname,
                        email: req.body.email,
                        password: encPass,
                        dob: req.body.dob,
                        role: req.body.role
                    });
                    res.json({ 'res': 1, 'msg': "Users added successfully.", data: user });
                }
                else {
                    res.json({ 'res': 0, 'msg': "Email address already exist." });
                }
            }
            else {
                res.json({ 'res': 0, 'msg': "Please enter valid user role" });
            }
        }
    }
    catch (err) {
        res.json({ 'res': 0, 'msg': err });
    }
}));
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.body.email) {
            res.json({ 'res': 0, 'msg': "Please enter user email" });
        }
        else if (!req.body.password) {
            res.json({ 'res': 0, 'msg': "Please enter user password" });
        }
        else {
            var uData = yield dbWriter.users.findOne({
                where: {
                    email: req.body.email
                }
            });
            if (uData) {
                var dbPass = yield decrypt(uData.password);
                if (req.body.password == dbPass) {
                    var token = yield jwt.sign({
                        data: {
                            "id": uData.id,
                            "email": uData.email,
                            "role": uData.role
                        }
                    }, process.env.TOKEN_SECRET);
                    res.json({ 'res': 1, 'msg': "Users login successfully.", data: { user: uData, token: token } });
                }
                else {
                    res.json({ 'res': 0, 'msg': "Invalid use credentials." });
                }
            }
            else {
                res.json({ 'res': 0, 'msg': "User data not found" });
            }
        }
    }
    catch (err) {
        res.json({ 'res': 0, 'msg': err });
    }
}));
module.exports = router;
