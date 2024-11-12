import fs from 'fs';
import mysql from 'mysql';
import chalk from 'chalk';

export default function getCliente2(nome){
    const clientiJSON=fs.readFileSync('clienti.json','utf-8');
    const clienti=(JSON.parse(clientiJSON)); 
    const cliente=clienti.find(clienteItem => clienteItem.nome === nome);
    return cliente;
}
export function getCliente(nome){
    const clientiJSON=fs.readFileSync('clienti.json','utf-8');
    const clienti=(JSON.parse(clientiJSON)); 
    const cliente=clienti.find(clienteItem => clienteItem.nome === nome);
    return cliente;
}
export function addCliente({nome,email,telefono}){
    const clientiJSON=fs.readFileSync('clienti.json','utf-8');
    const clienti=(JSON.parse(clientiJSON));
    clienti.push({nome,email,telefono});
    fs.writeFileSync('clienti.json',JSON.stringify(clienti));
    console.log(clienti);
    //const cliente=clienti.find(clienteItem => clienteItem.nome === nome);
    //return cliente;
}

export async function my_exec_sync(conn,query){
    try {
        //const [rows, fields] = await conn.query(query);
        var rows =await conn.query(query,function (err, result, fields){ 
            if (err) throw err;
            console.log(chalk.red('inizio result'));
            console.log(result);
        });
        console.log(chalk.red('inizio rows'));
        console.log(rows); // Risultato della query
        console.log(chalk.red('fine rows'));
        return rows;
    } catch (error) {
        console.error(error);
        return null;
    } finally {
        //await connection.end(); // Chiudi la connessione
        return null;
    }
}

export async function my_p_exec_sync(conn,query){
    try {
        var rex=await new Promise((res, rej) => {
            conn.query(query,function (err, result, fields){ 
                if (err) return rej(err);
                console.log(chalk.red('inizio result'));
                console.log(result);
                console.log(chalk.yellow('fine query'));
                res(result);
            });    
        }).then((resolve,reject)=>{
            if (resolve) {
                return resolve;
            }else{
                return null;
            }
        }).catch((resolve,reject)=>{return null;});
        //const [rows, fields] = await conn.query(query);
        
        //console.log(chalk.red('inizio rows'));
        //console.log(rows); // Risultato della query
        console.log(chalk.yellow('fine my_p_exec'));
        console.log(chalk.yellow(rex));
        return rex;
    } catch (error) {
        console.error(error);
        return null;
    } finally {
        //await connection.end(); // Chiudi la connessione
        return null;
    }
}