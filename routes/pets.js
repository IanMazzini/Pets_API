const {router} = require("express");
const ROUTE = router();
const FS = require("fs");
const DATABASE = require("../db/database.json");
const SQL_SENTENCES = require("../db/sqlsentences");
const MYSQL = require("mysql2/promise");

ROUTE.get("/pets", async (req, res) => {
    const  withOwner = req.headers.flag==1 ? SQL_SENTENCES.selectWithOwners : SQL_SENTENCES.selectWithoutOwners;
    try{
        const con = await MYSQL.createConnection(DATABASE);
        const [ rows ] = await con.query(withOwner);
        return  res.status(200).send(rows);
    }catch(err){
        console.log(err);
        return res.status(500).send("An error occurred on the server");
    }
});

ROUTE.post("/pets", async (req, res) => {
    if( !req.body.name || !req.body.age || !req.body.animal) throw res.status(500).send("First, insert the DATA");
    const DATA = [
        req.body.name,
        req.body.age,
        req.body.animal
    ];
    try{
        const  con = await MYSQL.createConnection(DATABASE);
        await con.query(SQL_SENTENCES.insertPet,DATA);
        return res.status(200).send("A new pet was added");
    }catch(err){
        return res.status(500).send("An error occurred on the server");
    }
});

ROUTE.put("/pets", async (req, res) => {
    if(!req.body.name || !req.body.age || !req.body.animal) throw res.status(500).send("Insert data first");
    const DATA = [
        req.body.name,
        req.body.age,
        req.body.animal,
        req.body.id
    ];
    try{
        const CON = await MYSQL.createConnection(DATABASE);
        await CON.query(SQL_SENTENCES.updatePet,DATA);
        return res.status(200).send("The data of a pet has been modified");
    }
    catch(err){
        return res.status(500).send("An error occurred on the server");
    }
});

ROUTE.delete("/pets", async (req, res) => {
    const ID = req.headers.id;
    try{
        const CON = await MYSQL.createConnection(DATABASE);
        await CON.query(SQL_SENTENCES.deletePet,[ID]);
        return res.status(200).send("Someone has adopted a pet");
    }
    catch(err){
        return res.status(500).send("An error occurred on the server");
    }
});

ROUTE.get("/pet/description", async (req, res) => {
    try{
        const DATA = await FS.readFile("./txt/pets.txt","utf-8");
        return res.send(DATA);
    }catch(err){
        return res.status(500).send("No description available");
    }
});

module.exports=ROUTE;