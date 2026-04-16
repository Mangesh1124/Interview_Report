import React, { useEffect, useRef, useState } from "react";
import "../styles/home.scss";
import { useInterview } from "../hook/useInterview";
import { useNavigate } from "react-router";
import { useAuth } from "../../auth/hooks/useAuth";

const Home = () => {
  const { loading, generateReport, reports, getAllReports } = useInterview();
  const [jobDescription, setJobDescription] = useState("");
  const [selfDescription, setSelfDescription] = useState("");
  const resumeInputRef = useRef();
  const navigate = useNavigate();
  const { handleLogout } = useAuth();

  useEffect(() => {
    getAllReports();
  }, []);

  const handleGenerateReport = async () => {
    const resumeFile = resumeInputRef.current.files[0];
    const data = await generateReport({
      jobDescription,
      selfDescription,
      resumeFile,
    });
    navigate(`/interview/${data._id}`);
  };

  const handleLogoutHome = ()=>{

    handleLogout();
    navigate("/login")

  }

  if (loading) {
    return (
      <main>
        <h1>Your report is loading..</h1>
      </main>
    );
  }

  return (
    <>
      <main className="home">
        <div className="home-wrapper">
          <div className="brand">
          <div>
            <span className="brand-name">
              Luminescent <span className="brand-accent">Insight</span>
            </span>
            </div>
            <div>
              <button onClick={handleLogoutHome} className="button primary-button">Logout</button>
            </div>
            
          </div>

          <div className="hero">
            <h1>
              Craft Your <em>Intelligence</em>
            </h1>
            <p className="subtitle">
              Input the role details and your profile to generate a high-impact,
              AI-powered interview roadmap.
            </p>
          </div>

          <div className="interview-input-group">
            <div className="left">
              <label htmlFor="jobDescription">Job Description</label>
              <textarea
                onChange={(e) => {
                  setJobDescription(e.target.value);
                }}
                name="jobDescription"
                placeholder="Paste the target job description here..."
                id="jobDescription"
              ></textarea>
            </div>

            <div className="right">
              <div className="input-group">
                <label>Resume</label>
                <div className="file-drop-zone">
                  <div className="file-drop-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="16 16 12 12 8 16" />
                      <line x1="12" y1="12" x2="12" y2="21" />
                      <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
                    </svg>
                  </div>
                  <p className="drop-text">Drop your resume here</p>
                  <p className="drop-hint">PDF, DOCX up to 10MB</p>
                  <label className="file-label" htmlFor="resume">
                    Select File
                  </label>
                  <input
                    ref={resumeInputRef}
                    hidden
                    type="file"
                    name="resume"
                    id="resume"
                    accept=".pdf,.docx"
                  />
                </div>
              </div>

              <div className="input-group">
                <label htmlFor="selfDescription">Self Description</label>
                <textarea
                  onChange={(e) => {
                    setSelfDescription(e.target.value);
                  }}
                  name="selfDescription"
                  placeholder="Tell us about your key achievements and core values..."
                  id="selfDescription"
                ></textarea>
              </div>

              <button
                className="button primary-button"
                onClick={handleGenerateReport}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                </svg>
                Generate Interview Report
              </button>
            </div>
          </div>
        </div>
      </main>
      {/* Recent Reports List */}
      {reports.length > 0 && (
        <section className="recent-reports">
          <h2>My Recent Interview Plans</h2>
          <ul className="reports-list">
            {reports.map((report) => (
              <li
                key={report._id}
                className="report-item"
                onClick={() => navigate(`/interview/${report._id}`)}
              >
                <h3>{report.title || "Untitled Position"}</h3>
                <p className="report-meta">
                  Generated on {new Date(report.createdAt).toLocaleDateString()}
                </p>
                <p
                  className={`match-score ${report.matchScore >= 80 ? "score--high" : report.matchScore >= 60 ? "score--mid" : "score--low"}`}
                >
                  Match Score: {report.matchScore}%
                </p>
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
};

export default Home;
