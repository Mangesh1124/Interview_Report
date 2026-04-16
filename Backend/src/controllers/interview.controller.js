const pdfParse = require("pdf-parse");
const {generateInterviewReport,generateResumePdf} = require("../services/ai.service");
const interviewReportModel = require("../models/interviewReport.model");

const generateInterviewReportController = async (req, res) => {
  const resumeFile = req.file;

  const resumeContent = await new pdfParse.PDFParse(
    Uint8Array.from(req.file.buffer),
  ).getText();
  const { selfDescription, jobDescription } = req.body;

  const interviewReportByAi = await generateInterviewReport({
    resume: resumeContent.text,
    selfDescription,
    jobDescription,
  });
  //  console.log("_id",req.user_id)
  //  console.log("id",req.user.id)
  const interviewReport = await interviewReportModel.create({

    user: req.user.id,
    resume: resumeContent.text,
    selfDescription,
    jobDescription,
    ...interviewReportByAi,
  });

  res.status(200).json({
    message: "Interview report generated successfully",
    interviewReport,
  });
};

/**
 * @description controller to get interview report based on interview id
 */

const getInterviewReportByIdController = async (req, res) => {
  const { interviewId } = req.params;
  console.log("interviewId", interviewId);

  const interviewReport = await interviewReportModel.findById(interviewId);

  if (!interviewReport) {
    return res.status(404).json({
      message: "Interview report not found",
    });
  }
  res.status(200).json({
    message: "Interview report found",
    interviewReport,
  });
};

/**
 * @description controller to get all interview report of a logged in user
 */

const getAllInterviewReportController = async (req, res) => {
  const interviewReports = await interviewReportModel
    .find({ user: req.user.id }) // ← _id instead of id
    .sort({ createdAt: -1 }) // ← chain before await
    .select(
      "-resume -selfDescription -jobDescription -technicalQuestions -behavioralQuestions",
    );
    console.log(req.user.id)

  res.status(200).json({
    message: "Interview reports fetched successfully",
    interviewReports,
  });
};

/**
 * 
 * @description controller to generate resume PDF on the bases of self description and job description and resume
 * 
 */

const generateResumePdfController = async(req,res)=>{

  const {interviewReportId} = req.params;
  const interviewReport = await interviewReportModel.findById(interviewReportId);
  if(!interviewReport){
    return res.status(404).json({
      message:"Interview report not found"
    })
  }

  const {selfDescription,jobDescription,resume} = interviewReport;
  const pdfBuffer = await generateResumePdf({selfDescription,jobDescription,resume});
  res.set({
    "Content-Type": "application/pdf",
    "Content-Disposition": `attachment; filename=resume_${interviewReportId}.pdf`,
  });
  res.send(pdfBuffer);
    
}


module.exports = {
  generateInterviewReportController,
  getInterviewReportByIdController,
  getAllInterviewReportController,
  generateResumePdfController,
};
