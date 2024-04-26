import express from "express";
import routes from "./routes/index.js";
import manipulador404 from "./middlewares/manipulador404.js";
import manipuladorDeErros from "./middlewares/manipuladorDeErros.js";
import cors from "cors"


const app = express();
app.use(express.json())
app.use((req,res, next) =>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    app.use(cors());
    next();
})
routes(app);

app.use(manipulador404)
app.use(manipuladorDeErros)
export default app;