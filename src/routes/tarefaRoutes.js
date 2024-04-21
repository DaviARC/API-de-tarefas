import express from "express";
import tarefaController from "../controllers/tarefasController.js";
import verifyJWT from "../middlewares/verifyJWT.js";


const router = express.Router();

router
.get('/tarefas/:id', tarefaController.listarTarefas)
.get('/tarefas',verifyJWT, tarefaController.listarTarefasAutenticado)
.get('/tarefa/busca', tarefaController.listarTarefaPorNome)
.post('/tarefa', tarefaController.cadastrarTarefas)

export default router;