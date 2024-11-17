'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import './page.css'

function ApplicationForm() {
  const [resume, setResume] = useState(null);
  const [coverLetter, setCoverLetter] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [resumeUrl, setResumeUrl] = useState(null);
  const [coverLetterUrl, setCoverLetterUrl] = useState(null);

  const uploadFile = async (file) => {
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    
    try {
      const response = await fetch("/api/files", {
        method: "POST",
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error(`Upload failed: ${response.statusText}`);
      }
  
      const data = await response.json();
      setUploading(false);
      return data.url;
    } catch (e) {
      console.error('Upload error:', e);
      setUploading(false);
      alert("Trouble uploading file");
      return null;
    }
  };

  const handleResumeUpload = async (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      const url = await uploadFile(file);
      if (url) {
        setResume(file);
        setResumeUrl(url);
      }
    } else {
      alert('Please upload a PDF file for your resume');
    }
  };

  const handleCoverLetterUpload = async (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      const url = await uploadFile(file);
      if (url) {
        setCoverLetter(file);
        setCoverLetterUrl(url);
      }
    } else {
      alert('Please upload a PDF file for your cover letter');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!resume) {
      alert('Please upload your resume');
      return;
    }
    console.log('Submitted:', { resume: resumeUrl, coverLetter: coverLetterUrl });
  };

  return (
    <div className="application-page">
      <h1 className="company-title">Spring 2025 - Google STEP Internship</h1>
      <div className="company-image">
        <Image src="/google.jpg" alt="Google Logo" width={300} height={200} />
        <div className="company-blurb">
          <p>The Google STEP Internship is a 12-week paid program for first and second-year Computer Science undergraduates. Running from June to September 2025, interns work on software projects with Google engineers, gaining practical experience and mentorship. Applicants need programming skills in Java, C++, or Python. The program offers a stipend, housing support, and valuable industry exposure, bridging the gap between academics and professional work in tech.</p>
        </div>
      </div>
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

          <button type="submit" className="submit-btn" disabled={uploading}>
            {uploading ? "Uploading..." : "Submit Application"}
          </button>
        </form>
        <button className="back-btn" onClick={() => window.location.href = '/dashboard'}>
          Back to Dashboard
        </button>      
      </div>
      {resumeUrl && <img src={resumeUrl} alt="Resume Preview" />}
      {coverLetterUrl && <img src={coverLetterUrl} alt="Cover Letter Preview" />}
    </div>
  );
}