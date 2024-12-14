const express = require("express");
const CarroModel = require('./models/CarroModel');
const AuxiliarModel = require('./models/AuxiliarModel');
const app = express();  
app.set("view engine", "ejs");
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://evqv:B6CE496krl6OvEJ7@cluster0.yef7z.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
app.use('/assets', express.static('assets'));

const carroRoutes = require("./routes/carroRoutes");
const auxiliarRoutes = require("./routes/auxiliarRoutes");

app.use(auxiliarRoutes);
app.use(carroRoutes);


app.get("/", function(req, res){
    res.render("index");
    
});

app.listen("888", function(){
    console.log("Rodando");
});