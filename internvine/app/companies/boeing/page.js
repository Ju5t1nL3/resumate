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
      <h1 className="company-title">Spring 2025 - Boeing Structural Engineering Intern</h1>
      <div className="company-image">
        <Image src="/boeing.jpeg" alt="Boeing Logo" width={300} height={200} />
        <div className="company-blurb">
          <p>Boeing is offering an exciting opportunity for structural engineering interns in their Summer 2025 Internship Program. The program, lasting 10-12 weeks, provides hands-on experience in various engineering projects, including commercial aircraft, space systems, and military systems. Interns will work directly with mentors, collaborate on real-world problems, and gain exposure to state-of-the-art manufacturing and research facilities. The position requires candidates to be enrolled in a core engineering discipline, such as Aerospace, Civil, or Mechanical Engineering, with an expected graduation date on or after August 2025. Successful applicants will have strong academic performance, exceptional organizational and communication skills, and a passion for aerospace engineering. The internship offers competitive pay ranging from $20-40 per hour and may include relocation assistance for eligible candidates.</p>
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

          <button type="submit" className="submit-btn" href='\dashboard' disabled={uploading}>
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

export default ApplicationForm;
