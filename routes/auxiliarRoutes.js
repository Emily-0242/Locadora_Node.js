const express = require("express");
const routes = express.Router();
const auxiliarController = require("../controllers/auxiliarController");

routes.post("/auxiliares", auxiliarController.cadastrarpost);
routes.post("/auxiliares/editar", auxiliarController.editarPost);
routes.get("/auxiliares/", auxiliarController.listar);
routes.get("/auxiliares/cadastrar/", auxiliarController.cadastrarGet); // pode vir parâmetro ou não.
routes.get("/auxiliares/remover/:cpf", auxiliarController.remover);
routes.get("/auxiliares/editar/:cpf", auxiliarController.editar);
routes.get("/auxiliares/:cpf", auxiliarController.filtrarauxiliar);


module.exports = routes;
