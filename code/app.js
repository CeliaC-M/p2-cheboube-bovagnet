const express = require('express')
const bodyParser = require("body-parser");
const mysql = require('mysql');
const {getCat, searchCats, postCat, putCat, deleteCat} = require("./refuge_mysql");
const app = express()

app.use(express.json()); // Nécessaire pour pouvoir utiliser des objets en js pour le POST

app.use(bodyParser.urlencoded({
    extended: true
}));

const port = 3000

// Connection à MYSQL
const connection = mysql.createConnection({
    database: 'test_tp',
    host: 'localhost',
    user: 'test-tp',
    password: 'ILA9JycYpFsu'
});
connection.connect()
console.log('Connection MYSQL [OK]')

// Routes

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

// GET /
app.get('/', (req, res) => {
    console.log('GET /');
    res.send('Welcome to the cat refuge')
})


// GET /chats
app.get('/chats', (req, res) => {
    console.log('GET /chats');

    searchCats(connection, function(err,results){
        if (err) {
            console.error(err);
            res.send(err)
        } else {
            // Erreur de lecture dans le navigateur si pas indiqué
            // res.setHeader('Access-Control-Allow-Origin', '*');
            res.send(results)
        }
    });
})


// GET /chat
app.get('/chat', (req, res) => {
    console.log('GET /chat');

    // recuperation de l'id du chat, l'id est passé à la fonction getCat
    getCat(connection,req.query.id, function(err,results){
        if (err) {
            console.error(err);
            res.send(err)
        } else {
            // Erreur de lecture dans le navigateur si pas indiqué
            // res.setHeader('Access-Control-Allow-Origin', '*');
            res.send(results)
        }
    });
})


// POST /chat
app.post('/chat', (req, res) => {

    console.log('POST /chat',req.body);

    postCat(connection,req.body,function(err,results){
        if (err) {
            console.error(err);
            res.send(err)
        } else {
            res.send(results)
        }
    });
})

// PUT /chat
app.put('/chat', (req, res) => {

    console.log('PUT /chat');
    putCat(connection,req.body,function(err,results){
        if (err) {
            console.error(err);
            res.send(err)
        } else {
            res.send(results)
        }
    });
})

// DELETE /chat
app.delete('/chat', (req, res) => {

    console.log('DELETE /chat');
    deleteCat(connection,req.query.id,function(err,results){
        if (err) {
            console.error(err);
            res.send(err)
        } else {
            res.send(results)
        }
    });
})

app.listen(port, () => {
    console.log(`Lancement API [OK] locahost:${port}`)
})
