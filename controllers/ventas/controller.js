import { getBD } from "../../db/db.js";
import { ObjectId } from "mongodb";

const queryAllVentas = async (callback) =>{
    const conexion = getBD();
    await conexion.collection('venta').find().limit(50).toArray(callback);
};

const crearVenta = async (datosVenta,  callback) =>{
    
        if(
            Object.keys(datosVenta).includes('producto') &&
            Object.keys(datosVenta).includes('cantidad') &&
            Object.keys(datosVenta).includes('estado')
        ) {
            const conexion = getBD();
           await conexion.collection('venta').insertOne(datosVenta, callback);
        }else{
            return 'error';
    }
}

const buscarVenta = async (id,callback) => {
    const conexion = getBD();
    await conexion.collection('venta').findOne({ _id: new ObjectId(id)}, callback);
}

const editarVentas = async (id,edicion, callback) =>{
    const filtroVenta = {_id: new ObjectId(id)}
    const operacion = {
        $set: edicion,
    };
    const conexion = getBD();
    await conexion.collection('venta').findOneAndUpdate(filtroVenta, operacion,{upsert:true, returnOriginal:true}, 
        callback
        );
    
}

const eliminarVentas =async (id, callback) =>{
    const filtroVenta = { _id: new ObjectId(id) };
    const conexion = getBD();
    await conexion.collection('venta').deleteOne(filtroVenta, callback);
};

export {queryAllVentas, crearVenta, editarVentas, eliminarVentas, buscarVenta};