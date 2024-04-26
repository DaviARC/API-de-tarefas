import express, { response } from "express";
import client from "../config/dbConnect.js";
import jwt from "jsonwebtoken"

const router = express.Router()

router.post("/login", async (req,res) => {
    let login = {
        user: req.body.user,
        password: req.body.password
    }
    const resultado = await client.query("SELECT * FROM t_adt_usuario WHERE log_usuario = $1 and sen_usuario = $2", [login.user, login.password])
    if(resultado.rowCount !== 0){
        const token = jwt.sign({userId: resultado.rows[0].cd_usuario}, `${process.env.SECRET}`, {expiresIn: 300})
        return res.json({auth:true, token})
    }
    res.status(401).send({message: "Usuário não autorizado"}).end();
})

const blacklist = [];

router.get("logout", (req,res)=>{
    blacklist.push(req.headers['x-acess-token']);
    res.send("OK")
})

export default router;