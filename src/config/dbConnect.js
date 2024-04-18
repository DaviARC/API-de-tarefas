import pg from 'pg'
import Usuario from '../models/usuario.js';

const connectionString = `${process.env.CONNECTION_STRING}`;
 
const client = new pg.Client({
    connectionString
})


await client.connect( async()=>{
    try{
    console.log("Conectado com banco de dados!")
    
    const usuario = new Usuario(2, 'Mário', "21-10-2005", 749964321)

    // const { rows } = await client.query("INSERT INTO t_adt_usuario (cd_usuario, nm_usuario, dt_nascimento, tel_usuario) VALUES ($1, $2, $3, $4)", [usuario.codigoCliente, usuario.nome, usuario.dataNascimento, usuario.telefone])

    }catch(e){
        console.log(e)
    }
});

export default client;
