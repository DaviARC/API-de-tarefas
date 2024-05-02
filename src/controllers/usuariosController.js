import client from "../config/dbConnect.js"
import ErroBase from "../erros/ErroBase.js"
import NaoEncontrado from "../erros/NaoEncontrado.js"
import Usuario from "../models/usuario.js"


export default class usuarioController{
    static listarUsuarios = async(req,res,next)=>{
        try {
            const result = await client.query("SELECT * FROM t_adt_usuario ORDER BY cd_usuario")
            
            res.status(200).send(result.rows)
        } catch (error) {
            next(error)
        }
    }
    static listarUsuariosPorID = async(req, res, next)=>{
        try{
        const id = req.params.id;

        const resultado = await client.query( "SELECT * FROM t_adt_usuario WHERE cd_usuario = $1",[id])
        
        resultado.rowCount !== 0 ? res.status(200).send(resultado.rows) : next(new NaoEncontrado());
            
        }catch (error){
            next(error);
        }
    }
    static cadastrarUsuarios = async(req, res, next)=>{
        try{     
            let usuario = new Usuario(req.body)

            client.query("INSERT INTO t_adt_usuario VALUES ($1, $2, $3, $4)", [usuario.nm_usuario, usuario.log_usuario, usuario.sen_usuario, usuario.cd_usuario])
            res.status(200).send({
                message: "Usuario cadastrado com sucesso"
            })
        } catch (error) {
            next(new ErroBase(error))
        }
    }
    static atualizarUsuario = async(req,res, next)=>{
        try{
            const id = req.params.id;
            let atributosObj = Object.keys(req.body);
            let valores = Object.values(req.body);
            valores.push(parseInt(id));
            let atributos = ''

            for(let i = 0; i < atributosObj.length; i++){
                let aux = i
                if(atributosObj.length - 1 === i){
                    atributos += `${atributosObj[i]}=$${aux + 1} `
                } else {
                    atributos += `${atributosObj[i]}=$${aux + 1}, `
                }
            };

            let resultado = await client.query(`UPDATE t_adt_usuario SET ${atributos} WHERE cd_usuario = $${atributosObj.length + 1}`, valores)

            resultado.rowCount !== 0 ? res.status(200).send({message: "Usuario atualizado com sucesso"}) : next(new NaoEncontrado(`O usuario de id ${id} não existe`));  

        } catch (error) {
            console.log(error);
            next(new ErroBase(error))
        }
    }
    static excluirUsuario = async (req,res, next)=>{
        try{
        let id = [req.params.id];

        await client.query(`DELETE FROM t_adt_tarefa WHERE cd_usuario = ($1)`, id)
        const resultado = await client.query(`DELETE FROM t_adt_usuario WHERE cd_usuario = ($1)`, id)
        resultado.rowCount !== 0 ? res.status(200).send({message: "Usuario deletado com sucesso"}) : next(new NaoEncontrado(`O usuario de id ${id} não existe`));  
        } catch (error) {
            next(new ErroBase(error))
        }
    }
}   