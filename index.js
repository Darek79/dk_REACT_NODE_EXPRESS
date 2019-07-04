// require('dotenv').config()
const express = require('express');
const app = express();

app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.get("*",(req,res)=>{
    res.json({
        message:"here iam"
    })
});

const PORT = process.env.PORT || 3000;
app.listen(PORT);