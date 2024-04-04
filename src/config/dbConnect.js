import pg from 'pg'

const connectionString = `${process.env.CONNECTION_STRING}`;
 
const client = new pg.Client({
    connectionString
})


await client.connect();

export default client;