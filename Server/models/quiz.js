import mongoose from "mongoose";
const { ObjectId } = mongoose

const quizSchema = new mongoose.Schema({
    category:{
        type: ObjectId,
        ref:"Category"
    },
    question:{
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true
    },
    timeLimit:{
        type: String,
        required: true
    }
},{timestamps:true})

export default mongoose.model("Quiz",quizSchema)