import client from "../config/dbConnect.js"
import Usuario from "../models/usuario.js"


export default class usuarioController{
    static listarUsuarios = async(req,res)=>{
        try {
            const result = await client.query("SELECT * FROM t_adt_usuario ORDER BY cd_usuario")
            res.status(200).send(result.rows)
        } catch (error) {
            console.log(error);   
        }
    }
    static listarUsuariosPorID = async(req, res)=>{
        const id = req.params.id;
        console.log(id);
        const resultado = await client.query( "SELECT * FROM t_adt_usuario WHERE cd_usuario = $1",[id])
        res.status(200).send(resultado.rows)
    }
    static cadastrarUsuarios = async(req, res)=>{
        let autor = new Usuario(req.body)

        client.query("INSERT INTO t_adt_usuario VALUES ($1, $2, $3, $4)", [autor.cd_usuario, autor.nm_usuario, autor.dt_nascimento, autor.tel_usuario])
        res.status(200).send({
            message: "Autor cadastrado com sucesso"
        })
    }
    static atualizarUsuario = async(req,res)=>{
        const id = req.params.id;
        const body = new Usuario(req.body);
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

        await client.query(`UPDATE t_adt_usuario SET ${atributos} WHERE cd_usuario = $${atributosObj.length + 1}`, valores)
        res.status(200).send({message: "Usuario atualizado com sucesso"})
    }
    static excluirUsuario = async (req,res)=>{
        let id = [parseInt(req.params.id)];

        console.log(id);

        await client.query(`DELETE FROM t_adt_tarefa WHERE cd_usuario = ($1)`, id)
        await client.query(`DELETE FROM t_adt_usuario WHERE cd_usuario = ($1)`, id)
        res.status(200).send({message: "Usuario deletado com sucesso"})
    }
}   