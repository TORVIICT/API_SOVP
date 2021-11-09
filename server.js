//const express = require('express');
import  Express  from "express";
import { conectarBD } from "./db/db.js";
import Cors from "cors";
import dotenv from "dotenv";
import rutasVentas from "./views/ventas/rutas.js";
import rutasUsuarios from "./views/usuarios/rutas.js";
import rutasProductos from "./views/productos/rutas.js";


dotenv.config({ path:"./.env"});


const app = Express();

app.use(Express.json());
app.use(Cors());
app.use(rutasVentas);
app.use(rutasUsuarios);
app.use(rutasProductos);

const main = () => {
    app.listen(process.env.PORT,()=>{
        console.log("escuchando puerto 5000");
  });
};

conectarBD(main);

