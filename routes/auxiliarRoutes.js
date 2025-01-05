const express = require("express");
const routes = express.Router();
const auxiliarController = require("../controllers/auxiliarController");
const auth = require("../middleware/auxiliarAuth");

routes.post("/auxiliares", auxiliarController.cadastrarpost);
routes.get("/auxiliares/", auth, auxiliarController.listar);
routes.get("/auxiliares/cadastrar/", auxiliarController.cadastrarGet); // pode vir parâmetro ou não.
routes.get("/auxiliares/login", auxiliarController.loginGet);
routes.get("/auxiliares/logout", auth, auxiliarController.logout);
routes.post("/auxiliares/login", auxiliarController.loginPost);
routes.get("/auxiliares/remover/:cpf",auth, auxiliarController.remover);
routes.post("/auxiliares/editar", auxiliarController.editarPost);
routes.get("/auxiliares/editar/:cpf", auxiliarController.editar);
routes.get("/auxiliares/:cpf", auth, auxiliarController.filtrarauxiliar);


module.exports = routes;
