const express = require("express");
const CarroModel = require('./models/CarroModel');
const AuxiliarModel = require('./models/AuxiliarModel');
const app = express();  
app.set("view engine", "ejs");
app.use(express.static('public'));
app.use('/assets', express.static('assets'));
app.use(express.urlencoded({ extended: true }));
const session = require("express-session");
app.use(session({
    secret: 'ifpe',
    saveUninitialized: false,
    resave: false
}));
require('dotenv/config');
// Conexão com o banco de dados
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI);


const carroRoutes = require("./routes/carroRoutes");
const auxiliarRoutes = require("./routes/auxiliarRoutes");

app.use(auxiliarRoutes);
app.use(carroRoutes);


app.get("/", function(req, res){
    if(req.session.auxiliar){
        res.render("index");
    }else{
        res.redirect("/auxiliares/login");
    }    
});

app.listen(process.env.PORT, function(){
    console.log("Rodando");
});