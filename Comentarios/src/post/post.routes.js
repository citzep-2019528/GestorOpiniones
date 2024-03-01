import express from 'express'
import { deleteP, editPost, newPost } from './post.controller.js'
import { validateJwt } from '../midadlewares/validate-jwt.js'

const api = express.Router()

api.post('/new',[validateJwt], newPost)
api.put('/edit/:id', [validateJwt], editPost)
api.delete('/delete/:id', [validateJwt], deleteP)

export default api