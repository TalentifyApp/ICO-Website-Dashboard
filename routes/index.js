/**
 * Created by shadow-viper on 3/22/18.
 */


const Router=require('koa-router');
const router=new Router();

const {Authentication,Dashboard}=require('../controllers');


const version=1;
router.post(`/v${version}/auth/login`,Authentication.Login);
router.post(`/v${version}/auth/register`,Authentication.Register);

router.get(`/v${version}/auth/confirm`,Authentication.confirm);
router.post(`/v${version}/auth/sendConfirmation`,Authentication.sendConfirmation);



module.exports =router;