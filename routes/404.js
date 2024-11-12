import express from 'express';
//import { checkAuthentication,checkAuthorization } from "../middleware/user-auth";
const router =express.Router();

export default router.get('*', (req,res)=>{
    console.log("404");
    res.status(404).send('Pagina non trovata');

});