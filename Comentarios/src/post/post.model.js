import {Schema, model} from 'mongoose'

const postSchema = Schema({
    author:{
        type: Schema.Types.ObjectId,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    category:{
        type: Schema.Types.ObjectId,
        required: true
    },
    title:{
        type: String,
        required: true
    },
    text:{
        type: String,
        required:true
    }
})

export default model('post', postSchema)