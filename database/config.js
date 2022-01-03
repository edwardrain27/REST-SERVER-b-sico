const mongoose = require('mongoose');


const dbConnect = async()=>{

    try {
        await mongoose.connect(process.env.MONGODB);
        console.log(`Base de datos en linea`);
    } catch (error) {
        throw new Error(`error en la conexión de la base de datos`)
    }
}

module.exports = {dbConnect}