import { Router } from 'express'

import { authJwt } from '../middleware'
import * as productController from '../controllers/product.controller'

const router = Router()
router.get('/', productController.getProducts)
router.get('/:productId', productController.getProductById)
router.post('/', [authJwt.verifyToken, authJwt.isModerator], productController.createProduct)
router.put('/:productId', [authJwt.verifyToken, authJwt.isModerator], productController.updateProductById)
router.delete('/:productId', [authJwt.verifyToken, authJwt.isAdmin], productController.deleteProductById)

export default router
