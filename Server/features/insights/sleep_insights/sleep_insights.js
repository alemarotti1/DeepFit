const express = require('express');
const db = require("mysql");

//class that will be used to represent a sleep insight for a certain day
class SleepInsight {

    //constructor
    SleepInsight(desired_day, user_id, client_token){
        console.log(desired_day, user_id, client_token);
        // const connection = db.createConnection({
        //     host: 'localhost',
        //     user: 'root',
        //     password: 'root',
        //     database: 'DeepFit'
        // });
        
        // connection.connect(function(err) {
        //     if (err) throw err;
        //     console.log("Connected!");
        // });
        
        // //get the sleep data from the database
        // connection.query("SELECT * FROM treinador T, aluno A, dado_sono D where T.usuario = ? AND A.token_acesso = ? AND D.Aluno_tokenAcesso = A.token_acesso AND D.data_coleta = ?", [client_token, user_id, desired_day], function (err, result, fields) {
        //     if (err) throw err;
        //     console.log(result);
        // });
    }

}

module.exports = SleepInsight;
