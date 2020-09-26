import { Router } from 'express'

import { createUser } from '../controllers/user.controller'
import {
  authJwt,
  verifySignup,
} from '../middleware'

const router = Router()
router.post('/', [authJwt.verifyToken, authJwt.isAdmin, verifySignup.checkRolesExisted, verifySignup.checkDuplicateUsernameOrEmail], createUser)

export default router
