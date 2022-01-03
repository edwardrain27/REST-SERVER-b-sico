const Usuario = require('../models/usuario');
const Role = require('../models/rol');

/**
 * Método encargado de validar si el correo ya está registrado en la base de datos
 * @param {*} correo 
 */
const emailExiste = async( correo = '')=>{

    const existeEmail = await Usuario.findOne({correo});
    if( existeEmail ){
        throw new Error(`El correo ${correo} ya está registrado en la base de datos`)
    }

}

const existeUsuarioPorId = async( id)=>{

    const existeUsuario = await Usuario.findById(id);
    if(!existeUsuario){
        throw new Error(`El usuario con id ${id} no existe en la base de datos`);
    }

}

/**
 * Método encargado de validar que el rol exista en la base de datos
 * @param {*} rol 
 */
const esRolValido = async( rol = '')=>{
    const existeRol = await Role.findOne({rol});
    if(!existeRol){
        throw new Error(`El rol ${rol} no está registrado en la base de datos`);
    }
}

module.exports = {
    esRolValido,
    emailExiste,
    existeUsuarioPorId
}