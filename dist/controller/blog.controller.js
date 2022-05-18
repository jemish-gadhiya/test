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
const { jwtVerification } = require("./encrypt.controller");
const moment = require("moment");
const Op = dbWriter.Sequelize.OP;
router.post("/addBlog", jwtVerification, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.body.title) {
            res.json({ 'res': 0, 'msg': "Please enter blog title" });
        }
        else if (!req.body.description) {
            res.json({ 'res': 0, 'msg': "Please enter blog description" });
        }
        else if (!req.body.status) {
            res.json({ 'res': 0, 'msg': "Please enter blog status" });
        }
        else if (!req.body.category) {
            res.json({ 'res': 0, 'msg': "Please enter blog category" });
        }
        else {
            if (req.body.status == "publish" || req.body.status == "unpublish") {
                var blogs = yield dbWriter.blogs.create({
                    author: req.body.author || req.body.login_user_id,
                    title: req.body.title,
                    description: req.body.description,
                    status: req.body.status,
                    category: req.body.category
                });
                res.json({ 'res': 1, 'msg': "Blog added successfully.", data: blogs });
            }
            else {
                res.json({ 'res': 0, 'msg': "Please enter valid blog status" });
            }
        }
    }
    catch (err) {
        res.json({ 'res': 0, 'msg': err });
    }
}));
router.put("/updateBlog", jwtVerification, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var payload = {};
        if (!req.body.blogid) {
            res.json({ 'res': 0, 'msg': "Please enter blogid" });
        }
        else {
            if (req.body.title) {
                payload.title = req.body.title;
            }
            if (req.body.description) {
                payload.description = req.body.description;
            }
            if (req.body.status) {
                payload.status = req.body.status;
            }
            if (req.body.category) {
                payload.category = req.body.category;
            }
            payload.modify_date = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
            if (req.body.status == "publish" || req.body.status == "unpublish") {
                if (req.body.login_user_role == "admin") {
                    yield dbWriter.blogs.update(payload, {
                        where: {
                            id: req.body.blogid
                        }
                    });
                }
                else {
                    var bData = yield dbWriter.blogs.findOne({
                        where: {
                            id: req.body.blogid
                        }
                    });
                    if (bData) {
                        if (req.body.login_user_id == bData.author) {
                            yield dbWriter.blogs.update(payload, {
                                where: {
                                    id: req.body.blogid,
                                    author: req.body.login_user_id
                                }
                            });
                        }
                        else {
                            res.json({ 'res': 0, 'msg': "Permission denied" });
                        }
                    }
                    else {
                        res.json({ 'res': 0, 'msg': "Blog data not found." });
                    }
                }
                var returnData = yield dbWriter.blogs.findOne({
                    where: {
                        id: req.body.blogid
                    }
                });
                if (returnData) {
                    res.json({ 'res': 1, 'msg': "Blog updated successfully.", data: returnData });
                }
                else {
                    res.json({ 'res': 0, 'msg': "Blog data not found." });
                }
            }
            else {
                res.json({ 'res': 0, 'msg': "Please enter valid blog status" });
            }
        }
    }
    catch (err) {
        res.json({ 'res': 0, 'msg': err });
    }
}));
router.delete("/deleteBlog/:blogid", jwtVerification, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.params.blogid) {
            res.json({ 'res': 0, 'msg': "Please enter blogid" });
        }
        else {
            if (req.body.login_user_role == "admin") {
                yield dbWriter.blogs.destroy({
                    where: {
                        id: req.params.blogid
                    }
                });
                res.json({ 'res': 1, 'msg': "Blog deleted successfully." });
            }
            else {
                var bData = yield dbWriter.blogs.findOne({
                    where: {
                        id: req.params.blogid
                    }
                });
                if (bData) {
                    if (req.body.login_user_id == bData.author) {
                        yield dbWriter.blogs.destroy({
                            where: {
                                id: req.params.blogid
                            }
                        });
                        res.json({ 'res': 1, 'msg': "Blog deleted successfully." });
                    }
                    else {
                        res.json({ 'res': 0, 'msg': "Permission denied" });
                    }
                }
                else {
                    res.json({ 'res': 0, 'msg': "Blog data not found." });
                }
            }
        }
    }
    catch (err) {
        res.json({ 'res': 0, 'msg': err });
    }
}));
router.post("/getBlogs", jwtVerification, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var usercondition = 0, userfilter = Op.ne;
        if (req.body.login_user_role == "user") {
            usercondition = req.body.login_user_role;
            userfilter = Op.eq;
        }
        var datecondition = null, datefilter = Op.ne;
        if (!req.body.startdate || !req.body.enddate) {
            datecondition = moment(new Date()).format('YYYY-MM-DD');
            datefilter = Op.leq;
        }
        else {
            datecondition = [req.body.startdate, req.body.enddate];
            datefilter = Op.between;
        }
        var categorycondition = null, categoryfilter = Op.ne;
        if (!req.body.category) {
            categorycondition = null;
            categoryfilter = Op.ne;
        }
        else {
            categorycondition = req.body.category;
            categoryfilter = Op.eq;
        }
        var limit = 10;
        if (req.body.pagerecord) {
            limit = req.body.pagerecord;
        }
        var offset = 0;
        if (req.body.pageno) {
            offset = (req.body.pageno * limit) - limit;
        }
        var data = yield dbWriter.blogs.findAll({
            where: {
                author: {
                    [usercondition]: userfilter
                },
                publish_date: {
                    [datecondition]: datefilter
                },
                category: {
                    [categorycondition]: categoryfilter
                }
            },
            include: [{
                    model: dbWriter.users,
                    require: true
                }],
            offset: offset,
            limit: limit
        });
        res.json({ 'res': 1, 'msg': "Blog daa get successfully.", 'data': data });
    }
    catch (err) {
        res.json({ 'res': 0, 'msg': err });
    }
}));
module.exports = router;
