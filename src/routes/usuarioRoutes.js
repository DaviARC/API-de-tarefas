import express from "express";
import client from "../config/dbConnect.js";

const router = express.Router();

router
.get('/usuario', async(req, res)=>{
    const users = await client.query('SELECT * FROM t_adt_usuario')
    res.status(200).send(users)
})

export default router;