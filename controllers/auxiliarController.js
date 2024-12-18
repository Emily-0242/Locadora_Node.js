const AuxiliarModel = require("../models/AuxiliarModel");
const CarroModel = require("../models/CarroModel");

class AuxiliarController {

    static async listar(req, res)  {
        const status = req.query.c;
        const auxiliares = await AuxiliarModel.find();
        res.render("auxiliares/listagem", { auxiliares, status });
    };
    
    static async novoAuxiliar (req, res) {
        const novoAuxiliar = new AuxiliarModel({
            nome: req.body.inp_nome,
            email: req.body.inp_email,
            data_nascimento: req.body.inp_data_nascimento,
            cpf: req.body.inp_cpf,
        });
    
        try {
            const auxiliarExistente = await AuxiliarModel.findOne({ cpf: novoAuxiliar.cpf });
    
            if (auxiliarExistente) {
                return res.render("duplicacao_cpf");  
            }
    
            await novoAuxiliar.save();
    
            res.redirect("/auxiliares?c=1");
    
        } catch (error) {
            console.error("Erro ao registrar auxiliar:", error);
            res.status(500).send("Erro ao registrar auxiliar.");
        }
    };
    
    
    static async cadastrarpost(req,res){
        if(req.body._id){//atualizar
            await AuxiliarModel.findOneAndUpdate({_id: req.body._id},{
                nome: req.body.nome,
                email: req.body.email,
                data_nascimento: req.body.data_nascimento,
                cpf: req.body.cpf,
            });return res.redirect("/auxiliares?c=3");

        }else{
            const novoAuxiliar = new AuxiliarModel({
                nome: req.body.inp_nome,
                email: req.body.inp_email,
                data_nascimento: req.body.inp_data_nascimento,
                cpf: req.body.inp_cpf,
            });
            await novoAuxiliar.save();
            res.redirect("/auxiliares?c=1")
        }
    };

    
    static async editarPost(req,res){
        console.log(req.body.id_auxiliar);
        await AuxiliarModel.findOneAndUpdate({ _id: req.body.id_auxiliar },{
            nome: req.body.inp_nome,
            email: req.body.inp_email,
            data_nascimento: req.body.inp_data_nascimento,
            cpf: req.body.inp_cpf,
        }) 
        res.redirect("/auxiliares?c=3");
    };

        static async cadastrarGet(req, res){
            const cpf = req.params.cpf;
            let auxiliar = {};
            if(cpf != undefined){
                auxiliar = await AuxiliarModel.findOne({cpf});
            }res.render('auxiliares/cadastrar', {auxiliar});
    }
    
        static async filtrarauxiliar (req, res) {
            const cpf = req.params.cpf;
            const auxiliar = await AuxiliarModel.findOne({ cpf: cpf });
            if (auxiliar) {
                res.render("auxiliares/detalhar", { auxiliar });
            } else {
                res.render("404");
            }
    };

        static async remover (req,res){
            const _cpf = req.params.cpf;
            await AuxiliarModel.deleteOne({ cpf: _cpf});
            res.redirect("/auxiliares?c=2")
    }

        static async editar (req, res){
            const _cpf = req.params.cpf;
            const auxiliar = await AuxiliarModel.findOne({cpf: _cpf});
            res.render("auxiliares/editar", {auxiliar});
    }
}

module.exports = AuxiliarController;