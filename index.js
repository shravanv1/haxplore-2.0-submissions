const port = 3000 || process.env.PORT;
const express = require('express');
const app = express();

app.get('/',(req,res)=>{
    res.send("Hello World");
});

app.listen(port,()=>{
    console.log(`Running on port ${port}`);
});