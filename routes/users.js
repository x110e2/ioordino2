import express from 'express';
//import mysql from 'mysql';
import mysql2 from 'mysql2/promise';
import { checkAuthentication,checkAuthorization } from "../middleware/user-auth.js";
import chalk from 'chalk';
import { my_exec_sync,my_p_exec_sync } from '../app-fn.js';
import ErrorHandler from "../helper/ErrorHandler.js";
import Debug  from 'debug';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import passport from 'passport';


const router =express.Router();
sdjjdsk
const d=Debug("app:generale");
const ddb=Debug("app:db");
//export router.get('/user/xx', (req,res,next)=>{});
router.get('/user/22', (req,res,next)=>{
    res.send("okkkk");
});
router.get('/user/profile',passport.authenticate("passport-login",{successRedirect:'/',failureRedirect:'/login'}), (req,res)=>{
    console.log(req.cookies);
    const token=req.cookies.token;
    if (!token) return res.status(401).send("nessun token fornito");
    // const payload=jwt.verify(token,process.env.JWT_SECRET_KEY,(err,userId) => {
    //     if(err){
    //         //return res.redirect("www.ioordino.it");
    //         return res.send({msg:"your_redirect_loaction_for_login_the_user_again"})
    //     } else {
    //      // user verified
    //      return res.send("il token e' valido");
    //     }
    // });
    
    try{
        const pub_key=fs.readFileSync('rsa.public');
        //const payload=jwt.verify(token,process.env.JWT_SECRET_KEY);
        const option={expiresIn:'100s',algorithm:'RS256'};
        const payload=jwt.verify(token,pub_key,option);
        return res.send("OK VALIDO");
    }catch (err){
        res.status(401).send("il token non e' valido o e' scaduto");
    }
});

router.get('/user', (req,res,next)=>{
    console.log("nuova richiesta get su user");
    var sol;
    
    const payload={id:1,isLogged:true};
    //const option={expiresIn:'10s'};
    const option={expiresIn:'100s',algorithm:'RS256'};
    const prv_key=fs.readFileSync('rsa.private');
    var token;
    try{
        token=jwt.sign(payload,prv_key,option);
    }catch(ex){
        return res.send("non va"+ex);
    }
     
    const cookieSettings={
        expires:new Date(Date.now()+100000),
        httpOnly:true,
        secure:false,
        sameSite:'Lax'
    };
    res.cookie('token',token,cookieSettings).send();
    return;
    d("qualcosa");
    ddb("qualcosadb");
    ddb("qualcosadb2");
    //throw new ErrorHandler(404);
    async function fff(){
        const conn=await mysql2.createConnection({
            host     : 'localhost',
            user     : 'root',
            database: 'ristoranti2'
            });
            // A simple SELECT query
        try {
            const [results, fields] = await conn.query(
              'SELECT nome from allergeni'
            );
          
            console.log(results); // results contains rows returned by server
            console.log(fields); // fields contains extra meta data about results, if available
          } catch (err) {
            console.log(err);
          }
            
    }
    fff();
  
function f2(){
    // var conn = mysql.createConnection({
    //     host     : 'localhost',
    //     user     : 'root',
    //     password : '',
    //     database: 'ristoranti25'
    //     });
    //     conn.connect((err)=>{
    //         if (err)next(err) ;
    //         //if (err) throw err;
    //         console.log("connessione avvenuta");
    //     });
    
        // const p= new Promise((resolve, reject)=>{
        //     conn.query('SELECT nome from allergeni ',  (error, elements)=>{
        //         if(error){return reject(error);}
        //         return resolve(elements);
        //     });
        // }).then(el=>{
        //     el.forEach(item => {
        //     console.log(chalk.green(item.nome));})}
        // ).catch();
    
        conn.query('SELECT nome from allergeni', function(err, rows, fields) {
            if (err)next(err) ;
            //if (err) throw err;
            // console.log(chalk.red( rows.length));
            // console.log(rows);
            // for(var i=0;i<rows.length;i++){
            //     console.log(chalk.green(i)+'-'+chalk.red(rows[i].nome));
            // };
            // rows.forEach(item => {
            //    console.log(item.nome);
            // });
            //console.log('The solution is: ', rows[0].nome);
            //sol= rows[0].solution;
        });
        console.log(chalk.blue("prima my_p_exec"));
        conn.query("SELECT nome FROM allergeni",function (err, resultx, fields){ 
            //if (err) throw err;
            if (err){
                next(err) 
            }else{
                console.log(chalk.red('inizio result'));
                 resultx.forEach(element => {
                    console.log(element.nome);
                });
            }
            
           // console.log(result);
        });
        // const rows2=my_p_exec_sync(conn,'SELECT nome from allergeni').then((resolve,reject)=>{
        //     if (resolve){
        //         console.log('resolve='+chalk.red(resolve));
        //         resolve.forEach(item => {
        //         console.log(item.nome);
        //      });    
        //     }
        // });
        console.log(chalk.blue("dopo my_p_exec"));
        conn.end();
}
    
    res.send('questa e\' user '+sol);

});

export default  router;