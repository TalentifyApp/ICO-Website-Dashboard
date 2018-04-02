/**
 * Created by shadow-viper on 3/25/18.
 */
const koa_mailer=require('koa-mailer');
const config=require('../config/config');
const environment=process.env.NODE_ENV;
module.exports={
    mail(to,subject,textBody,htmlBody){
        const mailerOptions={
            email: {
                host: config[environment].email.host,
                port: config[environment].email.port,
                secure: config[environment].email.secure,
                auth: {
                    user: config[environment].email.email,
                    pass: config[environment].email.password,
                },
            },
            prefix: '/mailer',
            validate: function (ctx) {
                return config[environment].email.blacklisted.indexOf(ctx.ip) < 0;
            },
            handlers: {
                '/notice': function () {
                    return {
                        to: to,
                        subject: subject,
                        html: htmlBody,
                        text: textBody
                    };
                },
            },
        };
        return koa_mailer(mailerOptions);
    }
};