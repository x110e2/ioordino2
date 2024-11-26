import validator from 'validator';
import morgan from 'morgan';
import chalk from 'chalk';
import yargs from 'yargs/yargs';
import fs  from 'fs';
import path  from 'path';
import {hideBin} from 'yargs/helpers';
import { type } from 'os';
import * as fun from './app-fn.js';
import { EventEmitter } from 'events';
import { URL,fileURLToPath } from 'url';
import * as http from 'node:http';
import express from 'express';
import helmet from 'helmet';
import { checkAuthentication,checkAuthorization } from './middleware/user-auth.js';
import homerouter from './routes/home.js';
import _404router from './routes/404.js';
//import user_profile from './routes/user_profile.js';
import usersrouter from './routes/users.js';
import appError from './middleware/error.js';
import cookieParser from 'cookie-parser';
//import * as dotenv from 'dotenv/config';
import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';
import csurf from 'csurf';
import passport from "passport";
//import passportlocal from "passport-local";

import Strategy from 'passport-local';
//uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory
const app = express();
//import { response } from 'http';
const port = 3000;
const host='localhost';
const eventEmitter=new EventEmitter();
const myurl=new URL('https:\\www.google.it"');
//const response = new http.response;
eventEmitter.on("evento1",function(){console.log("Evento Catturato");});
eventEmitter.emit("evento1");

console.log('ambiente:'+app.get('env'));
const resultx = dotenv.config({ path: ['.env.'+app.get('env')] });
if (resultx.error) {
  throw resultx.error
}
console.log("DB_CONNSTR="+process.env.DB_CONN_STRING);

if(app.get('env')==='development'){
    var accessLogStream = fs.createWriteStream(path.join(__dirname,'logs','access.log'), { flags: 'a' })
    app.use(morgan('combined', { stream: accessLogStream }))
    console.log("Morgan attivo");
}else{console.log("Morgan disabilitato");}
app.use(helmet());

app.use(express.static('public'));
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));//legge post data
passport.initialize();
var Localstrategy=passport.Strategy();
passport.use('local-login',new Localstrategy(
        function(username,password,done){
            if(username=="gianni"){ 
                if(password=="123"){
                    return done(null,{username:'gianni'});
                }else{
                    return done(null,false,{message:'password incorretta'});
                }
            }else{
                return done(null,false,{message:"username non trovata"})
            }
        }
    )
);
app.use(homerouter);
app.use(usersrouter);
app.use(_404router);
app.use(appError);
console.log(process.env.DB_CONN_STRING); 

//console.log(process.env) // remove this after you've confirmed it is working

yargs(hideBin(process.argv)).command({
    command:'get',
    describe:"Descrizione del comando",
    builder:{
        nome:{
            describe:"nome del cliente da ricercare",
            demandOption:true,
            type:'string'
        }
    },
    handler(argv){
        const cliente=fun.getCliente(argv.nome);
        console.log(cliente);
        //console.log(argv);
        //getCliente(argv.nome);
    }
}).command({
    command:'add',
    describe:"Inserimento cliente",
    builder:{
        nome:{
            describe:"nome del cliente da inserire",
            demandOption:true,
            type:'string'
        },email:{
            describe:"email del cliente da inserire",
            demandOption:true,
            type:'string'
        },telefono:{
            describe:"telefono del cliente da inserire",
            demandOption:true,
            type:'string'
        }
    },
    handler(argv){
        //addCliente(argv);
        const cliente=fun.addCliente(argv);
        console.log(cliente);
        //console.log(argv);
        //getCliente(argv.nome);
    }
}).command({
    command:'listen',
    describe:"Avvia node in ascolto",
    builder:{
        nome:{
            describe:"nome del cliente da inserire",
            demandOption:false,
            type:'string'
        }
    },
    handler(argv){
        const server=http.createServer((request,response)=>{
            console.log("nuova richiesta ricevuta");
            request.method();
            // response.statuscode=200;
            // response.setHeader('Content-Type','text/html; charset=utf-8');
            // response.write("questo e' sjdkhkfkj");
            // response.write("questo czcszc");
            // response.end();
            if (request.url==="/favico.ico"){
                response.statusCode=204;
                return response.end();
            }
            const body="questo eo il cooo";
            response.writeHead(200,{
                'Content-Type':'text/plain; charset=utf-8',
                'Content-Length': Buffer.byteLength(body)
            });
            response.end(body);
        });
        server.listen(port,host,()=>{
            console.log(`Server in ascolto sulla porta ${port}...`);

        });
        server.on('error',err =>console.log(err));

    }

}).command({
    command:'listen2',
    describe:"Avvia node in ascolto express",
    builder:{
        nome:{
            describe:"nome del cliente da inserire",
            demandOption:false,
            type:'string'
        }
    },
    handler(argv){
        
        app.use(express.static('public'));
        // create a write stream (in append mode)
        // setup the logger
        
        console.log("ciaooo");
        // app.get('/user',checkAuthentication,checkAuthorization, (req,res)=>{
        //     console.log("nuova richiesta geta laa rotta root");
        //     res.send('ciaovvvv');
        
        // });
        app.listen(5000);
    }

})
.demandCommand(1).parse();

console.log(chalk.red("fine"));
//console.log(myurl);



