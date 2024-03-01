'use strict'

import Comment from './comment.model.js'
import User from '../user/user.model.js'
import { checkComment } from '../utils/validator.js'

//Crear comentario
export const newComment = async (req, res)=>{
    try {
        let data = req.body
        let post = new Comment(data)
        let user = await User.findOne({_id: data.author})
        if(!user) return res.status(404).send({ message: 'Authot not found' })
        await post.save()
        return res.send({message: 'Comment saved successfully'})
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error  creating comment' })
    }
}

//editar comentario
export const editComment = async(req, res)=>{
    try {
        let { id }= req.params
        let data = req.body
        let update = checkComment(data, id)
        if(!update) return res.status(400).send({message: 'Have submitted some data that cannot be updated or missing data'})
        let updateComment = await Comment.findOneAndUpdate(
            {_id: id},
            data,
            {new: true}
        ).populate({
            path: 'post',
            select: 'title'
        })
        if(!updateComment) return res.status(401).send({message: 'Comment not found and not updated'})
        return res.send({message: 'Updated comment', updateComment})
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'Error updating'})
    }
}

//eliminar comentario
export const deleteC = async(req, res)=>{
    try{
        let { id } = req.params
        let deleteC = await Comment.findOneAndDelete({_id: id}) 
        if(!deleteC) return res.status(404).send({message: 'Comment not found and not deleted'})
        return res.send({message: 'Comment deleted successfully'})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error deleting comment'})
    }
}