const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const auxiliarSchema = new mongoose.Schema({
    dataCriacao: {
        type: Date,
        default: Date.now,
    },
    nome: String,
    data_nascimento: {
        type: Date, 
    },
    email: String,
    cpf: { type: String, unique: true },
});
// Middleware para atribuir 'dataCriacao' a 'data_nascimento', se 'data_nascimento' não for fornecido
auxiliarSchema.pre("save", function (next) {
    if (!this.data_nascimento) {
        this.data_nascimento = this.dataCriacao;
    }
    next();
});
module.exports = mongoose.model("Auxiliares", auxiliarSchema);