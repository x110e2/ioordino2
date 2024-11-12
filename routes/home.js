import express from 'express';
import { checkAuthentication,checkAuthorization } from "../middleware/user-auth.js";
const router =express.Router();

export default router.get('/',checkAuthentication,checkAuthorization, (req,res)=>{
    console.log("nuova richiesta get la rotta root");
    res.send('questa e\' la home');

});