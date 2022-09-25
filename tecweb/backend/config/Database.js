
import { Sequelize } from "sequelize";

const db = new Sequelize('users','root','',{
    host:"localhost",
    dialect:"mysql"
});

export default db;

/*
const express = require("express");
const mysql = require("mysql");
const app = express();
app.use(express.json());

const db = mysql.createConnection({
    user: "root",
    host:"localhost",
    password:"password",
    database:"utenti"
});
app.post('/register',(req,res)=>{
    db.query("INSERT INTO utenti (username,email,password) VALUES (?,?,?)",[username,email,password], (err,result) =>{
        console.log(err);
    }
    );
});
*/