const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const carroSchema = new Schema({
    marca: String,
    modelo: String,
    ano: Number,
    placa: { type: String, unique: true },
    cor: String,
    preco_diaria: Number
});

module.exports = mongoose.model("Carro", carroSchema);
