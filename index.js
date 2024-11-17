const express = require("express");
const CarroModel = require('./models/CarroModel');
const app = express();  
app.set("view engine", "ejs");
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://evqv:B6CE496krl6OvEJ7@cluster0.yef7z.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
app.use('/assets', express.static('assets'));


app.get("/", function(req, res){
    res.render("index");
    
});

app.get("/carros", async function(req, res)  {
    const status = req.query.c;
    const carros = await CarroModel.find();
    res.render("carro/listagem", { carros, status });
});

//rota para cadastro de um novo carro
app.post("/carros", async function(req, res) {
    const novoCarro = new CarroModel ({
        marca: req.body.inp_marca,
        modelo: req.body.inp_modelo,
        ano: req.body.inp_ano,
        placa: req.body.inp_placa,
        cor: req.body.inp_cor,
        preco_diaria: req.body.inp_preco_diaria, 

    });
    await novoCarro.save();
    res.redirect("/carros?c=1");

});

app.get("/carros/cadastrar", function(req,res){
    res.render("carro/cadastrar");
});

app.get("/carros/:placa", async function(req, res) {
    const placa = req.params.placa;
    const carro = await CarroModel.findOne({ placa: placa });
    if (carro) {
        res.render("carro/detalhar", { carro });
    } else {
        // res.status(404).send("Veículo não encontrado");
        res.render("404");
    }
});

app.listen("888", function(){
    console.log("Rodando");
});