// src/routes/userRoutes.ts
import express from 'express'
import userController from './controller/registerController'
import loginController from './controller/loginController'
import createProjetoController from './controller/projectController'
import authMiddleware from './middleware/authMiddleware'

 export const router = express.Router()

router.post('/api/register', userController.createUserController)
router.post('/api/login', loginController.login)
router.post('/api/criar-projeto',authMiddleware.authMiddleware, createProjetoController.createProjetoController)

