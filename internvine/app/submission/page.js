'use client'
import React, { useState } from 'react';
import './page.css'

function ApplicationForm() {
  const [resume, setResume] = useState(null);
  const [coverLetter, setCoverLetter] = useState(null);

  const handleResumeUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setResume(file);
    } else {
      alert('Please upload a PDF file for your resume');
    }
  };

  const handleCoverLetterUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setCoverLetter(file);
    } else {
      alert('Please upload a PDF file for your cover letter');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!resume || !coverLetter) {
      alert('Please upload both resume and cover letter');
      return;
    }
    console.log('Submitted:', {resume, coverLetter });
  };

  return (
    <div className="application-form">
      <form onSubmit={handleSubmit}>
        <div className="upload-buttons">
          <div className="upload-group">
            <label htmlFor="resume" className="upload-label">
              Upload Resume (PDF)
              <input
                type="file"
                id="resume"
                accept=".pdf"
                onChange={handleResumeUpload}
                className="file-input"
                style={{ display: 'none' }}
              />
            </label>
            {resume && <span className="file-name">{resume.name}</span>}
          </div>

          <div className="upload-group">
            <label htmlFor="coverLetter" className="upload-label">
              Upload Cover Letter (PDF)
              <input
                type="file"
                id="coverLetter"
                accept=".pdf"
                onChange={handleCoverLetterUpload}
                className="file-input"
                style={{ display: 'none' }}
              />
            </label>
            {coverLetter && <span className="file-name">{coverLetter.name}</span>}
          </div>
        </div>

        <button type="submit" className="submit-btn">
          Submit Application
        </button>
      </form>
    </div>
  );
}

export default ApplicationForm;