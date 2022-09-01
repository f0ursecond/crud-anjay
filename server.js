const express = require('express')
const mysql = require("mysql")
const BodyParser = require("body-parser")

const app = express();
app.set("view engine", "ejs")
app.set("views", "views")
app.use(BodyParser.urlencoded({
    extended: true
}))

const db = mysql.createConnection({
    host: "localhost",
    database: "school",
    user: "root",
    password: "",
})

db.connect((err) => {
    if (err) throw err
    console.log("database connected...")

    
    app.get("/", (req, res) => {
        const sql = "SELECT * FROM user" 
        db.query(sql, (err, result) => {
        
            const users = JSON.parse(JSON.stringify(result)); 
            console.log('hasil database -> ', users)
            res.render("index", {users: users, title: "CRUD MULU KONTOL"})
        })    
    }) 

    app.post("/tambah", (req, res) => {
        const insertSql = `INSERT INTO user (id, nama , kelas , jurusan) VALUES 
        ('${req.body.id}','${req.body.nama}','${req.body.kelas}','${req.body.jurusan}');`
        db.query(insertSql, (err, result) => {
            if (err) throw err
            res.redirect("/")
        })
    } )
    
    

    
})



app.listen(8000, () => {
    console.log("Server Ready");
})