var express = require('express');
var router = express.Router();
var db = require("../sqlcon.js");

router.get("/adduser", function (req, res, next) {
    res.render("user_add");
});

// insert client data to server
router.post("/adduser", function (req, res) {
    var userName = req.body.username;
    var password = req.body.pwd;
    var departId = req.body.userdepart;
    var groupId = req.body.usergroup;
    var userTip = req.body.description;
    var userCode = req.body.usercode;
    var sql = "INSERT INTO loginuser (userName,password,departId,groupId,userTip,userCode) VALUES (?,?,?,?,?,?)";
    db.query(sql, [userName, password, departId, groupId, userTip, userCode], function (err, data) {
        if (err) {
            console.log(err);
        }
        else {
            res.end("User added successfully.");
        }
    });
});

router.get("/userlist", function (req, res, next) {
    // Pagination
    var currentPage = req.query.page;
    var start;
    var end;
    if (currentPage == undefined) {
        currentPage = 1;
        start = 0;
        end = 5;
    }
    else {
        start = (currentPage - 1) * 5;
        end = currentPage * 5;
    }
    // count how many records store in the database
    // and depend on start value and end value to select certain records
    var sql = "SELECT *, (select count(*) from loginuser) as count from loginuser limit ?,?";
    // then executing pagination
    db.query(sql, [start, end], function (err, data) {
        if (err) {
            console.log(err);
        }
        else {
            res.render("user_list", {userList: data, currentPage: currentPage});
        }
    })
});

// delete one record stores in loginuser
router.post("/deleteOneUser", function (req, res, next) {
    var userId = req.body.userId;
    var sql = "DELETE FROM loginuser WHERE userId=?";
    db.query(sql, userId, function (err, data) {
        if (err) {
            console.log(err);
        }
        else {
            res.send("Record deleted successfully.");
        }
    })
});

// delete multiple users
router.post("/deleteUsers", function (req, res) {
    var userIdArr = req.body.userIdArr;
    userIdArr = userIdArr.split(",");
    for (var i = 0; i < userIdArr.length; i++) {
        var userId = userIdArr[i];
        var sql = "DELETE from loginuser where userId=?";
        db.query(sql, [userId], function (err, data) {
            if (err) {
                console.log(err);
            }
        })
    }
    res.send("Users deleted successfully.");
});

router.get("/edituser", function (req, res) {
    // get the userID of the selected record,
    // then can display the selected record for user previewing and editing
    var userId = req.query.userId;
    var sql = "SELECT * FROM loginuser WHERE userId=?";
    db.query(sql, userId, function (err, data) {
        if (err) {
            console.log(err);
        }
        else {
            res.render("user_edit", {loginuser: data});
        }
    })
});

router.post("/updateuser", function (req, res) {
    // update records and store in database
    var userId = req.body.userId;
    var userName = req.body.username;
    var userCode = req.body.usercode;
    var userTip = req.body.description;
    var sql = "UPDATE loginuser SET userName=?,userCode=?,userTip=? WHERE userId=?";
    db.query(sql, [userName, userCode, userTip, userId], function (err, data) {
        if (err) {
            console.log(err);
        }
        else {
            res.send("Record edited successfully.");
        }
    })
});

module.exports = router;
