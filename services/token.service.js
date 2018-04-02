/**
 * Created by shadow-viper on 3/23/18.
 */
const jwt=require('jsonwebtoken');
const fs=require('fs');
const env=process.env.NODE_ENV || 'development';
//const cert = fs.readFileSync('../sha/private.key');
/*const publicKey = fs.readFileSync('../sha/public.pem');  // get public key*/

const configService=require('../config/config.json')[env]

const TokenService={
    sign(data,prolonged){
        return jwt.sign(data, configService.token, { expiresIn: prolonged? (prolonged*60*60):(60*60) });
    },
    verify(token){
        return new Promise((resolve,reject)=>{
            jwt.verify(token, configService.token, function(err, decoded) {
                if(decoded){
                    resolve(decoded);
                }
                if(err){
                    reject(err);
                }
            });

        });

    },
    currentTime(){
        return Math.ceil(new Date().getTime()/1000);

    }

}
module.exports=TokenService;