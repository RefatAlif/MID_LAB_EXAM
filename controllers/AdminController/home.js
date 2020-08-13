var express = require('express');
var router = express.Router();
var userModel 	= require.main.require('./models/AdminModel/user');

router.get('/',function(req,res){
  res.render('home',{
    title:'Admin | Home'
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

router.get('/AllEmpList',function(req,res){
var thead=['Name','Phone','Gender','Designation','Action','Action'];
var linkName=['Update','Delete'];
var link=['/Admin/Update?id=','/Admin/Delete?id='];
var data=[];
  userModel.getAllEmp(function(result){
    console.log(result);
    for(var i=0; i<result.length; i++){
      data.push([result[i].fullname,result[i].phone,result[i].gender,result[i].designation,result[i].id]);
    }
    //console.log(data);
    res.render('list',{
      msg:"All Employee Information",
      hdata:thead,
      rows:data,
      linkName:linkName,
      links:link
    });
	});
});

router.get('/Update',function(req,res){
var id=req.query.id;
var label=['Name','Phone','Gender','Designation','Username','Password'];
    var data=[];
    userModel.getEmpById(id,function(result){
        data.push(result.fullname);
        data.push(result.phone);
        data.push(result.gender);
        data.push(result.designation);
        data.push(result.username);
        data.push(result.password);
        data.push(result.id);
      console.log(data);
      res.render('edit',{
        label:label,
        data:data
      });
  	});
});

router.post('/Update',function(req,res){
var id=req.query.id;
var data=[];
var label=['Name','Phone','Gender','Designation','Username','Password'];
data.push(req.body.fullname);
data.push(req.body.phone);
data.push(req.body.gender);
data.push(req.body.designation);
data.push(req.body.username);
data.push(req.body.password);
data.push(req.body.id);
//console.log(data);
function goAgain(msg) {
  res.render('edit',{
    msg:msg,
    label:label,
    data:data
    });
}
});
module.exports = router;
