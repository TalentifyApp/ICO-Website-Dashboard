/**
 * Created by shadow-viper on 3/22/18.
 */

const tokenService=require('../services/token.service');
const utilityService=require('../services/utility.service');
const mailerService =require('../services/mailer.service');

const version=1;
 const Authentication={
    /**
     * @api {post} /auth/login
     * @apiName Login
     * @apiVersion 0.0.1
     * @apiGroup Authentication
     * @apiDescription Define Login process information
     *
     * @apiExample {curl} usage:
     *          curl -i https://discoverblockchain.io:9844/v1/auth/login
     * @apiParam {String} email Email must be unique
     * @apiParam {String} password Password must have min length of 6, one caps and one symbol
     *
     * @apiSuccess {String} email Email of the user
     * @apiSuccess {String} password Password of the user
     *
     * @apiParamExample [json] Sample login
     * {
     * "email":"martinchuka@discoverblockchain.com",
     * "password":"nothing"
     * }
     *
     * @apiSuccessExample {json} Login Success
     * HTTP/1.1 200 OK
     * {
     * "token":"YkdaeKhianfoajhieaoOJUIJGHI2356",
     * "status":"success",
     * "next":"Login successful",
     * "statusInt":1
     * }
     *
     * @apiError InvalidLogin Invalid login
     *
     * @apiErrorExample {json}  Error Login in
     * HTTP/1.1 401 unauthorized
     * {
     * "status:"error",
     * "next":"Invalid Login. Try again",
     * "debug":[]
     * "statusInt":0,
     * }
     */
   async Login(ctx){

        const reqBody=ctx.request.body
        let responseBody={};
        responseBody=utilityService.response(ctx,401,'error','Invalid Login. Please try again!',0);
        if(!reqBody || !reqBody.email || !reqBody.password) {
            ctx.body=utilityService.response(ctx,400,'error','Email and Password is required!',0);
           return;
       }
       try {
           const user=await ctx.db.users.findOne({where:{email:reqBody.email}});

           if(user && user.password){
                   const confirmedPass=await utilityService.confirmPassword(reqBody.password,user.password);
                   if(confirmedPass){
                       const data={id:user.id,email:user.email};
                       const token= await tokenService.sign(data);
                      responseBody=utilityService.response(ctx,200,'success',"Login Successful!",1,undefined,token);
                   }else{
                       responseBody=utilityService.response(ctx,401,'error','Invalid Login. Please try again!',0);
                   }
           }
       }catch(e){
           responseBody=utilityService.response(ctx,401,'error','Invalid Login. Please try again!',0,utilityService.canDebug(e));

       }
       ctx.body=responseBody;

    },

    /**
     * @api {post} /auth/register
     * @apiName Registration
     * @apiVersion 0.0.1
     * @apiGroup Authentication
     * @apiDescription Define Registration process information
     *
     * @apiExample {curl} usage:
     *          curl -i https://discoverblockchain.io:9844/v1/auth/registration
     * @apiParam {String} firstname Firstname of the user
     * @apiParam {String} middlename Middlename of the user
     * @apiParam {Date} DOB of the user
     * @apiParam {String} lastname Lastname of the user
     * @apiParam {Number} country id from country table  see /country/list
     * @apiParam {String} state State of the user
     * @apiParam {String} email Email must be unique
     * @apiParam {String} password Password must have min length of 6, one caps and one symbol
     *
     * @apiSuccess {String} firstname Firstname of the user
     * @apiSuccess {String} middlename Middlename of the user
     * @apiSuccess {Date} DOB Date of birth of the user
     * @apiSuccess {String} lastname Lastname of the user
     * @apiSuccess {Number} country id Country of Origin
     * @apiSuccess {String} state State of the user
     * @apiSuccess {Number} mobile number Mobile number of the user
     * @apiSuccess {String} mobile prefix Mobile prefix of the user based on the country selected
     * @apiSuccess {String} email Email of the user
     * @apiSuccess {String} password Password of the user
     *
     * @apiParamExample {json} Example parameter for registration
     * {
     * "firstname":"martin",
     * "lastname":"john",
     * "middlename":"doe",
     * "country":1,
     * "state":2,
     * "address":"inland town",
     * "mobile":8162558889,
     * "DOB":"2018-10-20",
     * "email":"martinchuka@discoverblockchain.io",
     * "password":"nothing"
     * }
     * @apiSuccessExample {json} Registration Success
     * HTTP/1.1 200 OK
     * {
     * "status":"success",
     * "next":"Registration Successful. Please check your email",
     * "statusInt":1
     * }
     *
     * @apiError InvalidLogin Invalid login
     *
     * @apiErrorExample {json}  Error Login in
     * HTTP/1.1 501 unimplemented
     * {
     * "status:"error",
     * "next":"Registration failed",
     * "debug":["provide a valid email","username already exists","password invalid",']
     * "statusInt":0,
     * }
     */

    async Register(ctx){
        let responseBody={};
        const requiredFields=['firstname','lastname','email','password',"country"];
        let {firstname,lastname,email,DOB,country,middlename,address, state, city,phone,password}=ctx.request.body;
        for( let i in requiredFields) {
            if (!(ctx.request.body[requiredFields[i]]) && ctx.request.body[requiredFields[i]].length < 1) {
                responseBody = utilityService.response(ctx, 401, 'error', 'Registration Failed!', 0, [`${requiredFields[i]} is required`]);
                break;
            }
        }


            try{
            const users=await ctx.db.users.findOne({where:{email:email}});
            if(users && users.id){
                responseBody=utilityService.response(ctx,501,'error','User already exists',0);
            }else{
                const confirmation=await Authentication.sendConfirmation(ctx,'internal');
                if(confirmation!==false){
                    const HashedPassword=await utilityService.hashPassword(password);
                    const user=await ctx.db.users.create({firstname,lastname,email,middlename,DOB,country,address,city,state,phone,password:HashedPassword});
                    responseBody=utilityService.response(ctx,200,'success',"Registration Successful. Please check your email!",1);
                }else{
                    responseBody=utilityService.response(ctx,401,'error','Registration Failed!',0,['user not created','Verification message could not be sent']);
                }
            }
            }catch(e){
                responseBody=utilityService.response(ctx,401,'error','Registration Failed!',0,['user not created',utilityService.canDebug(e)]);

            }
            ctx.body=responseBody
    },
    /**
     * @api {get} /auth/confirm
     * @apiName Confirm Registration
     * @apiVersion 0.0.1
     * @apiGroup Authentication
     * @apiDescription Define Confirm Registration process information
     *
     * @apiExample {curl} usage:
     *          curl -i https://discoverblockchain.io:9844/v1/auth/confirm
     * @apiParam {Number} token Encrypted identifier sent to user
     *
     * @apiSuccess {Number} token Token of the user
     *
     * @apiSuccessExample {json} Confirmation Success
     * HTTP/1.1 200 OK
     * {
     * "status":"success",
     * "next":"Confirmation success",
     * "statusInt":1
     * }
     *
     * @apiError Could not confirm user
     *
     * @apiErrorExample {json}  Error Confirming user
     * HTTP/1.1 401 unauthorized
     * {
     * "status:"error",
     * "next":"Invalid confirmation or user. Try again",
     * "debug":[]
     * "statusInt":0,
     * }
     */
    async confirm(ctx){
        let responseBody={};
       const reqBody=ctx.request.query;
       if(!reqBody || !reqBody.token){
           ctx.body = utilityService.response(ctx, 401, 'error', 'Verification failed', 0, [`token is required`]);
           return;
       }

       try{
       const decodedVerification= await tokenService.verify(reqBody.token);
               const updatedId= await ctx.db.users.update({
                   status:1
                   },
                   {where:{
                       email:decodedVerification.email
                   }
               });
               if(updatedId && updatedId.length>0){
                   responseBody=utilityService.response(ctx,201,'success','Verification successful',1,['you can now login',{id:updatedId}]);
               }else{
                   responseBody = utilityService.response(ctx, 401, 'error', 'Verification failed', 0, [`Either update or verification has expired`]);
               }
    }catch(e){
         responseBody = utilityService.response(ctx, 401, 'error', 'Verification failed', 0, [utilityService.canDebug(e)]);
     }
       ctx.body=responseBody;
    },
    /**
     * @api {post} /auth/sendConfirmation
     * @apiName Send Confirmation
     * @apiVersion 0.0.1
     * @apiGroup Authentication
     * @apiDescription Define prompt confirmation process information, This endpoint can only accept 5 same confirmation reason from user in 24hours
     *
     * @apiExample {curl} usage:
     *          curl -i https://discoverblockchain.io:9844/v1/auth/sendConfirmation
     * @apiParam {String} email email address of the user
     * @apiParam {Number} reason Reason for confirmation
     *
     *
     * @apiSuccess {String} email Email of the user
     *
     * @apiSuccessExample {json} Confirmation Success
     * HTTP/1.1 200 OK
     * {
     * "status":"success",
     * "next":"Confirmation sent",
     * "statusInt":1
     * }
     *
     * @apiError Could not confirm user
     *
     * @apiErrorExample {json}  Error Confirming user
     * HTTP/1.1 401 unauthorized
     * {
     * "status:"error",
     * "next":"Confirmation Failed. Try again",
     * "debug":["Multiple confirmation code already issued"]
     * "statusInt":0,
     * }
     */
   async sendConfirmation(ctx,internal){
       let resObj=ctx.request.body;
       if(!resObj || !resObj.email){
          return false
       }
       if(resObj && !resObj.firstname){
           try{
               resObj=await ctx.db.users.findOne({
                   where:{
                       email:resObj.email
                   }
               });
           }catch(e){
               return false;
           }
       }


        try{
           if(resObj && resObj.email){
               const token=await tokenService.sign({email:resObj.email},0.1);
               const url=`${ctx.request.protocol}://${ctx.request.host}/v${version}/auth/confirm?token=${token}`;
               let html=`<div style=""><div style=""><h3>Hello ${resObj.firstname}</h3></div><div style=""><h4>One more step to take</h4><p style="font-style:italic;">Please click <a target="_blank" href="${url}">here</a> to complete your registration </p></div><div><p>Thank you</p></div></div>`;
               const mailed= await mailerService.mail(resObj.email,'DiscoverBlockChain.io Registration',`Hello ${resObj.firstname}, \r\nOne more step to take \r\nPlease click ${token} or copy to your browser address to complete your registration.\r\nThank you`,html);
               if(internal==='internal'){
                   return mailed
               }
               ctx.body=utilityService.response(ctx,200,'Verification sent successfully',['Check you email'],0);
        }else{
            ctx.body=utilityService.response(ctx,200,'User not found',['Please continue to registration'],0);

        }
        }catch(e){return false;

            if(internal==='internal'){
                return false;
            }
            ctx.body=utilityService.response(ctx,200,'Error occurred during verification',['Try again later'],1,[utilityService.canDebug(e)]);
        }
    }
};



 module.exports=Authentication;