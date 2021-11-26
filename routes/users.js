const {router} = require("express");
const MYSQL = require("mysql2/promise");
const BCRYPT = require("bcrypt");
const DATABASE = require("../db/database.json");
const SQLSENTENCES = require("../db/sqlsentences");
const FS = require("FS");
const ROUTES = router();

ROUTES.post("/users/register", async (req, res) => {
   
    const HASHED_PASS = await BCRYPT.hash(req.body.password,10);
    const DATA = [
        req.body.email,
        HASHED_PASS,
        req.body.nickname
    ];
    try{
        let con = await MYSQL.createConnection(database);
        await con.query(SQLSENTENCES.registerUser, DATA);
        return res.send("New user registered");
    }
    catch(err){
        console.log(err);
        return res.status(500).send("An error occurred on the server");
    }
});

ROUTES.post("/users/auth", async (req, res) => {
    const USERDATA =  [
        req.body.email,
        req.body.password
    ];
    try{
        let con = await MYSQL.createConnection(DATABASE);
        const [rows] = await con.query(SQLSENTENCES.authUser, [USERDATA[0]]);
        if(rows.length < 0 || ! await BCRYPT.compare(USERDATA[1],rows[0].password)){
            return res.status(401).send("Wrong Email or Password");
        }
        const nickname = rows[0].nickname;
        res.send(`Welcome ${nickname}`);
    }catch(err){
        console.log(err);
        return res.status(500).send("An error occurred on the server");
    }
});

ROUTES.get("/users/messages", (req, res) => {
    const SALUDOS = [
        `Hi `,
        `Welcome `
    ];
    return res.send(SALUDOS[Math.round(Math.random()* 4)]);
});

ROUTES.post("/users/text", async (req, res) => {
    FS.writeFile("./txt/tips.txt", req.body.text+"\n", err => {
        if(err){
            console.log(err);
            return res.status(500).send("An error occurred on the server");
        }
        res.send("The message was saved successfully");
    });

});

module.exports = ROUTES;