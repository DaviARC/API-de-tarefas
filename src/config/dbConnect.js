import pg from 'pg'
const connectionString = `${process.env.CONNECTION_STRING}`;
 


const client = new pg.Client({
    connectionString
})

// const client = new pg.Client({
//   host: 'localhost',
//   port: 5432,
//   database: 'ADMINISTRADOR DE TAREFAS',
//   user: 'postgres',
//   password: 'admin',
// })

await client.connect();

export default client;