import { getBD } from "../../db/db.js";
import { ObjectId } from "mongodb";

const queryAllUsuarios = async (callback) =>{
    const conexion = getBD();
    await conexion.collection('usuario').find().limit(50).toArray(callback);
};

const crearUsuario = async (datosUsuario,  callback) =>{
    
        if(
            Object.keys(datosUsuario).includes('producto') &&
            Object.keys(datosUsuario).includes('cantidad') &&
            Object.keys(datosUsuario).includes('estado')
        ) {
            const conexion = getBD();
           await conexion.collection('usuario').insertOne(datosUsuario, callback);
        }else{
            return 'error';
    }
}

const buscarUsuario = async (id,callback) => {
    const conexion = getBD();
    await conexion.collection('usuario').findOne({ _id: new ObjectId(id)}, callback);
}

const editarUsuarios = async (id,edicion, callback) =>{
    const filtroUsuario = {_id: new ObjectId(id)}
    const operacion = {
        $set: edicion,
    };
    const conexion = getBD();
    await conexion.collection('usuario').findOneAndUpdate(filtroUsuario, operacion,{upsert:true, returnOriginal:true}, 
        callback
        );
    
}

const eliminarUsuarios =async (id, callback) =>{
    const filtroUsuario = { _id: new ObjectId(id) };
    const conexion = getBD();
    await conexion.collection('usuario').deleteOne(filtroUsuario, callback);
};

export {queryAllUsuarios, crearUsuario, editarUsuarios, eliminarUsuarios, buscarUsuario};