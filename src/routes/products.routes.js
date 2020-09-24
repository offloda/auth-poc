import { Router } from 'express'
const router = Router()

import * as productController from '../controllers/product.controller'

router.get('/', productController.getProducts)
router.get('/:productId', productController.getProductById)
router.post('/', productController.createProduct)
router.put('/:productId', productController.updateProductById)
router.delete('/:productId', productController.deleteProductById)

export default router
