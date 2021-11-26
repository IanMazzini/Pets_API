const {Router} = require("express");
const route = Router();
const mysql = require("mysql2/promise");
const sqlSentences = require("../db/sqlSentences");
const database = require("../db/database.json");

route.post("/owner", async (req, res) => {
    const name = req.body.name; 
    try{
        const con = await  mysql.createConnection(database);
        const [ rows ] = await con.query(sqlSentences.insertOwner,[ name ]);
        return res.send(rows);
    }
    catch(err){
        return res.status(500).send("An error occurred");
    }  
});

route.get("/owner", async (req, res) => {
    try{
        const con = await  mysql.createConnection(database);
        const [ rows ] = await con.query(sqlSentences.selectOwners);
        return res.send(rows);
    }
    catch(err){
        return res.status(500).send("An error occurred on the server");
    }
});

route.post("/owner/adopt/pet", async (req, res) => {
    const data=[
        req.headers.owner_id,
        req.headers.id
    ];
    try{
        const con = await  mysql.createConnection(database);
        await con.query(sqlSentences.adoptPet,data);
        return res.send("Someone has adopted a pet");
    }
    catch(err){
        console.log(err);
        return res.status(500).send("An error occurred on the server");
    }
});

route.get("/owner/pets", async (req, res) => {
    const id=req.headers.id;
    try{
        const con = await  mysql.createConnection(database);
        const [ rows ] = await con.query(sqlSentences.selectByOwner,[id]);
        return res.send(rows);
    }
    catch(err){
        console.log(err);
        return res.status(500).send("An error occurred on the server");
    }
});

module.exports=route;