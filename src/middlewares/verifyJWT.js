import jwt from "jsonwebtoken";

function verifyJWT(req,res,next){
    const token = req.headers['x-acess-token'];
    jwt.verify(token, `${process.env.SECRET}`, (err, decoded) => {
        if(err) return res.status(401).send({message: "Acesso negado"}).end();

        req.userId = decoded.userId;
        next();
    })
}

export default verifyJWT;