const expect = require('chai').expect;
const auth = require('../controllers/auth.controller');


describe('Should test Authentication module',()=>{
    //test is missing app context

    it('should present user token',()=>{
        const login = auth.Login;
        expect(Object.keys(login)).to.be.equal('token');
    });

    it('should present success information',()=>{
        const Register= auth.Register;
        expect(Register.statusInt).to.be.equal(1);
    })
})