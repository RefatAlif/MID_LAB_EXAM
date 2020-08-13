var db = require.main.require('./models/database/database');

module.exports ={

	get: function(id, callback){
		var sql = "select * from users where id="+id;
		db.getResults(sql, function(result){
			if(result.length > 0){
				callback(result[0]);
			}else{
				callback([]);
			}
		});
	},

	getAllEmp: function(callback){
		var sql = "select * from users where usertype!='admin'";
		console.log(sql);
		db.getResults(sql, function(result){
			if(result.length > 0){
				callback(result);
			}else{
				callback([]);
			}
		});
	},

	getEmpById: function(id,callback){
		var sql = "select * from users where id="+id;
		//console.log(sql);
		db.getResults(sql, function(result){
			if(result.length > 0){
				//console.log(result);
				callback(result[0]);
			}else{
				callback([]);
			}
		});
	},

	userValidation: function(user, callback){
		var sql = "select * from users where username='"+user.uname+"' and password='"+user.password+"'";
		db.getResults(sql, function(result){
			if(result.length > 0){
				callback(result);
			}else{
				callback([]);
			}
		});
	},

	addUser: function(user, callback){
		var sql = "insert into users_info values('', '"+user.fullname+"', '"+user.address+"', '"+user.phone+"','"+user.email+"',0)";
		console.log(user);
		console.log(sql);
		db.execute(sql, function(insertId){
			if(insertId>0){
				console.log(user);
				var sql = "insert into users values('', '"+user.uname+"', '"+user.password+"', 'customer',1,"+insertId+")";
				db.execute(sql, function(insertId){
					if(insertId>0)
						callback(true);
				});

			}
			else
				callback(false);
			// if(status){
			// 	callback(true);
			// }else{
			// 	callback(false);
			// }
		});
	},

	userUpdate: function(user, callback){
		var sql = "";
		db.execute(sql, function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},

	userDelete: function(id, callback){
		var sql = "delete from users where id="+id;
		db.execute(sql, function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	blockUser: function(id, callback){
		var sql = "UPDATE users SET permission=0 where id="+id;
		console.log(sql);
		db.execute(sql, function(status){
			if(status){
				console.log('true');
				callback(true);
			}else{
				console.log('false');
				callback(false);
			}
		});
	},
	unblockUser: function(id, callback){
		var sql = "UPDATE users SET permission=1 where id="+id;
		console.log(sql);
		db.execute(sql, function(status){
			if(status){
				console.log('true');
				callback(true);
			}else{
				console.log('false');
				callback(false);
			}
		});
	}
}
