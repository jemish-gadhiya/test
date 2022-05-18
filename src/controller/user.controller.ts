import { Router } from "express";
const { dbWriter } = require("../config/dbconfig");
const router = Router();


const {encrypt, decrypt, jwtVerification} = require("./encrypt.controller");
const jwt = require("jsonwebtoken");




router.post("/addUser", async (req, res)=>{
    try{
        if(!req.body.firstname) {
            res.json({ 'res': 0, 'msg': "Please enter user first name" });
        } else if(!req.body.lastname) {
            res.json({ 'res': 0, 'msg': "Please enter user last name" });
        } else if(!req.body.email) {
            res.json({ 'res': 0, 'msg': "Please enter user email" });
        } else if(!req.body.password) {
            res.json({ 'res': 0, 'msg': "Please enter user password" });
        } else if(!req.body.dob) {
            res.json({ 'res': 0, 'msg': "Please enter user dob" });
        } else if(!req.body.role) {
            res.json({ 'res': 0, 'msg': "Please enter user role" });
        } else {
            if(req.body.role == "admin" || req.body.role == "user") {
                var uData = await dbWriter.users.findOne({
                    where: {
                        email: req.body.email
                    }
                })
                if(!uData) {
                    var encPass = await encrypt(req.body.password);
                    var user = await dbWriter.users.create({
                        firstname: req.body.firstname,
                        lastname: req.body.lastname,
                        email: req.body.email,
                        password: encPass,
                        dob: req.body.dob,
                        role: req.body.role
                    });
                    res.json({ 'res': 1, 'msg': "Users added successfully.",data: user });
                } else {
                    res.json({ 'res': 0, 'msg': "Email address already exist." });
                }

            } else {
                res.json({ 'res': 0, 'msg': "Please enter valid user role" });
            }
        }
    } catch(err){
        res.json({ 'res': 0, 'msg': err });
    }
})


router.post("/login", async (req, res)=>{
    try{
        if(!req.body.email) {
            res.json({ 'res': 0, 'msg': "Please enter user email" });
        } else if(!req.body.password) {
            res.json({ 'res': 0, 'msg': "Please enter user password" });
        } else {
            var uData = await dbWriter.users.findOne({
                where: {
                    email: req.body.email
                }
            });

            if(uData){
                var dbPass = await decrypt(uData.password);

                if(req.body.password == dbPass) {


                    var token =await jwt.sign({
                        data: {
                            "id": uData.id,
                            "email": uData.email,
                            "role": uData.role
                        }
                    },process.env.TOKEN_SECRET)


                    res.json({ 'res': 1, 'msg': "Users login successfully.",data: {user: uData, token: token} });
                } else {
                    res.json({ 'res': 0, 'msg': "Invalid use credentials." });
                }
            } else {
                res.json({ 'res': 0, 'msg': "User data not found" });
            }
        }
    } catch(err){
        res.json({ 'res': 0, 'msg': err });
    }
})



module.exports = router;