require("dotenv").config();

const app = require("./src/app.js");
const connecToDB = require("./src/config/database.js");
// const generateInterviewReport = require("./src/services/ai.service.js");
// const {
//   jobDescription,
//   resume,
//   selfDescription,
// } = require("./src/services/temp.js");

connecToDB();
// generateInterviewReport({ resume, jobDescription, selfDescription });
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});



