const {request, response} = require('express');

const bcryptjs = require('bcryptjs');


const Usuario = require('../models/usuario'); 

/**
 * Método encargado de retornar usuarios
 * @param {*} req 
 * @param {*} res 
 */
const usuariosGet = async(req=request, res=response)=>{
    
    const {desde=0,limite=5} = req.query; //forma en la cual se puede obtener datagramas por consulta en la url
    const query = {estado:true};
    
    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ])

    res.status(200).json({
        total,
        usuarios
    })
}

const usuarioGet= async(req=request, res=response)=>{
    
    const {id=1} = req.params;

    res.json({
        id
    })
}

/**
 * Método encargado de creación de usuarios en la base de datos
 * @param {*} req 
 * @param {*} res 
 */
const usuariosPost= async(req=request, res=response)=>{
    
    const {nombre, correo, password, rol} = req.body;

    const usuario = new Usuario({nombre, correo, password, rol});

    //encriptación de la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(JSON.stringify(password), salt);

    res.status(201).json(usuario);
    //guardado del usuario en la base de datos
    await usuario.save();
    
}

/**
 * Método encargado de actualizar información de los usuarios
 * @param {*} req 
 * @param {*} res 
 */
const usuariosPut= async(req=request, res=response)=>{

    const { id } = req.params;
    const {_id, correo, password, google, estado,...resto} = req.body;
    
    if(password){
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(JSON.stringify(password),salt);
    }

    if( correo ){
        resto.correo = correo;
    }
    
    const usuarioActualizado = await Usuario.findByIdAndUpdate(id, resto)

    res.json(usuarioActualizado);
}

const usuariosDelete= async(req=request, res=response)=>{
    
    const {id} = req.params;

    const usuario = await Usuario.findByIdAndUpdate(id,{estado:false});
    res.status(201).json({msg:"usuario eliminado",usuario});
}

const usuariosPatch= async(req=request, res=response)=>{
    
}

//exportación de los módulos
module.exports = {
    usuarioGet,
    usuariosGet,
    usuariosPost,
    usuariosDelete,
    usuariosPut,
    usuariosPatch
}