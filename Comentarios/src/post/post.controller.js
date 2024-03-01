'use strict'
import Post from './post.model.js'
import User from '../user/user.model.js'
import { checkPost } from '../utils/validator.js'


// crear publicacion
export const newPost =  async(req, res)=>{
    try {
        let data = req.body
        data.user = req.user._id
        let post = new Post(data)
        let user = await User.findOne({_id: data.author})
        if(!user) return res.status(404).send({ message: 'Authot not found'})
        await post.save()
        return res.send({message: 'post saved successfully'})
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error creating post' })
    }

}

//editar publicacion
export const editPost = async(req, res)=>{
    try {
        let { id }= req.params
        let data = req.body
        let update = checkPost(data, id)
        if(!update) return res.status(400).send({message: 'Have submitted some data that cannot be updated or missing data'})
        let updatePost = await Post.findOneAndUpdate(
            {_id: id},
            data,
            {new: true}
        )
        if(!updatePost) return res.status(401).send({message: 'Post not found and not updated'})
        return res.send({message: 'Updated post', updatePost})
    } catch (err) {
        console.error(err)
        if(err.keyValue.post) return res.status(400).send({message: `Post ${err.keyValue.post} is alredy taken`})
        return res.status(500).send({message: 'Error updating'})
    }
}

//elimiar publicacion
export const deleteP = async(req, res)=>{
    try{
        let { id } = req.params
        let deleteP = await Post.findOneAndDelete({_id: id}) 
        if(!deleteP) return res.status(404).send({message: 'Post not found and not deleted'})
        return res.send({message: `Post ${deleteP.title} deleted successfully`})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error deleting post'})
    }
}
