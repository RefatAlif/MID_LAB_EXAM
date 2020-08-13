var express = require('express');
var router = express.Router();
var userModel 	= require.main.require('./models/AdminModel/user');

router.get('/',function(req,res){
  res.render('account',{
    title:'Lab_Exam | Login',
    error:""
  });
});

router.post('/', function(req, res){

  var user = {
		uname: req.body.username,
		password: req.body.password
	};

  userModel.userValidation(user, function(result){
		if(result.length>0){
      if(result[0].permission==1){
  			req.session.username = result[0].username;
        req.session.userid = result[0].info_id;
        //console.log(result);
        if(result[0].usertype=="admin"){
            console.log("Admin Login");
  			     res.redirect('/Admin');
        }else if(result[0].usertype=="employee"){
          //res.redirect('/Employee');
        }
      }
		}
    else{
      res.render('account',{
        title:'Lab_Exam | Login',
        error:"Invalid Informations !"
      });
		}
	});
});

module.exports = router;
