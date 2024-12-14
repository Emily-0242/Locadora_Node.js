const express = require("express");
const routes = express.Router();
const carroController = require("../controllers/carroController");

routes.post("/carros/", carroController.cadastrarPost);
routes.get("/carros/", carroController.listar);
routes.get("/carros/cadastrar/:placa", carroController.cadastrarGet);
routes.get("/carros/:placa", carroController.filtrarCarro);


module.exports = routes;