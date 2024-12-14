const AuxiliarModel = require("../models/AuxiliarModel")

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
            });res.redirect("/auxiliares?c=3");

        }else{
            const novoAuxiliar = new AuxiliarModel({
                nome: req.body.inp_nome,
                email: req.body.inp_email,
                data_nascimento: req.body.inp_data_nascimento,
                cpf: req.body.inp_cpf,
            });
            await novoAuxiliar.save();
            res.redirect("/")
        }
    };

        static async cadastrarGet(req, res){
            const cpf = req.params.cpf;
            let auxiliar = {};
            if(cpf != undefined){
                auxiliar = await auxiliarModel.findOne({cpf});
            }res.render('auxiliares/cadastrar', {auxiliar});
        }
    
        static async filtrarauxiliar (req, res) {
            const cpf = req.params.cpf;
            const auxiliar = await auxiliarModel.findOne({ cpf: cpf });
            if (auxiliar) {
                res.render("auxiliares/detalhar", { auxiliar });
            } else {
                res.render("404");
            }
        };
}

module.exports = AuxiliarController;