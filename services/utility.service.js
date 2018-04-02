const passHelper=require('bcrypt');
const env=process.env.NODE_ENV || 'development';
module.exports={
    hashPassword(password){
        return new Promise((resolve,reject)=>{
           passHelper.genSalt(10,(error,salt)=>{
                if(error){ reject(error);}
                passHelper.hash(password,salt,function(error,hash){
                    if(error)reject(error);
                    resolve(hash)

                })

            });
        })

    },
    confirmPassword(plainPassword,hashedPassword){
        return new Promise((resolve,reject)=>{
            passHelper.compare(plainPassword,hashedPassword,(error,compare)=>{
                if(error)reject(error);
                resolve(compare)
            });
        });

    },
    randomVal(min,max){
        return Math.floor(Math.random() * (max - min + 1) + min);
    },
    response(ctx,statusCode,status,next,statusInt,debug,token){
        ctx.response.status=statusCode;
       return {
            status:status,
            next:next,
            debug:debug,
            statusInt:statusInt,
           token:token
        };
    },
    canDebug(debug){
        console.log(debug);
        if(env==='development')
            return debug;
    }
}