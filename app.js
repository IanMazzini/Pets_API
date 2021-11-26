const EXPRESS = require("express");
const CORS = require("cors");
const APP = express();
const PETS = require("./routes/pets");
const OWNER = require("./routes/owner");
const USERS = require("./routes/users");


APP.use(EXPRESS.json());
APP.use(CORS());
APP.use("/api/pets/images", EXPRESS.static(__dirname + "/public"));


APP.use("/api", PETS);
APP.use("/api", OWNER);
APP.use("/api", USERS);



APP.get("/", (req, res) => res.send("Hi"));
APP.listen("3000", err => {
    if( err ) throw err;
    console.log("Server open on port 3000");
});