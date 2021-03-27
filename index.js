const port = 3000 || process.env.PORT;
const express = require('express');
const mysql = require('mysql');
const path = require('path');
var bodyParser = require('body-parser');
const multer = require("multer");
const app = express();
const db = require('./dbcon');
express().use(bodyParser.urlencoded({ extended: true }));
express().use(bodyParser.json())

app.get('/',(req,res)=>{
    res.send("Hello World");
});

app.get('/login',(req,res)=>{
    res.send("Login");
});

app.get('/register',(req,res)=>{
    res.send("Register");
});

app.post('/get', (req, res) => {
    res.send('Recieved');
})

app.listen(port,()=>{
    console.log(`Running on port ${port}`);
});