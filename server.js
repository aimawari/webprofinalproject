const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");

const mysql = require("mysql");
const config = require("./scripts/dbConfig");
let con = mysql.createConnection(config);

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/scripts", express.static(__dirname + "/scripts"));
app.use("/styles", express.static(__dirname + "/styles"));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/views/index.html")
});

const port = process.env.port || 8088;
app.listen(port, function () {
    console.log("Server is ready at " + port);
})