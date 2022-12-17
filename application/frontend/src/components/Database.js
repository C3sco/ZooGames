
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://whkmnudljhmdydutsqzx.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indoa21udWRsamhtZHlkdXRzcXp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzEyNzU3OTMsImV4cCI6MTk4Njg1MTc5M30.636dYt5e5vcK5IR69s_x0IR9jI_wdOP8hFO78MEuU3U'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)


/*
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