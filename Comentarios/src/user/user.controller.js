'use strict'

import User from './user.model.js'

import { encrypt, checkPassword, checkUpdate } from '../utils/validator.js'
import { generateJwt } from '../utils/jwt.js'

export const test = (req, res) => {
    console.log('test is running')
    return res.send({ message: 'Test is running' })
}
//registro de usuarios
export const register = async (req, res) => {
    try {
        let {username, email} = req.body
        let exists = await User.findOne({
            $or: [
                {
                    username
                },
                {
                    email
                }
            ]
        })
        if(exists){
            return res.status(500).send({message: 'Email or username alredy exists'})
        }
        data.password = await encrypt(data.password)
        let user = new User(data)
        await user.save()
        return res.send({ message: `Registered successfully, can be logged with username ${user.username}` })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error registering user', err: err })
    }
}
//login
export const login = async (req, res) => {
    try {
        let { username, password, email } = req.body
        let user = await User.findOne({ 
            $or:[
                {
                    username
                },
                {
                    email
                }
            ]
            })
        if (user && await checkPassword(password, user.password)) {
            let loggedUser = {
                uid: user._id,
                username: user.username,
                name: user.name
            }
            let token = await generateJwt(loggedUser)
            return res.send(
                {
                    message: `Welcome ${loggedUser.name}`,
                    loggedUser,
                    token
                }
            )
        }
        return res.status(404).send({message: 'Invalid credentials'})
    } catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error to login'})
    }

}

export const update = async(req, res)=>{
    try{
        let { id } = req.params
        let data = req.body
        let uid = req.user._id
        let update = checkUpdate(data, id)
        if(id != uid){
            return res.send({ message: 'It not your account'})
        }
        if(!update) return res.status(400).send({message: 'Have submitted some data that cannot be updated or missing data'})
        let updatedUser = await User.findOneAndUpdate(
            {_id: uid},
            data,
            {new: true}
        )
        if(!updatedUser) return res.status(401).send({message: 'User not found and not updated'})
        return res.send({message: 'Updated user', updatedUser})
    }catch(err){
        console.error(err)
        if(err.keyValue.username) return res.status(400).send({message: `Username ${err.keyValue.username} is alredy authorization`})
        return res.status(500).send({message: 'Error updating account'})
    }
}



