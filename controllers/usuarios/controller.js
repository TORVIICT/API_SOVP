import { getBD } from "../../db/db.js";
import { ObjectId } from "mongodb";
import jwt_decode from 'jwt-decode';
import { response } from "express";

const queryAllUsuarios = async (callback) =>{
    const conexion = getBD();
    await conexion.collection('usuario').find().limit(50).toArray(callback);
};

const crearUsuario = async (datosUsuario,  callback) =>{
        const conexion = getBD();
        await conexion.collection('usuario').insertOne(datosUsuario, callback);
    
}

const buscarUsuario = async (id,callback) => {
    const conexion = getBD();
    await conexion.collection('usuario').findOne({ _id: new ObjectId(id)}, callback);
}

const consultarOCrearUsuario = async (req, callback) => {
    const token =  req.headers.authorization.split('Bearer')[1];
    const user = jwt_decode(token)['http://localhost/userData'];
    console.log(user);
    const conexion = getBD();
    await conexion.collection('usuario').findOne({ email: user.email}, async (err, response) => {
        console.log('response de BD', response);
        if (response){
            callback(err, response);
        } else {
            user.auth0ID = user._id;
            delete user._id;
            user.rol = 'sin rol';
            user.estado = 'pendiente';
            await crearUsuario(user, (err, respuesta) => callback(err, user));
        }
    });
};

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

export {queryAllUsuarios, crearUsuario, editarUsuarios, eliminarUsuarios, buscarUsuario, consultarOCrearUsuario};