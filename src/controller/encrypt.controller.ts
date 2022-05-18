import crypto = require("crypto");
const jwt = require("jsonwebtoken");

const algorithm = 'aes-256-ctr';
const password = '1234567890!@#$%^&*'

function encrypt(text: any) {
    var cypher = crypto.createCipher(algorithm, password);

    var crypted = cypher.update(text, 'utf8', 'hex');

    crypted += cypher.final('hex');
    return crypted;
}

function decrypt(text: any) {
    try{
        var decipher = crypto.createDecipher(algorithm, password);
        var dec = decipher.update(text, 'hex', 'utf8');
        dec += decipher.final("utf8");

        return dec;
    } catch (err) {
        return"";
    }
}

function jwtVerification(req: any, res: any, next: any) {
    try{
        var token = req.headers.authorization || req.body.token;
        if(!token) {
            return res.json({ 'res': 0, 'msg': "Token is required" });
        } else {
            jwt.verify(token, process.env.TOKEN_SECRET, async (err: any, data: any)=>{
                if(err){
                    return res.json({'res': 0, 'msg': err})
                } else {
                    req.body.login_user_id = data.data.id;
                    req.body.login_user_email = data.data.email;
                    req.body.login_user_role = data.data.role;
                    return next();
                }
            });
        }
    } catch (err) {
        return"";
    }
}

module.exports = {
    encrypt,
    decrypt,
    jwtVerification
}