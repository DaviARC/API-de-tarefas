import express from "express";
import client from "../config/dbConnect.js";
import usuarioController from "../controllers/usuariosController.js";

const router = express.Router();

router
.get('/usuario', usuarioController.listarUsuarios)
.get('/usuario/:id', usuarioController.listarUsuariosPorID)
.post('/usuario', usuarioController.cadastrarUsuarios)
.put('/usuario/:id', usuarioController.atualizarUsuario)

export default router;