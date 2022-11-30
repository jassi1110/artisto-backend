const mysql = require('mysql')
require('dotenv').config

const cred = {
    host:`${process.env.DBHOST}`,
    user : `${process.env.DBUSER}`,
    password : `${process.env.DBPASS}`
}

const con = mysql.createPool(cred);

exports.sqlQuery = async (query)=>{
    console.log(query);
    return new Promise((res,rej)=>{
        con.query(query,function(err,results,field){
            if(err){
                rej(err);
            }
            else{
                res(results);
            }
        })
    })
}
