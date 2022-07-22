import mongoose from "mongoose";
const { ObjectId } = mongoose

const answerQuizSchema = new mongoose.Schema({
    quiz:{
        type: ObjectId,
        ref: "Quiz"
    },
    answer:{
        type: String,
        required: true
    },
    isCorrect:{
        type: Number,
        required: true
    }
},{timestamps:true})

export default mongoose.model("AnswerQuiz",answerQuizSchema)