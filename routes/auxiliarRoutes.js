const express = require("express");
const routes = express.Router();
const auxiliarController = require("../controllers/auxiliarController");

routes.post("/auxiliares", auxiliarController.cadastrarpost);
routes.get("/auxiliares/", auxiliarController.listar);
routes.get("/auxiliares/cadastrar/:cpf?", auxiliarController.cadastrarGet); // pode vir parâmetro ou não.
routes.get("/auxiliares/cadastrar/:cpf",  auxiliarController.filtrarauxiliar);



module.exports = routes;
