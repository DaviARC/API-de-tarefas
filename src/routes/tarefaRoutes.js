import express from "express";
import client from "../config/dbConnect.js";
import tarefaController from "../controllers/tarefasController.js";


const router = express.Router();

router
.get('/tarefas/:id', tarefaController.listarTarefas)
.get('/tarefa/busca', tarefaController.listarTarefaPorNome)
.post('/tarefa', tarefaController.cadastrarTarefas)

export default router;