import Product from '../models/Product'

export const createProduct = async (req, res) => {
  try {
    const {name, category, price, imgUrl} = req.body
    await Product.create({name, category, price, imgUrl})
    res.status(201).json({
      status: true,
      msg: "Product Created",
    })
  } catch (error) {
    res.status(500).json({
      status: false,
      msg: "Can't create product"
    })
  }
}

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find()
    res.status(200).json({
      status: true,
      data: products,
    })
  } catch (error) {
    res.status(500).json({
      status: false,
      msg: "Can't get all products",
    })
  }
}

export const getProductById = async (req, res) => {
  try {
    const { productId } = req.params
    const product = await Product.findById(productId)
    res.status(200).json({
      status: true,
      data: product === null ? [] : product,
    })
  } catch (error) {
    res.status(500).json({
      status: false,
      msg: "Can't get product"
    })
  }
}

export const updateProductById = async (req, res) => {
  try {
    const { productId } = req.params
    const { price } = req.params
    const productUpdated = await Product.update({ _id: productId }, { price: price })
    if(productUpdated.nModified > 0) {
      return res.status(200).json({
        status: true,
        msg: 'Register updated',
      })
    }
    res.status(202).json({
      status: false,
      msg: `Not found register with id ${productId}`
    })
  } catch (error) {
    res.status(500).json({
      status: false,
      msg: "Can't update product"
    })
  }
}

export const deleteProductById = async (req, res) => {
  try {
    const { productId } = req.params
    const productDeleted = await Product.deleteOne({ _id: productId })
    if(productDeleted.deletedCount > 0) {
      return res.status(200).json({
        status: true,
        msg: 'Register deleted',
      })
    }
    res.status(202).json({
      status: false,
      msg: `Not found register with id ${productId}`
    })
  } catch (error) {
    res.status(500).json({
      status: false,
      msg: "Can't delete product"
    })
  }
}
