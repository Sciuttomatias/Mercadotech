const express = require("express")
const server = express()
const easyDB = require("easydb-io")
const docs = express.static(__dirname + "/docs")
const urlencoded = express.urlencoded({ extended: true })  // Middleware que convierte de FormData a Object
const json = express.json() // Middleware que convierte de JSON a Object

const baseDeProductos = easyDB({
    database: 'f03d39f4-98c4-4bea-88ef-14418819c8b0',
    token: '2c30371b-d411-47b8-84d3-6a2601fdef6f'
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