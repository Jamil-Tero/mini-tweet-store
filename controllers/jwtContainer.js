
const container=[];
exports.saveToken = (userId, token) => {
    container.push({userId:userId,token:token});
    return token;
}

const jwt = require('jsonwebtoken');
exports.generateAccessToken =(userId)=> {
    return jwt.sign(userId, process.env.JWTSECRET);
}

   const getUserId = (token) => {     
    index=container.findIndex(item=>item.token==token);
    if (index !=-1){
        if (container[index].userId !==undefined)
            return BigInt(container[index].userId).toString();
    } 
    return '-1'; 
}

exports.authenticate = (req,res,next)=>{
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1];
    var userId=getUserId(token);
    res.twitterUserId=userId;
    if (userId ==='-1')
        res.sendStatus(401);
    else
        next();
}