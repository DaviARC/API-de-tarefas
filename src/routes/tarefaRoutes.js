import express from "express";
import tarefaController from "../controllers/tarefasController.js";
import verifyJWT from "../middlewares/verifyJWT.js";


const router = express.Router();

router
.get('/tarefas/:id', tarefaController.listarTarefas)
.get('/tarefas',verifyJWT, tarefaController.listarTarefasAutenticado)
.get('/tarefa/busca', tarefaController.listarTarefaPorNome)
.put('/tarefa/:id', verifyJWT, tarefaController.atualizarTarefa)
.post('/tarefa',verifyJWT, tarefaController.cadastrarTarefaAutenticado)
.delete('/tarefa/:id', verifyJWT, tarefaController.apagarTarefa)
// .post('/tarefa', tarefaController.cadastrarTarefas)

export default router;