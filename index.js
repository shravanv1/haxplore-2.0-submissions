const port = 3000 || process.env.PORT;
const express = require('express');
const mysql = require('mysql');
const path = require('path');
var bodyParser = require('body-parser');
const multer = require("multer");
const app = express();
const db = require("./dbcon");
const cookieParser = require('cookie-parser');
//const session = require('express-session');
// const db = require('./dbcon');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.set('view engine','ejs'); 
app.use('/public',express.static(path.join(__dirname,'/public')));
//app.use(session({secret: "Ye hamara project hai aur ye hamari hackathon ho ri hai"}));

app.get('/',(req,res)=>{
    //res.send("Hello World");
    res.render("haxplor/front");
});

app.get('/login',(req,res)=>{
    //res.send("Login");

    res.render("haxplor/login");
});

app.get('/register',(req,res)=>{
    //res.send("Register");
    res.render("haxplor/reg");
});

app.get('/qr/:id',(req,res)=>{
    let data ={pid : req.params.id};
    db.query(`SELECT * FROM qrcode WHERE ?`,data,(err,resu)=>{
        if(err) throw err;
        console.log(resu);
        res.render("haxplor/qrcode",{obj:resu[0]});
    });
    
});
app.post('/gen', (req, res) => {
    console.log(req.body);
    
    let sql= 'SELECT * FROM user WHERE username = ?';
    
    //console.log(data);
    db.query(sql,req.body.username,(err,resu) => {
        if(err) throw err; 
        
        console.log(resu); 
        if(resu.length<1)
        res.send("Invalid username or password");
        else if(resu[0].password == req.body.password) 
        {   let data = {
              pid : req.body.pid,
              dat : req.body.dat
           };
            let sql1 = `INSERT INTO qrcode SET pid = '${req.body.pid}', dat = '${req.body.username} : ${req.body.dat}\n', ${req.body.role} = '${req.body.username}\n' ON DUPLICATE KEY UPDATE dat = CONCAT(dat, '${req.body.username} : ${req.body.dat}\n'), ${req.body.role} = CONCAT(${req.body.role}, '${req.body.username}\n') `;
            console.log(sql1);
            db.query(sql1,(er,re)=>{
                   if(er) throw er;
                   console.log(re);
            });
             res.send("Successful sent");
        } 
        else res.send("Invalid username or password");
    });

})
app.post('/scan',(req,res)=>{
     res.render('haxplor/scan');
});
app.post('/signup', (req,res) => {
    console.log(req.body);
    data = {
        name : req.body.name,
        username : req.body.username,
        email : req.body.email,
        password : req.body.password
    };
    db.query('INSERT INTO user SET ?',data,(err,res)=>{
        if(err) throw err;
        console.log(res);
        
    });   
    res.redirect("/login");
}); 
app.post('/login',(req,res) => {
    
    // console.log(req.body);
    let sql= 'SELECT * FROM user WHERE username = ?';
    //console.log(data);
    db.query(sql,req.body.username,(err,resu) => {
        if(err) throw err; 
        
        console.log(resu); 
        if(resu.length<1)
        res.send("Invalid username or password");
        else if(resu[0].password == req.body.password) 
        res.redirect('/'); 
        else res.send("Invalid username or password");
    });   
    
});

app.listen(port,()=>{
    console.log(`Running on port ${port}`);
});