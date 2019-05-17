var express = require("express");
var router = express.Router();
var db = require("../sqlcon.js");

router.get("/adddepart", function (req, res, next) {
    res.render("department_add");
});

// insert client data to server
router.post("/adddepart", function (req, res, next) {
    var departName = req.body.departname;
    var departCode = req.body.departcode;
    var departTip = req.body.description;
    db.query("INSERT INTO department (departName,departCode,departTip) VALUES (?,?,?)", [departName, departCode, departTip], function (err, data) {
        if (err) {
            console.log(err);
        }
        else {
            res.end("Department added successfully.");
        }
    });
});

router.get("/departlist", function (req, res, next) {
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
    var sql = "SELECT *, (select count(*) from department) as count from department limit ?,?";
    // then executing pagination
    db.query(sql, [start, end], function (err, data) {
        if (err) {
            console.log(err);
        }
        else {
            res.render("department_list", {departmentList: data, currentPage: currentPage});
        }
    });
});

// delete one record stores in department
router.post("/deleteOneDepart", function (req, res, next) {
    var departmentId = req.body.departmentId;
    var sql = "DELETE FROM department WHERE departmentId=?";
    db.query(sql, departmentId, function (err, data) {
        if (err) {
            console.log(err);
        }
        else {
            res.send("Record deleted successfully.");
        }
    })
});

// delete multiple department records
router.post("/deletedepts", function (req, res) {
    var deptIdArr = req.body.deptIdArr;
    deptIdArr = deptIdArr.split(",");
    for (var i = 0; i < deptIdArr.length; i++) {
        var deptId = deptIdArr[i];
        var sql = "DELETE from department where departmentId=?";
        db.query(sql, [deptId], function (err, data) {
            if (err) {
                console.log(err);
            }
        })
    }
    res.send("Departments deleted successfully.");
});

router.get("/editdepart", function (req, res) {
    // get the departmentID of the selected record,
    // then can display the selected record for user previewing and editing
    var departmentId = req.query.departmentId;
    var sql = "SELECT * FROM department WHERE departmentId=?";
    db.query(sql, departmentId, function (err, data) {
        if (err) {
            console.log(err);
        }
        else {
            res.render("department_edit", {department: data});
        }
    })
});

router.get("/getdepartlist", function (req, res) {
    var sql = "SELECT * from department";
    db.query(sql, function (err, data) {
        if (err) {
            console.log(err);
        }
        else {
            res.send(data);
        }
    })
});

router.post("/updatedepart", function (req, res) {
    // update records and store in database
    var departmentId = req.body.departmentId;
    var departName = req.body.departname;
    var departCode = req.body.departcode;
    var departTip = req.body.description;
    var sql = "UPDATE department SET departName=?,departCode=?,departTip=? WHERE departmentId=?";
    db.query(sql, [departName, departCode, departTip, departmentId], function (err, data) {
        if (err) {
            console.log(err);
        }
        else {
            res.send("Record edited successfully.");
        }
    })
});

module.exports = router;
