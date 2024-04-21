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

    }catch(e){
        console.log(e)
    }
});

export default client;
