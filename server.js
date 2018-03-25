/**
 * Created by shadow-viper on 3/22/18.
 */

const Koa=require('koa');
const Parser= require('koa-parser');
const statics =require('koa-static');


const app=new Koa();
const router=require('./routes');
const PORT = 9488;
const db =require('./models');

db.sequelize.sync().then(()=>console.log('models created'),error=>console.error(error))
app.use(Parser());
app.use(router.routes());
app.use(statics(__dirname+'/public'));

app.listen(PORT);
console.log(`Server listening to port ${PORT}`)
console.log(process.env.NODE_ENV)
