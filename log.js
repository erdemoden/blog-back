const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('./Users');
require("dotenv").config();
const router = express.Router();

router.get("/",async(req,res)=>{
    const token = req.cookies.acs;
    const refresh = req.cookies.rfs;
    if(token){
        jwt.verify(token,process.env.token_secret,(err,response)=>{
            if(err){
                res.json({"route":"/login"});
            }
            else if(response){
                res.json({"route":"/homepage","username":response.username});
            }
        });
    }
    else if(refresh){
        jwt.verify(refresh,process.env.refresh_secret,(error,user)=>{
            if(error){
                res.json({"route":"/login"});
            }
            else if(user){
                let token = jwt.sign({id:user.id,username:user.username},process.env.token_secret,{expiresIn:(10*60)});
                res.cookie('acs',token,{httpOnly:true,maxAge:(10*60)*1000});
                res.json({"route":"/homepage","username":user.username});
            }
        });
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
        let token = jwt.sign({id:user.id,username:user.username},process.env.token_secret,{expiresIn:maxage});
        let refresh = jwt.sign({id:user.id,username:user.username},process.env.refresh_secret,{expiresIn:refreshage});
        res.cookie('acs',token,{httpOnly:true,maxAge:maxage*1000});
        res.cookie('rfs',refresh,{httpOnly:true,maxAge:refreshage*1000});
        res.json({"route":"/homepage","username":user.username});
    }
    catch(e){
        res.json({'error':'Your Name Should Not Be More Than 15 Characters'});
    }
});





module.exports = router