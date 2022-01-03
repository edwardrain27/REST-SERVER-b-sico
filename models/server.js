const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { dbConnect } = require('../database/config');


class Server{


    constructor(){

        this.app = express();
        this.port = process.env.PORT || 8080; //puerto del servidor
        this.conectarDB();
        this.middlewares();
        this.patchs = {
            "users":"/api/users"
        }
        
        
        this.routes();
        
    }

    middlewares(){

        this.app.use( express.static('public') )//servir contenido estático
        this.app.use( cors() );
        this.app.use( express.json() );
        this.app.use( morgan('dev'));
    }

    routes(){

        this.app.use( this.patchs.users, require('../routes/user.routes'));
    }
    start(){
        this.app.listen(this.port, ()=> console.log(`Servidor escuchando en el puerto http://localhost:${this.port}`))
    }

    async conectarDB(){
        await dbConnect()
    }
}

module.exports = Server