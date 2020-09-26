import { Router } from 'express'
import { verifySignup } from '../middleware'
const router = Router()

import * as authController from '../controllers/auth.controller'

router.post('/singup', [verifySignup.checkRolesExisted, verifySignup.checkDuplicateUsernameOrEmail], authController.singUp)

router.post('/singin', authController.singIn)


export default router
