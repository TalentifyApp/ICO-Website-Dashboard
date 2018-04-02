const passHelper=require('bcrypt');
let config=require('../config/config');
if(config.version==='development')
    config=config.development;
else
    config=config.production;


module.exports={
    hashPassword(password){
        return passHelper.hash(password,config.token);
    },
    confirmPassword(plainPassword,hashedPassword){
        return passHelper.compare(plainPassword,hashedPassword);
    },
    randomVal(min,max){
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
}