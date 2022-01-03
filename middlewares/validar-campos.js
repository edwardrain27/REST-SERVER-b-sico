const {request, response}=require('express');
const {validationResult} = require('express-validator');


const validarCampos = (req=request, res=response, next)=>{

    const errs = validationResult(req);
    if( !errs.isEmpty()){
        return res.status(400).json(errs)
    }
    next();

}

module.exports = {validarCampos}