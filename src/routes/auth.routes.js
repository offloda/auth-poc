import { Router } from 'express'
const router = Router()

import * as authController from '../controllers/auth.controller'

router.post('/singup', authController.singUp)

router.post('/singin', authController.singIn)


export default router
