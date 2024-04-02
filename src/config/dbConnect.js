import pool from "pg";

async function connect(){
    if(global.connection){
        return global.connection.connect();
    }
    const pool = new Pool({
        connectionString: process.env.CONNECTION_STRING
    })

    const client = await pool.connect();
    console.log("Criou pool de conexões no PostgreeSQL!")

    const res = await client.query('SELECT NOW()')
    console.log(res.rows[0])
    client.release

    global.connection = pool
    return pool.connect();
}

export default connect();