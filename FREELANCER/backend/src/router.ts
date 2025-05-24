import  express  from 'express'
import userController from './controller/registerController'
import getAllUsuariosController from './controller/registerController'
import loginController from './controller/loginController'
import projectController from './controller/projectController' 
import authMiddleware  from './middleware/authMiddleware'

 export const router = express.Router()

// router.get('/api/usuarios', getAllUsuariosController.getAllUsuariosController)
router.get('/api/projetos',  projectController.getAllProjetosController)

router.post('/api/register', userController.createUserController)
router.post('/api/login', loginController.login)
router.post('/api/criar-projeto', authMiddleware.authMiddleware, projectController.createProjetoController)

router.delete('/api/projetos/:id', projectController.deletarProjetoController)

router.put('/api/projetos/:id', projectController.editarProjetoController)


