import Express from "express"
import { queryAllUsuarios, crearUsuario, editarUsuarios, eliminarUsuarios, buscarUsuario, consultarOCrearUsuario } from "../../controllers/usuarios/controller.js";

const rutasUsuarios = Express.Router();

const genericCallback = (res) => (err, result) => {
    if (err) {
      console.log('error', err);
      res.status(500).json({ error: err });
    } else {
      res.json(result);
    }
  };

rutasUsuarios.route('/usuarios').get  ((req, res)=> {
    queryAllUsuarios(genericCallback(res));
});

rutasUsuarios.route("/usuarios").post ((req, res) =>{
    crearUsuario(req.body, genericCallback(res))
});

rutasUsuarios.route('/usuarios/self').get  ((req, res)=> {
  console.log('alguien hizo get en /self');
  consultarOCrearUsuario(req, genercCallback(res));
});



rutasUsuarios.route('/usuarios/:id').get  ((req, res)=> {
    buscarUsuario(req.params.id,genericCallback(res));
});

rutasUsuarios.route('/usuarios/:id').patch ((req, res) =>{
    editarUsuarios(req.params.id,req.body, genericCallback(res));

});

rutasUsuarios.route('/usuarios/:id').delete ((req, res) =>{
    eliminarUsuarios(req.params.id, genericCallback(res));
});


export default rutasUsuarios;
