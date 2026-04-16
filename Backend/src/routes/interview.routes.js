const express = require("express")
const interviewRouter = express.Router()
const authMiddleware = require("../middlewares/auth.middlewares")
const upload = require("../middlewares/file.middleware")
const {generateInterviewReportController, getAllInterviewReportController,getInterviewReportByIdController,generateResumePdfController} = require("../controllers/interview.controller")


/**
 * @route POST /api/interview/
 * @desc generate new interview report on the basis of user self description and job description and resume
 * @access Private  
 * 
 */


 interviewRouter.post("/",authMiddleware.authUser,upload.single("resume"),generateInterviewReportController)

 /**
  * @route GET /api/interview/report/:interviewId/
  * @desc get interview report by id
  * @access Private
  */
 
    interviewRouter.get("/report/:interviewId",authMiddleware.authUser,getInterviewReportByIdController)
    
    /**
     * @route GET /api/interview/
     * @description  to get all interview report of a logged in user
     *@access Private
    */
    interviewRouter.get("/",authMiddleware.authUser,getAllInterviewReportController)

    /**
     * @route POST /api/interview/resume/pdf
     * @description generate resume pdf from the given resume content ,self description and job description
     * @access Private
     */
    interviewRouter.post("/resume/pdf/:interviewReportId",authMiddleware.authUser,generateResumePdfController)
module.exports = interviewRouter