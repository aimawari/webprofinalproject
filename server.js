const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");

const mysql = require("mysql");
const config = require("./scripts/dbConfig");
let con = mysql.createConnection(config);

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
  });
app.use("/scripts", express.static(__dirname + "/scripts"));
app.use("/styles", express.static(__dirname + "/styles"));

//------------------ REGISTER ---------------------//
app.post("/register", function (req, res) {
    let username = req.body.username;
    let password = req.body.password;
    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    let email = req.body.email;

    bcrypt.hash(password, 10, function (err, hash) {
        if (err) {
            return console.error(err.message);
        }

        let sql = "INSERT INTO user (username, password, firstname, lastname, email, role) VALUES (?, ?, ?, ?, ?, 2)";
        con.query(sql, [username, hash, firstname, lastname, email], function (err, result, fields) {
            if (err) {
                return console.error(err.message);
            }

            res.send("Register Complete!");
        });
    });
});

//------------------ LOGIN ---------------------//
app.post("/login", function (req, res) {
    let username = req.body.username;
    let password = req.body.password;
    let sql = "SELECT username, password, role FROM user WHERE username = ?";
    con.query(sql, [username], function (err, result, fields) {
        if (err) {
            return console.error(err.message);
        }

        let numrows = result.length;
        if (numrows != 1) {
            res.status(401).end();
        }
        else {
            bcrypt.compare(password, result[0].password, function (err, resp) {
                if (err) {
                    return console.error(err.message);
                }


                if (resp == true) {
                    console.log(result[0])
                    switch (result[0].role) {
                        case 0:
                            res.send("Admin");
                            break;
                        case 1:
                            res.send("Lecturer");
                            break;
                        case 2:
                            res.send("Student");
                            break;
                    }
                }
                else {
                    res.status(403).end(); // wrong password
                }
            });
        }
    });
});

//------------------ PROJECT ---------------------//
//ดึงข้อมูลของโปรเจคทั้งหมด
app.get("/project", function (req, res) {
    let sql = "SELECT id, projectname, (SELECT firstname FROM user WHERE id = p.advisor) AS advisor, (SELECT firstname FROM user WHERE id = p.coadvisor) AS coadvisor, status FROM project p";
    con.query(sql, function (err, result, fields) {
        if (err) {
            console.log(err.message);
            res.status(400).end();
            return;
        }

        if (result.length == 0) {
            res.status(401).end();
        }
        else {
            res.json(result);
        }
    });
});

//ดึงข้อมูลของprojectตามid
app.get("/project/:id", function (req, res) {
    let id = req.params.id;
    let sql = "SELECT id, projectname, (SELECT firstname FROM user WHERE id = p.advisor) AS advisor,  p.advisor AS idadvisor,p.coadvisor AS idcoadvisor, (SELECT firstname FROM user WHERE id = p.coadvisor) AS coadvisor, status FROM project p WHERE id = ?";
    con.query(sql, [id], function (err, result, fields) {
        if (err) {
            console.log(err.message);
            res.status(400).end();
            return;
        }

        if (result.length == 0) {
            res.status(401).end();
        }
        else {
            res.json(result);
        }
    });
});

//ดึงข้อมูลstudentตามidของproject ที่studentนั้นทำโปรเจคนั้นอยู่
app.get("/project/:id/studentlist", function (req, res) {
    let id = req.params.id;
    let sql = "SELECT s.idstudent AS id,(SELECT firstname FROM user WHERE id = s.idstudent) AS firstname, (SELECT lastname FROM user WHERE id = s.idstudent) AS lastname, (SELECT email FROM user WHERE id = s.idstudent) AS email FROM student s WHERE idproject = ?";
    con.query(sql, [id], function (err, result, fields) {
        if (err) {
            console.log(err.message);
            res.status(400).end();
            return;
        }

        if (result.length == 0) {
            res.status(401).end();
        }
        else {
            res.json(result);
        }
    });
});

//เพิ่มstudentไปในโปรเจคตามidของโปรเจค  Note!!: ส่งidของstudentมาเป็น idstudent
app.post("/project/:id/addstudent", function (req, res) {
    let idproject = req.params.id;
    let idstudent = req.body.idstudent;
    let sql = "INSERT INTO student(idstudent,idproject) VALUES (?,?)";
    con.query(sql, [idstudent,idproject], function (err, result, fields) {
        if (err) {
            console.log(err.message);
            res.status(400).end();
            return;
        }

        if (result.length == 0) {
            res.status(401).end();
        }
        else {
            res.json(result);
        }
    });
});

//ดึงข้อมูลcomiteeตามidของproject ที่comiteeนั้นเป็นcomiteeของโปรเจคนั้นอยู่
app.get("/project/:id/comiteelist", function (req, res) {
    let id = req.params.id;
    let sql = "SELECT c.userid AS id,(SELECT firstname FROM user WHERE id = c.userid) AS firstname, (SELECT lastname FROM user WHERE id = c.userid) AS lastname, (SELECT email FROM user WHERE id = c.userid) AS email FROM comitee c WHERE projectid = ?";
    con.query(sql, [id], function (err, result, fields) {
        if (err) {
            console.log(err.message);
            res.status(400).end();
            return;
        }

        if (result.length == 0) {
            res.status(401).end();
        }
        else {
            res.json(result);
        }
    });
});

