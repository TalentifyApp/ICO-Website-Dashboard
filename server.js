/**
 * Created by shadow-viper on 3/22/18.
 */
const Koa=require('koa');
const Parser= require('koa-parser');
const statics =require('koa-static');
const config=require('./config/config');


const app=new Koa();
const router=require('./routes');
const PORT = process.env.PORT || 9488;
process.env.PORT=PORT;
const db =require('./models');

db.sequelize.sync({force:true}).then(()=>console.log('models created'),error=>console.error(error));
app.context.db=db;

app.use(Parser()).use(router.routes()).use(statics(__dirname+'/public')).listen(PORT);
console.log(`Server listening to port ${PORT}`)
