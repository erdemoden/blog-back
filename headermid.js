const jwt = require('jsonwebtoken');
const User = require('./Users');

const checkHead = async(req,res,next)=>{
    let head = req.headers["Autharization"];
    if(!head){
        res.json({"route":"/Error"});
    }
    else{
        let parsed = head.split("Bearer")[1];
        jwt.verify(parsed,process.env.token_secret,async(error,user)=>{
            if(error){
                jwt.verify(parsed,process.env.refresh_secret,async(error,user)=>{
                    if(error){
                        res.json({"route":"Error"});
                    }
                    else if (user){
                let checking = await user.findOne({username:user.username});
                if(checking){
                    next();
                }
                else{
                    res.json({"route":"Error"});
                }
                    }
                })
            }
            else if(user){
                let checking = await user.findOne({username:user.username});
                if(checking){
                    next();
                }
                else{
                    res.json({"route":"Error"});
                }

        }
    });
}
}



module.exports = {checkHead};