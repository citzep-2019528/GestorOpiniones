import {Schema, model} from 'mongoose'

const commentSchema = Schema({
    author:{
        type: Schema.Types.ObjectId,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    post:{
        type: Schema.Types.ObjectId,
        ref: 'post',
        required: true
    },
    text:{
        type: String,
        required:true
    }
})

export default model('comment', commentSchema)