const {Router} = require('express');
const {check, body} = require('express-validator');



const router = Router();
const {
    usuarioGet,
    usuariosGet,
    usuariosPost,
    usuariosDelete,
    usuariosPut,
    usuariosPatch

} = require('../controllers/users.controller');

const { esRolValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');


router.get('/',usuariosGet);
router.get('/:id',usuarioGet);

router.post('/',[
    check('nombre','el nombre es obligatorio').not().isEmpty(),
    check('correo','no es un email válido').isEmail(),
    check('correo').custom(emailExiste),
    check('password','la contraseña debe tener mínimo 6 caracteres').isLength({min:6}),
    check('rol').custom(esRolValido),
    validarCampos
],usuariosPost)

router.delete('/:id',[
    check('id','No es un id válido').isMongoId().custom(existeUsuarioPorId),
    validarCampos
],
usuariosDelete);

router.put('/:id',[
    check('id','No es un id válido').isMongoId(),
    check('correo','no es un email válido').if(body('correo').exists()).isEmail().custom( emailExiste ),
    check('password','la contraseña debe tener mínimo 6 caracteres').if(body('password').exists()).isLength({min:6}),
    check('rol').if(body('rol').exists()).custom(esRolValido),
    validarCampos
],usuariosPut)

router.patch('/',usuariosPatch);




module.exports = router;