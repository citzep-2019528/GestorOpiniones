import express from 'express'
import { newCategory } from './category.controller.js'


const api = express.Router()

api.post('/new', newCategory)

export default api