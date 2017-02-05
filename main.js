var express=require('express');
var app=express();
var bodyparser=require('body-parser');
var mysql=require('mysql');
var cookieparser=require('cookie-parser');
var sql_host='127.0.0.1';
var sql_user='root';
var sql_pass='johncena';
var link=mysql.createConnection({host: sql_host, user: sql_user, password: sql_pass});
link.query('USE chat',function(err){
    if(err){
        console.log(err);
    }
    else{
        console.log('Db selected');
    }
});
app.use(bodyparser()).use(cookieparser());
app.use(express.static(__dirname + '/app'));
app.post('/sign_up',function(req,res){
    var new_user=req.body.new_username;
    var new_pass=req.body.new_password;
    var new_name=req.body.new_name;
    var user={username: new_user, password: new_pass, name: new_name};
    link.query('Insert into users SET ?',user,function(err){
        if(!err){
            console.log('Inserted: ',new_user);
        }
        else{
            console.log(err);
        }
    });
    res.send('Done');
});
var nname;
app.post('/login',function(req,res){
    var log_user=req.body.log_username;
    var log_pass=req.body.log_password;
    var stmt="select * from users where username='"+log_user+"'";
    link.query(stmt,function(err,rows,f){
        if(err){
        console.log(err);}
        else{
            console.log('Query executed');
            for(var r=0;r<rows.length;++r){
                var row=rows[r];
                var q_username=row['username'];
                var q_password=row['password'];
                var q_name=row['name'];
                nname=q_name;
            }
            if(log_user==q_username && log_pass==q_password){
                console.log(nname,'Loged in');
                res.sendFile(__dirname+'/app/chat.html');
            }
            else{
                res.send('Please check username or password');
            }
        }
    });
});
app.listen(2000);