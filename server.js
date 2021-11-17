//const express = require('express');
import  Express  from "express";
import { conectarBD } from "./db/db.js";
import Cors from "cors";
import dotenv from "dotenv";
import rutasVentas from "./views/ventas/rutas.js";
import rutasUsuarios from "./views/usuarios/rutas.js";
import rutasProductos from "./views/productos/rutas.js";
import jwt from 'express-jwt';
import jwks from 'jwks-rsa';

dotenv.config({ path:"./.env"});

const port = process.env.PORT || 5000;
const app = Express();



app.use(Express.json());
app.use(Cors());

var jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: 'https://sovp.us.auth0.com/.well-known/jwks.json'
}),
audience: 'api-autenticacion-sovp',
issuer: 'https://sovp.us.auth0.com/',
algorithms: ['RS256']
});

app.use(jwtCheck);

app.use(rutasVentas);
app.use(rutasUsuarios);
app.use(rutasProductos);

const main = () => {
    app.listen(port,()=>{
        console.log('esuchando puerto',{port});
  });
};

conectarBD(main);

