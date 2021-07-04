const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv/config");

const cors = require("cors");

const port = process.env.PORT || 3001;

//Middlewares:
//Ejecuta este código automáticamente con la aplicación.
app.use(express.json());
app.use(cors());
app.use("/public", express.static(__dirname + "/public"));


//Routes:
//Importa archivo 'posts' desde el folder 'routes'
//Usa las rutas del archivo 'posts' para el endpoint '/posts'
// const postRoute = require("./routes/posts");
// app.use("/posts", postRoute);

//CRUD ready Routes:

const usersRoute = require("./routes/users");
const ordersRoute = require("./routes/orders");

app.use("/user", usersRoute);
app.use("/orders", ordersRoute);


//Database Connection:
//Usa en método 'connect' del objeto 'mongoose' para conectarse
//a la base de datos (1er argumento: Date Base URL,
//2do argumento: prefixes requeridos). Después de conectar pintar en
//consola string. Si hay algun error, pintarlo en consola.
mongoose
  .connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch((err) => {
    console.error("Error!", err);
  });


//SERVER.JS ADDED FOR DEPLOYMENT:
if (process.env.NODE_ENV === 'production') {

    app.use(express.static('client/build'));
//Do not forget the req, res arguments!
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}


app.listen(port);
console.log("Listening 3000");
