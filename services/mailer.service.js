/**
 * Created by shadow-viper on 3/25/18.
 */
const environment=process.env.NODE_ENV || 'development';
const config=require('../config/config')[environment];;
const nodemailer=require('nodemailer')
module.exports={
    mail(to,subject,textBody,htmlBody){
        return new Promise((resolve,reject)=>{
            // create reusable transporter object using the default SMTP transport
            const transporter = nodemailer.createTransport(config.email);

            // setup email data with unicode symbols
            let mailOptions = {

                from: config.email.auth.user, // sender address
                to: to, // list of receivers
                subject: subject, // Subject line
                text: textBody, // plain text body
                html: htmlBody // html body
            };

            // send mail with defined transport object
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    reject(error);
                }
               resolve(info);
                // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
                // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
            });
        })

    },
};