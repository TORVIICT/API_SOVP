import Express from "express"
import { queryAllVentas, crearVenta, editarVentas, eliminarVentas, buscarVenta } from "../../controllers/ventas/controller.js";

const rutasVentas = Express.Router();

const genericCallback = (res) => (err, result) => {
    if (err) {
      console.log('error', err);
      res.status(500).json({ error: err });
    } else {
      res.json(result);
    }
  };

rutasVentas.route('/ventas').get  ((req, res)=> {
    queryAllVentas(genericCallback(res));
});

rutasVentas.route("/ventas").post ((req, res) =>{
    crearVenta(req.body, genericCallback(res))
});

rutasVentas.route('/ventas/:id').get  ((req, res)=> {
    buscarVenta(req.params.id,genericCallback(res));
});

rutasVentas.route('/ventas/:id').patch ((req, res) =>{
    editarVentas(req.params.id,req.body, genericCallback(res));

});

rutasVentas.route('/ventas/:id').delete ((req, res) =>{
    eliminarVentas(req.params.id, genericCallback(res));
});


export default rutasVentas;
