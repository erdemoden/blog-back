const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('./Users');
require("dotenv").config();
const router = express.Router();

router.get("/",async(req,res)=>{
    const token = req.cookies.jwt;
    const refresh = req.cookies.refresh;
    if(token){
        res.json({"route":"/homepage"});
    }
    else if(refresh){
        // create jwt using refresh token
        //console.log("çalışdı");
    }
    else{
        res.json({"route":"/login"});
        console.log("çalışdı");
    }
});

router.post("/signup",async(req,res)=>{
    const user = new User(req.body);

    try{
        const post = await user.save();
        const maxage = 10*60;
        const refreshage = 24*60*7;
        let token = jwt.sign({id:post.id},process.env.token_secret,{expiresIn:maxage});
        let refresh = jwt.sign({id:post.id},process.env.refresh_secret,{expiresIn:refreshage});
        res.cookie('acs',token,{httpOnly:true,maxAge:maxage*1000});
        res.cookie('rfs',refresh,{httpOnly:true,maxAge:refreshage*1000});
        res.json({"route":"/homepage"});
    }
    catch(e){
        res.json({'error':'Your Name Should Not Be More Than 15 Characters'});
    }
});




module.exports = router