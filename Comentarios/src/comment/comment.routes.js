import express from 'express'
import { validateJwt } from '../midadlewares/validate-jwt.js'
import { deleteC, editComment, newComment } from './comment.controller.js'

const api = express.Router()

api.post('/new', [validateJwt], newComment )
api.put('/edit/:id', [validateJwt], editComment)
api.delete('/delete/:id', [validateJwt], deleteC)

export default api