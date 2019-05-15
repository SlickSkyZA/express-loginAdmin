var express = require('express');
var router = express.Router();
var db = require("../sqlcon.js");


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('sys_login', { title: 'Express' });
});

router.post('/login', function (req,res,next) {
    var userName = req.body.username;
    var pwd = req.body.password;
    db.query("select * from loginuser where userName=? and password=?",[userName,pwd],function(err,data){
      if(err){
        console.log(err);
      }
      else if(data.length > 0 ){
          res.render("sys_index", {username: data[0]["userName"]});
      }
      else{
        res.end("Incorrect username or password.");
      }
    })
});
module.exports = router;
