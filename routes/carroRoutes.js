const express = require("express");
const routes = express.Router();
const carroController = require("../controllers/carroController");
const auth = require("../middleware/auxiliarAuth");

routes.post("/carros/", auth, carroController.cadastrarPost);
routes.post("/carros/editar", carroController.editarPost);
routes.get("/carros/", auth, carroController.listar);
routes.get("/carros/cadastrar", carroController.cadastrarGet);
routes.get("/carros/cadastrar/:placa", auth, carroController.cadastrarGet);
routes.get("/carros/:placa", auth, carroController.filtrarCarro);
routes.get("/carros/remover/:placa", auth, carroController.remover);
routes.get("/carros/editar/:placa", carroController.editar);


module.exports = routes;