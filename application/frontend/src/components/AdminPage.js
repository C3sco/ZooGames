import React from 'react'
import { supabase } from './Database'
/*
Pagina con table con tutti gli user, possibilità di cercare user e di modificare i dati
*/

const db = supabase;

async function getUsers() {
    try{
        var users = await db.from('users').select('*');
    }catch(err){
        console.log("Connessione al database fallita: " + err);
    }

    return users
}

async function getSingleUser(username) {

    try{
        var user = await db.from('users').select('*').eq('username',username);
    }catch(err){
        console.log("Connessione al database fallita: " + err);
    }
    return user
}

async function deleteUser(username) {

    try{
        await db.from('users').delete('*').eq('username',username);
    }catch(err){
        console.log("Connessione al database fallita: " + err);
    }
    console.log("L'utente " + username + " è stato eliminato correttamente" );
    
}
 

export default function AdminPage() {

    var users = getUsers();

    if(users.length == 0){
        console.log("problema di ascincronicità");
    }else{
        console.log("await funziona");
    }

    for(let i=0; i<users.data.length; i++){
        users.data.at(i)
        
    }

    return(
        <>
        
        
        
        </>


    )
}

