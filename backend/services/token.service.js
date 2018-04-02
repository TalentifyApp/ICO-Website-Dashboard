/**
 * Created by shadow-viper on 3/23/18.
 */
const jwt=require('jsonwebtoken');
const fs=require('fs');
//const cert = fs.readFileSync('../sha/private.key');
/*const publicKey = fs.readFileSync('../sha/public.pem');  // get public key*/

const configService=require('../config/config.json')

module.exports={
    sign(data){
        return jwt.sign(data, configService[process.env.NODE_ENV].token, { expiresIn: 60 * 60 });
    },
    verify(token){
        return new Promise((resolve,reject)=>{
            jwt.verify(token, configService[process.env.NODE_ENV].token, function(err, decoded) {
                if(decoded){
                    resolve(decoded);
                }
                if(err){
                    reject(err);
                }
            });

        });

    }

}