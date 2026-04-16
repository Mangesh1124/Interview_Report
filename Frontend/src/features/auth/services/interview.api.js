import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

/**
 * 
 * @desc generate interview report based on  jobDescription,selfDescription,resumeFile 

 */

export const generateInterviewReport = async ({
  jobDescription,
  selfDescription,
  resumeFile,
}) => {
  const formData = new FormData();
  formData.append("jobDescription", jobDescription);
  formData.append("selfDescription", selfDescription);
  formData.append("resume", resumeFile);

  const response = await api.post("/api/interview/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

/**
 * @desc get interview report based on interview id
 */

export const getInterviewReportById = async (interviewId) => {
  const response = await api.get(`/api/interview/report/${interviewId}`); // ← add /report/
  return response.data;
};

/**
 * @desc get all interview report of a logged in user
 */

export const getAllInterviewReport = async () => {
  const response = await api.get("/api/interview/");
  return response.data;
};

/**
 * @desc service to generate resume pdf from the given resume content ,self description and job description
 */


export const generateResumePdf = async (interviewReportId) => {
  const response = await api.post(`/api/interview/resume/pdf/${interviewReportId}`,null,{
    headers: {
      "Content-Type": "application/pdf",
    },
    responseType: "blob", // ← important for handling binary data
  });

  return response.data;
}