//เพิ่มcomiteeไปในโปรเจคตามidของโปรเจค  Note!!: ส่งidของcomiteeมา เป็น comiteeid
app.post("/project/:id/addcomitee", function (req, res) {
    let projectid = req.params.id;
    let comiteeid = req.body.comiteeid;
    let sql = "INSERT INTO comitee(userid,projectid) VALUES (?,?)";
    con.query(sql, [comiteeid,projectid], function (err, result, fields) {
        if (err) {
            console.log(err.message);
            res.status(400).end();
            return;
        }

        if (result.length == 0) {
            res.status(401).end();
        }
        else {
            res.json(result);
        }
    });
});

//เพิ่มprojectใหม่
app.post("/project", function (req, res) {
    let projectname = req.body.projectname;
    let advisor = req.body.advisor;
    let coadvisor = req.body.coadvisor;
    let status = req.body.status;
    let sql = "INSERT INTO project(projectname, advisor, coadvisor, status) VALUES (?,?,?,?)";

    con.query(sql, [projectname, advisor, coadvisor, status], function (err, result, fields) {
        if (err) {
            console.log(err.message);
            res.status(400).end();
            return;
        }
        let sql = "SELECT id FROM project WHERE projectname=?";

        con.query(sql, [projectname], function (err, result, fields) {
            if (err) {
                console.log(err.message);
                res.status(400).end();
                return;
            }
            res.json({message:"Success",idProject:result[0].id});
            
        });
        
    });
   

    
});

//แก้ไขprojectตามid
app.post("/project/:id", function (req, res) {
    let id = req.params.id;
    let projectname = req.body.projectname;
    let advisor = req.body.advisor;
    let coadvisor = req.body.coadvisor;
    let status = req.body.status;
    let sql = "UPDATE project SET projectname=?, advisor=?, coadvisor=?, status=? WHERE id=?";

    con.query(sql, [projectname, advisor, coadvisor, status, id], function (err, result, fields) {
        if (err) {
            console.log(err.message);
            res.status(400).end();
            return;
        }

        res.send("Success");
    });
});

//------------------ Lecturer ---------------------//
//ดึงข้อมูลLacturerทั้งหมด
app.get("/lecturer", function (req, res) {
    let sql = "SELECT id, username, firstname, lastname, email FROM user WHERE role = 1";
    con.query(sql, function (err, result, fields) {
        if (err) {
            console.log(err.message);
            res.status(400).end();
            return;
        }

        if (result.length == 0) {
            res.status(401).end();
        }
        else {
            res.json(result);
        }
    });
});

//ดึงข้อมูลLacturerรายคนตามid
app.get("/lecturer/:id", function (req, res) {
    let id = req.params.id;
    let sql = "SELECT username, firstname, lastname, email FROM user WHERE role = 1 and id = ?";
    con.query(sql, [id], function (err, result, fields) {
        if (err) {
            console.log(err.message);
            res.status(400).end();
            return;
        }

        if (result.length == 0) {
            res.status(401).end();
        }
        else {
            res.json(result);
        }
    });
});

//เพิ่มLacturerใหม่
app.post("/lecturer", function (req, res) {
    let username = req.body.username;
    let password = req.body.password;
    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    let email = req.body.email;

    bcrypt.hash(password, 10, function (err, hash) {
        if (err) {
            return console.error(err.message);
        }
        let sql = "INSERT INTO user(username, password, firstname, lastname, email, role) VALUES (?,?,?,?,?, 1)";

        con.query(sql, [username, hash, firstname, lastname, email], function (err, result, fields) {
            if (err) {
                console.log(err.message);
                res.status(400).end();
                return;
            }

            res.send("Success");
        });
    });
});

//แก้ไขLacturerตามid
app.post("/lecturer/:id", function (req, res) {
    let id = req.params.id;
    let username = req.body.username;
    let password = req.body.password;
    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    let email = req.body.email;

    bcrypt.hash(password, 10, function (err, hash) {
        if (err) {
            return console.error(err.message);
        }
        let sql = "UPDATE user SET username=?, password=?, firstname=?, lastname=?, email=? WHERE id=?";

        con.query(sql, [username, hash, firstname, lastname, email, id], function (err, result, fields) {
            if (err) {
                console.log(err.message);
                res.status(400).end();
                return;
            }

            res.send("Success");
        });
    });
});

//------------------ Student ---------------------//
//ดึงstudentทั้งหมดออกมาจากuser
app.get("/student", function (req, res) {
    let sql = "SELECT id, firstname, lastname, email FROM user WHERE role = 2";
    con.query(sql, function (err, result, fields) {
        if (err) {
            console.log(err.message);
            res.status(400).end();
            return;
        }

        if (result.length == 0) {
            res.status(401).end();
        }
        else {
            res.json(result);
        }
    });
});

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/views/index.html")
});

const port = process.env.port || 8088;
app.listen(port, function () {
    console.log("Server is ready at " + port);
})