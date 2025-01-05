const CarroModel = require("../models/CarroModel");

class carroController{

        static async listar (req, res)  {
        const status = req.query.c;
        const carros = await CarroModel.find();
        res.render("carro/listagem", { carros, status });
    };
    
    static async cadastrarPost(req, res) {
        if (req.body._id) {
            // Atualizar carro existente
            await CarroModel.findOneAndUpdate({ _id: req.body._id }, {
                marca: req.body.marca,
                modelo: req.body.modelo,
                ano: req.body.ano,
                placa: req.body.placa,
                cor: req.body.cor,
                preco_diaria: req.body.preco_diaria,
            });
            return res.redirect("/carros?c=3");
        } else {
            // Criar novo carro
            const novoCarro = new CarroModel({
                marca: req.body.inp_marca,
                modelo: req.body.inp_modelo,
                ano: req.body.inp_ano,
                placa: req.body.inp_placa,
                cor: req.body.inp_cor,
                preco_diaria: req.body.inp_preco_diaria,
            });
    
            try {
                const carroExistente = await CarroModel.findOne({ placa: novoCarro.placa });
                if (carroExistente) {
                    return res.render("duplicacao_placa");
                }
    
                // Salvar o novo carro
                await novoCarro.save();
                return res.redirect("/carros?c=1");
            } catch (error) {
                console.error("Erro ao registrar veículo:", error);
                return res.status(500).send("Erro ao registrar veículo.");
            }
        }
    };
    
    static async editarPost(req,res){
        await CarroModel.findOneAndUpdate({ _id: req.body.id_carro },{
            marca: req.body.inp_marca,
            modelo: req.body.inp_modelo,
            ano: req.body.inp_ano,
            placa: req.body.inp_placa,
            cor: req.body.inp_cor,
            preco_diaria: req.body.inp_preco_diaria,
        }) 
        res.redirect("/carros?c=3");
    };
    
    static async cadastrarGet (req,res){
        const placa = req.params.placa;
        let carro = {};
        if(placa){
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

    static async remover(req, res){
        const pla = req.params.placa;
        await CarroModel.deleteOne({ placa: pla})
        res.redirect("/carros?c=2")
    }

    static async editar (req, res){
        const id = req.params.placa;
        const carro = await CarroModel.findOne({ placa: id});
        res.render("carro/editar", {carro});
    }
}

module.exports = carroController;