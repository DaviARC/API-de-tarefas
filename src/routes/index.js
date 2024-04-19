import express from "express"
import usuario from "./usuarioRoutes.js"
import tarefa from "./tarefaRoutes.js"

const routes = (app) => {
    app.route("/").get((req,res) => {
        res.status(200).send({titulo : "Administrador de tarefas"})
    })

    app.use(
        express.json(),   
        usuario,
        tarefa
    )
}

export default routes;