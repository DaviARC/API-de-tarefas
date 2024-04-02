import express from "express"

const routes = (app) => {
    app.route("/").get((req,res) => {
        res.status(200).send({titulo : "Administrador de tarefas"})
    })

    app.use(
        express.json(),
        
    )
}

export default routes;