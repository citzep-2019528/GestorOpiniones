import express from 'express'
import { login, register, test, update } from './user.controller.js'
import { validateJwt } from '../midadlewares/validate-jwt.js'


const api = express.Router()

api.get('/test', test)

api.post('/register', register)
api.post('/login', login)
api.put('/edit/:id', [validateJwt], update)

export default api