import supertest from 'supertest'
import app from '../src/app'
import '../src/database'
import Product from '../src/models/Product'

const request = supertest(app)

describe('PRODUCTS', () => {
  const newProduct = {
    _id: "5f66eb7f074a2f522b327d74",
    category: "Lácteos",
    createdAt: "2020-09-20T05:41:19.840Z",
    imgUrl: "https://agrarias.uach.cl/wp-content/uploads/2018/09/leche000.jpg",
    name: "Leche",
    price: 1000,
    updatedAt: "2020-09-20T05:41:19.840Z"
  }
  beforeAll(async () => {
    const product = new Product(newProduct)
    await product.save()
  })
  afterAll(async () => {
    await Product.deleteOne({ _id: newProduct._id })
  })

  it('should CREATE new Product', async done => {
    const productBody = {
      name: "Leche",
      category: "Lácteos",
      price: 1000,
      imgUrl: "https://agrarias.uach.cl/wp-content/uploads/2018/09/leche000.jpg",
    }
    const res = await request.post('/products').send(productBody)
    expect(res.status).toBe(201)
    expect(res.body).toHaveProperty('status', true)
    done()
  })

  it('should GET all Products', async done => {
    const res = await request.get('/products')
    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('status', true)
    expect(res.body.data.length).toBeGreaterThan(0)
    done()
  })

  it('should failed response on GET product by id', async done => {
    const res = await request.get('/products/5f6791d16acc0f522bafa1c0')
    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('status', true)
    expect(res.body.data.length).toBe(0)
    done()
  })

  it('should success response on GET product by id', async done => {
    const res = await request.get(`/products/${newProduct._id}`)
    expect(res.status).toBe(200)
    expect(res.body.data).toMatchObject(newProduct)
    done()
  })
  
  it('should success response on UPDATE product by id', async done => {
    const res = await request.put(`/products/${newProduct._id}`).send({
      price: 2000,
    })
    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('status', true)
    done()
  })

  it('should failed response on UPDATE product by id', async done => {
    const res = await request.put('/products/5f6791d16acc0f522bafa1c0').send({
      price: 2000,
    })
    expect(res.status).toBe(202)
    expect(res.body).toHaveProperty('status', false)
    done()
  })

  it('should success response on DELETE product by id', async done => {
    const res = await request.delete(`/products/${newProduct._id}`)
    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('status', true)
    done()
  })

  it('should failed response on DELETE product by id', async done => {
    const res = await request.delete('/products/5f6791d16acc0f522bafa1c0')
    expect(res.status).toBe(202)
    expect(res.body).toHaveProperty('status', false)
    done()
  })
})
