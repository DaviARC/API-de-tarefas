import client from "../config/dbConnect.js"
import NaoEncontrado from "../erros/NaoEncontrado.js";
import Tarefa from "../models/tarefa.js";

export default class tarefaController{
    static listarTarefas = async(req,res,next)=>{
        try{
            let id = req.params.id;

            const resultado = await client.query("SELECT * FROM t_adt_tarefa WHERE cd_usuario = ($1) ORDER BY cd_tarefa", [id])

            resultado.rowCount !== 0 ? res.status(200).send(resultado.rows) : next(new NaoEncontrado(`O usuario do id ${id} não possui tarefas ou não existe`));        
        } catch(error){
            next(error)
        }
    }
    static listarTarefasAutenticado = async(req,res,next)=>{
        try{
            let id = req.userId;

            const resultado = await client.query("SELECT * FROM t_adt_tarefa WHERE cd_usuario = ($1) ORDER BY cd_tarefa", [id])

            const rows = resultado.rows;

            resultado.rowCount !== 0 ? res.status(200).json({rows}) : next(new NaoEncontrado(`O usuario do id ${id} não possui tarefas ou não existe`));        
        } catch(error){
            next(error)
        }
    }
    static cadastrarTarefaAutenticado = async(req, res, next)=>{
        try
        {
        let tarefa = new Tarefa(req.userId, req.body.tit_tarefa, req.body.des_tarefa)

        await client.query("INSERT INTO t_adt_tarefa(cd_usuario, cd_tarefa, des_tarefa, tit_tarefa) VALUES ($1, $2, $3, $4)", [tarefa.cd_usuario, tarefa.cd_tarefa, tarefa.des_tarefa, tarefa.tit_tarefa])
       
        res.status(200).send({message:"Tarefa cadastrada com sucesso!"})
        }
        catch(error)
        {
            next(error);
        }
    }
    static cadastrarTarefas = async(req, res, next)=>{
        try
        {
        let tarefa = new Tarefa(req.body)

        console.log(tarefa.cd_usuario, tarefa.cd_tarefa, tarefa.des_tarefa, tarefa.tit_tarefa);

        await client.query("INSERT INTO t_adt_tarefa(cd_usuario, cd_tarefa, des_tarefa, tit_tarefa) VALUES ($1, $2, $3, $4)", [tarefa.cd_usuario, tarefa.cd_tarefa, tarefa.des_tarefa, tarefa.tit_tarefa])
       
        res.status(200).send({message:"Tarefa cadastrada com sucesso!"})
        }
        catch(error)
        {
            next(error);
        }
    }
    static listarTarefaPorNome = async(req,res,next)=>{
        try{
        const busca = await processaBusca(req.query)
        let atributos = Object.keys(busca);
        let valores = Object.values(busca)

        atributos.forEach((atributo, i) => {
            if(atributo === "cd_tarefa" || atributo === "cd_usuario"){
               valores[i] = parseInt(valores[i]);
            }
        })

        let query = "SELECT * FROM t_adt_tarefa WHERE "
        atributos.forEach((atributo, i)=>{
            query += `${atributo} = ($${i + 1})`
            if(atributos.length > 0 && i < atributos.length - 1){
                query += ` and `
            }
       })

       const resultado = await client.query(query, valores);

       resultado.rowCount !== 0 ? res.status(200).send(resultado.rows) : next(new NaoEncontrado());
    }
    catch(error){
        next(error)
    }
    }
}

async function processaBusca(parametros) {
        const {cd_usuario, cd_tarefa, des_tarefa, tit_tarefa} = await parametros;
        let busca = {}
        if(cd_usuario) busca.cd_usuario = cd_usuario
        if(des_tarefa) busca.des_tarefa = des_tarefa 
        if(tit_tarefa) busca.tit_tarefa = tit_tarefa
        if(cd_tarefa) busca.cd_tarefa = cd_tarefa

        return busca;
}

