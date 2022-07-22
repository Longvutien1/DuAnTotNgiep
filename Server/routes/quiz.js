import express from "express";
import { addQuiz, deleteQuiz, detailQuiz, editQuiz, listQuiz } from "../controllers/quiz";


const router = express.Router()

router.get("/quizs", listQuiz )
router.get("/quizs/:id", detailQuiz )
router.post("/quizs", addQuiz )
router.put("/quizs/:id", editQuiz )
router.delete("/quizs/:id", deleteQuiz )

export default router