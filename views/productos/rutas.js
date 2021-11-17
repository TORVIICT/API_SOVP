import Express from "express"
import { queryAllProductos, crearProducto, editarProductos, eliminarProductos, buscarProducto } from "../../controllers/productos/controller.js";

const rutasProductos = Express.Router();

const genericCallback = (res) => (err, result) => {
    if (err) {
      console.log('error', err);
      res.status(500).json({ error: err });
    } else {
      res.json(result);
    }
  };

rutasProductos.route('/productos').get  ((req, res)=> {
  console.log('alguien hizo get en la ruta /productos');
    queryAllProductos(genericCallback(res));
});

rutasProductos.route("/productos").post ((req, res) =>{
    crearProducto(req.body, genericCallback(res))
});

rutasProductos.route('/productos/:id').get  ((req, res)=> {
    buscarProducto(req.params.id,genericCallback(res));
});

rutasProductos.route('/productos/:id').patch ((req, res) =>{
    editarProductos(req.params.id,req.body, genericCallback(res));

});

rutasProductos.route('/productos/:id').delete ((req, res) =>{
    eliminarProductos(req.params.id, genericCallback(res));
});


export default rutasProductos;
