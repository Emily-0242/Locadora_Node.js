const express = require("express");
const routes = express.Router();
const carroController = require("../controllers/carroController");

routes.post("/carros/", carroController.cadastrarPost);
routes.post("/carros/editar", carroController.editarPost);
routes.get("/carros/", carroController.listar);
routes.get("/carros/cadastrar", carroController.cadastrarGet);
routes.get("/carros/cadastrar/:placa", carroController.cadastrarGet);
routes.get("/carros/:placa", carroController.filtrarCarro);
routes.get("/carros/remover/:placa", carroController.remover);
routes.get("/carros/editar/:placa", carroController.editar);


module.exports = routes;