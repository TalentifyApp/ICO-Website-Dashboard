/**
 * Created by shadow-viper on 3/22/18.
 */

const tokenService=require('../services/token.service');
const utilityService=require('../services/utility.service');
const mailerService =require('../services/mailer.service');
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
     * @apiParam {String} Email Email must be unique
     * @apiParam {String} Password Password must have min length of 6, one caps and one symbol
     *
     * @apiSuccess {String} email Email of the user
     * @apiSuccess {String} password Password of the user
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
    Login(ctx){
        let {email,password}=ctx.request.body;
        if(!email)
           ctx.throw(401,'Email is required');
        if(!password)
           ctx.throw(401,'Password is required');
        this.ctx.db.users.findOne({
            where:{
               email
            }
        }).then((data)=>{
           if(data && data.password){
              utilityService.confirmPassword(password,data.password).then((a)=>{
                  tokenService.sign(data).then((token)=>{
                      ctx.body={status:'success',statusInt:1,next:"Login Successful!"}
                  },(error)=>{
                      ctx.throw(501,'User token error, Please contact admin!');
                  })
              },(error)=>{
                  ctx.throw(401,'Invalid login, Try again');
              })
           }else{
               ctx.throw(401,'Invalid login, Try again');
           }

        },(err)=>{
           ctx.throw(401,'Invalid login, Try again');
        })
    },

    /**
     * @api {post} /auth/registration
     * @apiName Registration
     * @apiVersion 0.0.1
     * @apiGroup Authentication
     * @apiDescription Define Registration process information
     *
     * @apiExample {curl} usage:
     *          curl -i https://discoverblockchain.io:9844/v1/auth/registration
     * @apiParam {String} firstname Firstname of the user
     * @apiParam {String} middlename Middlename of the user
     * @apiParam {Date} Date of birth of the user
     * @apiParam {String} lastname Lastname of the user
     * @apiParam {Number} Country id from country table  see /country/list
     * @apiParam {String} state State of the user
     * @apiParam {String} Email Email must be unique
     * @apiParam {String} Password Password must have min length of 6, one caps and one symbol
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

    Register(ctx){
        const requiredFields=['firstname','lastname','email','password',"country"];
        let {firstname,lastname,email,DOB,country,middlename,address, state, city,phone,password}=ctx.request.body;



        for( let i in requiredFields){
           if(!(ctx.request.body[requiredFields[i]]) && ctx.request.body[requiredFields[i]].length<1){
              ctx.throw(400,`${requiredFields[i]} is required`);
              break;
           }
        }
        const token=utilityService.randomVal(1,4);

        mailerService.mail(email,'DiscoverBlockChain.io Registration',`Hello ${firstname}, \r\nHere is your OTP ${token} \r\nThank you`,`Hello <b>${firstname}</b><br/>Here is your OTP ${token}<br/> Thank you`).then((sent)=>{
            utilityService.hashPassword(password).then((a)=>{
                ctx.db.users.create({
                    firstname,
                    lastname,
                    middlename,
                    DOB,
                    country,
                    address,
                    city,
                    state,
                    phone,
                    password:a
                }).then((data)=>{
                  ctx.body= {
                     status:"success",
                      next:"Registration Successful. Please check your email",
                      statusInt:1
                    }
                },error=>{
                   ctx.throw(501,"Registration failed, Please try again");
                });

            })
        },(error)=>{
           ctx.throw(400,'Verification failed! Please try again!');
        })


    },
    /**
     * @api {post} /auth/confirm
     * @apiName Confirm Registration
     * @apiVersion 0.0.1
     * @apiGroup Authentication
     * @apiDescription Define Confirm Registration process information
     *
     * @apiExample {curl} usage:
     *          curl -i https://discoverblockchain.io:9844/v1/auth/confirm
     * @apiParam {Number} otp Otp Information sent to user
     * @apiParam {String} email email address of the user
     *
     * @apiSuccess {Number} otp OTP of the user
     * @apiSuccess {String} email Email of the user
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
    confirmRegistration(ctx){

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
     * @apiSuccess {Number} reason Reason for confirmation
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
    sendConfirmation(){

    }
};



 module.exports=Authentication;