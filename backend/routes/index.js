const Router=require('koa-router');
const router=new Router();

const {Authentication,Dashboard}=require('../controllers');



router.post('/auth/login',Authentication.Login);
router.post('/auth/register',Authentication.Register);



module.exports =router;