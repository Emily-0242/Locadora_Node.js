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


app.get("/", function(req, res){
    res.render("index");
    
});

app.get("/auxiliares", async function(req, res)  {
    const status = req.query.c;
    const auxiliares = await AuxiliarModel.find();
    res.render("auxiliares/listagem", { auxiliares, status });
});

app.post("/auxiliares", async function(req, res) {
    const novoAuxiliar = new AuxiliarModel({
        nome: req.body.inp_nome,
        email: req.body.inp_email,
        data_nascimento: req.body.inp_data_nascimento,
        cpf: req.body.inp_cpf,
    });

    try {
        const auxiliarExistente = await AuxiliarModel.findOne({ cpf: novoAuxiliar.cpf });

        if (auxiliarExistente) {
            return res.render("duplicacao_cpf");  
        }

        await novoAuxiliar.save();

        res.redirect("/auxiliares?c=1");

    } catch (error) {
        console.error("Erro ao registrar auxiliar:", error);
        res.status(500).send("Erro ao registrar auxiliar.");
    }
});


app.get("/auxiliares/cadastrar", function(req,res){
    res.render("auxiliares/cadastrar");
});

app.get("/auxiliares/:cpf", async function(req, res) {
    const cpf = req.params.cpf;
    const auxiliar = await AuxiliarModel.findOne({ cpf: cpf });
    if (auxiliar) {
        res.render("auxiliares/detalhar", { auxiliar });
    } else {
        res.render("404");
    }
});

app.get("/carros", async function(req, res)  {
    const status = req.query.c;
    const carros = await CarroModel.find();
    res.render("carro/listagem", { carros, status });
});

app.post("/carros", async function(req, res) {
    const novoCarro = new CarroModel({
        marca: req.body.inp_marca,
        modelo: req.body.inp_modelo,
        ano: req.body.inp_ano,
        placa: req.body.inp_placa,
        cor: req.body.inp_cor,
        preco_diaria: req.body.inp_preco_diaria, 
    });

    try {
        const carroExistente = await CarroModel.findOne({ placa: novoCarro.placa });
        if (carroExistente) {
            return res.render("duplicacao_placa");
        }

        await novoCarro.save();
        res.redirect("/carros?c=1");

    } catch (error) {
        console.error("Erro ao registrar veículo:", error);
        res.status(500).send("Erro ao registrar veículo.");  
    }
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