const express = require("express")
const server = express()
const easyDB = require("easydb-io")
const docs = express.static("docs")
const urlencoded = express.urlencoded({ extended: true })  // Middleware que convierte de FormData a Object
const json = express.json() // Middleware que convierte de JSON a Object

const baseDeProductos = easyDB({
    database: '092b3a88-36b3-47f3-8574-3a4bde285bd3',
    token: '44209ee9-e797-417e-b25e-c66ed0fd772e'
  })
  

server.use(docs)
server.use(urlencoded)
server.use(json)

server.listen(2000)

server.post("/agregar", async (req, res) => {

    const ID = "id" + Math.random().toString(36).slice(2)
    await baseDeProductos.put(ID, req.body)
    res.end("Mira la consola..")

})

server.get("/mostrar", async (req, res) => {
   
    const productos = await baseDeProductos.list()
    res.json(productos)
})