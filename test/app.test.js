import request from 'supertest'
import app from '../app'

describe('GET /', () => {
  test('should respond with a 200 status code', async () => {
    const response = await request(app).get('/')
    expect(response.statusCode).toBe(200)
  })
  test('should specify json in the content type header', async () => {
    const response = await request(app).get('')
    expect(response.body).toEqual(expect.stringContaining('HelloWorld'))
  })
})
