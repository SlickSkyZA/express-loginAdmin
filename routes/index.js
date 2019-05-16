var express = require('express');
var router = express.Router();
var db = require("../sqlcon.js");

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('sys_login', {title: 'Express'});
});

router.post('/login', function (req, res, next) {
    var capt = req.body.captfield;  // for verification code
    var userName = req.body.username;
    var pwd = req.body.password;


    // first, check if the verification code is correct
    if (capt == req.session.captcha) {
        // then proceed checking username and password
        db.query("select * from loginuser where userName=? and password=?", [userName, pwd], function (err, data) {
            if (err) {
                console.log(err);
            }
            else if (data.length > 0) {
                req.session.is_Login = true;
                res.render("sys_index", {username: data[0]["userName"]});
            }
            else {
                res.end("Incorrect username or password.");
            }
        })
    }
    else {
        res.end("Verification code is incorrect.");
    }
});

// verification
router.get("/captchapng", function (req, res) {
    var captchapng = require("captchapng");
    var randomNum = parseInt(Math.random() * 9000 + 1000);
    req.session.captcha = randomNum;
    var p = new captchapng(80, 30, randomNum);
    p.color(0, 0, 0, 0);
    p.color(80, 80, 80, 255);
    var img = p.getBase64();
    var imgbase64 = new Buffer.from(img, 'base64');
    res.writeHead(200, {
        'Content-Type': 'image/png'
    });
    res.end(imgbase64);
});

module.exports = router;
