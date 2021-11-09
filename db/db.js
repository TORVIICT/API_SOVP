import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";

dotenv.config({ path:"./.env"});

const stringConexion = process.env.DATABASE_URL;
const client = new MongoClient(stringConexion, {useNewUrlParser: true,useUnifiedTopology: true,});

let conexion;

const conectarBD = (callback) =>{
    client.connect((err,db)=>{
        if(err){
            console.error('error conectando a la base de datos');
        }
        conexion = db.db('sovp');
        console.log('conexion exitosa');
    
        return callback();
});
}

const getBD = () =>{
    return conexion;
}

export {conectarBD, getBD};