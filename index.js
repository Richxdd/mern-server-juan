const express = require("express")
const conectarDB = require("./config/db")
const cors = require("cors")

// crear el servidor
const app = express()

// Conectar a la base de datos
conectarDB()

// habilitar cors
const whitelist = ["http://localhost:3000"]
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error("No permitido"))
    }
  },
}
app.use(cors(options))

// Habilitar express.json
app.use(express.json({ extended: true }))

// puerto de la app
const port = process.env.PORT || 4000

// Importar rutas
app.use("/api/usuarios", require("./routes/usuarios"))
app.use("/api/auth", require("./routes/auth"))
app.use("/api/proyectos", require("./routes/proyectos"))
app.use("/api/tareas", require("./routes/tareas"))

// arrancar la app
app.listen(port, "0.0.0.0", () => {
  console.log(`El servidor esta funcionando en el puerto ${port}`)
})
