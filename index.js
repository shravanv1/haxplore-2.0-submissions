const port = 3000 || process.env.PORT;
const express = require('express');
const mysql = require('mysql');
const path = require('path');
var bodyParser = require('body-parser');
const multer = require("multer");
const app = express();
const db = require("./dbcon");
// const db = require('./dbcon');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.set('view engine','ejs'); 
app.use('/public',express.static(path.join(__dirname,'/public')));

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

// Data to be stored as:

var obj = {
    key: 'haxplore', // If this isn't present in the scanned qr code then return invalid code
    pid: 1, // Id of product
    producer: [
        //contains ids of producer, same for supplier and seller
    ],
    supplier: [
        // contains ids of supplier, along with the producer who supplies to this supplier
        ['a', 'b'], ['c', 'd'] // Like this
    ],
    seller: [
        // Similar like supplier
    ], // No object for consumers as they'll scan the qr directly from homepage
    data: {
        producer: {
            // data entered at producer level gets appended here
        },
        supplier: {

        },
        seller: {

        }
    }
};


app.post('/send', (req, res) => {
    console.log(req.body);
    // Check if username, role and password match
    // If they match, check if the username exits in the 'role' key of product 'pid' 
    // If username exits then append data and generate new qr code


    res.send('Recieved');
})

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
        res.send("Successful Login"); 
        else res.send("Invalid username or password");
    });   
    
});

app.listen(port,()=>{
    console.log(`Running on port ${port}`);
});