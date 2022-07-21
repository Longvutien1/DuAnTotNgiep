import AnswerQuiz from "../models/answerQuiz"
import Quiz from "../models/quiz"

export const listQuiz = async (req,res)=>{
    try {
        const quiz = await Quiz.find().exec()
        res.json(quiz)
    } catch (error) {
        res.status(400).json({message:"Không tìm thấy Data"})
    }
}

export const detailQuiz = async (req,res)=>{
    try {
        const quiz = await Quiz.findOne({_id: req.params.id }).exec()
        const answerQuiz = await AnswerQuiz.find({quiz}).populate("quiz").exec()
        res.json({quiz,answerQuiz})
    } catch (error) {
        res.status(400).json({message:"Không tìm thấy Data"})
    }
}

export const addQuiz= async (req,res)=>{
    try {
        const quiz = await Quiz(req.body).save()
        res.json(quiz)
    } catch (error) {
        res.status(400).json({message:"Thêm thất bại"})
    }
}

export const editQuiz = async (req,res)=>{
    try {
        const quiz = await Quiz.findOneAndUpdate({_id: req.params.id }, req.body ,{new:true}).exec()
        res.json(quiz)
    } catch (error) {
        res.status(400).json({message:"Sửa thất bại"})
    }
}

export const deleteQuiz = async (req,res)=>{
    try {
        const quiz = await Quiz.findOneAndDelete({_id: req.params.id }).exec()
        res.json(quiz)
    } catch (error) {
        res.status(400).json({message:"Xóa thất bại"})
    }
}