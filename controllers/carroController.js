const CarroModel = require("../models/CarroModel");

class CarroController{

        static async listar (req, res)  {
        const status = req.query.c;
        const carros = await CarroModel.find();
        res.render("carro/listagem", { carros, status });
    };
    
    static async cadastrarPost (req, res) {
        if(req.body._id){
            await CarroModel.findOneAndUpdate({_id: req.body._id},{
                marca: req.body.marca,
                modelo: req.body.modelo,
                ano: req.body.ano,
                placa: req.body.placa,
                cor: req.body.cor,
                preco_diaria: req.body.preco_diaria,
            });res.redirect("/carros?c=3");

        }else{
            const novoCarro = new CarroModel({
                marca: req.body.inp_marca,
                modelo: req.body.inp_modelo,
                ano: req.body.inp_ano,
                placa: req.body.inp_placa,
                cor: req.body.inp_cor,
                preco_diaria: req.body.inp_preco_diaria, 
            });
        }

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
    };
    
    
    static async cadastrarGet (req,res){
        const placa = req.params.placa;
        let carro = [];
        if(placa != undefined){
            carro = await CarroModel.findOne({placa});
        }
        res.render("carro/cadastrar",{carro});
    };
    
    static async filtrarCarro (req, res) {
        const placa = req.params.placa;
        const carro = await CarroModel.findOne({ placa: placa });
        if (carro) {
            res.render("carro/detalhar", { carro });
        } else {
            // res.status(404).send("Veículo não encontrado");
            res.render("404");
        }
    };
}

module.exports = CarroController;