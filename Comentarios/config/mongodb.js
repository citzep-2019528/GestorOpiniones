'use strict'

import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import User from '../src/user/user.model.js'

export const connect = async()=>{
    try{
        //Proceso de conexión
        mongoose.connection.on('error', ()=>{
            console.log('MongoDB | could not be connect to mongodb')
            mongoose.disconnect()
        })
        mongoose.connection.on('connecting', ()=>{
            console.log('MongoDB | try connecting')
        })
        mongoose.connection.on('connected', ()=>{
            console.log('MongoDB | connected to mongodb')
        })
        mongoose.connection.once('open', async()=>{
            console.log('MongoDB | connected to database')

            const existing = await User.findOne()

            if (!existing) {
                const hashedPassword = await bcrypt.hash('admin123', 10); 
                const defaultUser = new User({
                    name: 'default',
                    surname: 'default',
                    username: 'admin',
                    password: hashedPassword, 
                    email: 'admin@gmail.com',
                    versionKey: false
                });
                await defaultUser.save();
                console.log('Default user created:', defaultUser);
            }
        })
        mongoose.connection.on('reconnected', ()=>{
            console.log('MongoDB | reconected to mongodb')
        })
        mongoose.connection.on('disconnected', ()=>{
            console.log('MongoDB | disconnected')
        })
        await mongoose.connect(process.env.URI_MONGO, {
            serverSelectionTimeoutMS: 5000,
            maxPoolSize: 50
        })
    }catch(err){
        console.error('Database connection failed',err)
    }
}

