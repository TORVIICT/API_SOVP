import { getBD } from "../../db/db.js";
import { ObjectId } from "mongodb";

const queryAllProductos = async (callback) =>{
    const conexion = getBD();
    await conexion.collection('producto').find().limit(50).toArray(callback);
};

const crearProducto = async (datosProducto,  callback) =>{
    
        if(
            Object.keys(datosProducto).includes('producto') &&
            Object.keys(datosProducto).includes('cantidad') &&
            Object.keys(datosProducto).includes('estado')
        ) {
            const conexion = getBD();
           await conexion.collection('producto').insertOne(datosProducto, callback);
        }else{
            return 'error';
    }
}

const buscarProducto = async (id,callback) => {
    const conexion = getBD();
    await conexion.collection('producto').findOne({ _id: new ObjectId(id)}, callback);
}

const editarProductos = async (id,edicion, callback) =>{
    const filtroProducto = {_id: new ObjectId(id)}
    const operacion = {
        $set: edicion,
    };
    const conexion = getBD();
    await conexion.collection('producto').findOneAndUpdate(filtroProducto, operacion,{upsert:true, returnOriginal:true}, 
        callback
        );
    
}

const eliminarProductos =async (id, callback) =>{
    const filtroProducto = { _id: new ObjectId(id) };
    const conexion = getBD();
    await conexion.collection('producto').deleteOne(filtroProducto, callback);
};

export {queryAllProductos, crearProducto, editarProductos, eliminarProductos, buscarProducto};