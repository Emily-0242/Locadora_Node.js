const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const carroSchema = new Schema({
    marca: String,
    modelo: String,
    ano: Number,
    placa: String,
    cor: String,
    preco_diaria: Number
});

module.exports = mongoose.model("Carro", carroSchema);
