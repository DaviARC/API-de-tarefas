import express from "express";
import usuarioController from "../controllers/usuariosController.js";

const router = express.Router();

router
.get('/usuarios', usuarioController.listarUsuarios)
.get('/usuario/:id', usuarioController.listarUsuariosPorID)
.post('/usuario', usuarioController.cadastrarUsuarios)
.put('/usuario/:id', usuarioController.atualizarUsuario)
.delete('/usuario/:id', usuarioController.excluirUsuario)

export default router;