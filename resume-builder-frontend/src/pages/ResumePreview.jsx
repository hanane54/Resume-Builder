import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axiosInstance from '../api/axiosConfig';
import { generatePDF } from '../utils/pdfGenerator';

const Container = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 2rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  color: #2c3e50;
  margin: 0;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: ${props => props.secondary ? '#95a5a6' : '#2c3e50'};
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${props => props.secondary ? '#7f8c8d' : '#34495e'};
  }
`;

const PreviewContainer = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(44, 62, 80, 0.15);
  margin-bottom: 2rem;
`;

const ErrorMessage = styled.div`
  color: #e74c3c;
  background-color: #fde8e8;
  padding: 0.75rem;
  border-radius: 5px;
  margin-bottom: 1rem;
  text-align: center;
`;

const ResumePreview = () => {
  const { resumeId, templateId } = useParams();
  const navigate = useNavigate();
  const [resumeData, setResumeData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const resumeRef = useRef(null);

  useEffect(() => {
    const fetchResumeData = async () => {
      try {
        const response = await axiosInstance.get(`/resumes/${resumeId}`);
        setResumeData(response.data);
      } catch (err) {
        console.error('Failed to fetch resume:', err);
        setError('Failed to load resume data. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchResumeData();
  }, [resumeId]);

  const handleDownload = async () => {
    try {
      if (!resumeRef.current) {
        throw new Error('Resume content not found');
      }
      await generatePDF(resumeRef.current, resumeData?.title || 'resume');
    } catch (err) {
      console.error('Failed to download resume:', err);
      setError('Failed to download resume. Please try again.');
    }
  };

  const handleEdit = () => {
    navigate(`/resume-builder/${resumeId}`);
  };

  if (isLoading) {
    return <Container>Loading...</Container>;
  }

  if (error) {
    return (
      <Container>
        <ErrorMessage>{error}</ErrorMessage>
        <Button onClick={() => navigate('/dashboard')}>Back to Dashboard</Button>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <Title>Resume Preview</Title>
        <ButtonGroup>
          <Button secondary onClick={handleEdit}>Edit Resume</Button>
          <Button onClick={handleDownload}>Download PDF</Button>
        </ButtonGroup>
      </Header>

      <PreviewContainer ref={resumeRef}>
        {/* Render the resume preview based on the selected template */}
        {templateId === 'modern' ? (
          <ModernTemplate resumeData={resumeData} />
        ) : (
          <ClassicTemplate resumeData={resumeData} />
        )}
      </PreviewContainer>
    </Container>
  );
};

// Modern Template Component
const ModernTemplate = ({ resumeData }) => {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1 style={{ color: '#2c3e50', marginBottom: '0.5rem' }}>{resumeData.fullName}</h1>
        <p style={{ color: '#7f8c8d' }}>{resumeData.email} | {resumeData.phone}</p>
        {resumeData.address && <p style={{ color: '#7f8c8d' }}>{resumeData.address}</p>}
      </div>

      {resumeData.summary && (
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ color: '#2c3e50', borderBottom: '2px solid #3498db', paddingBottom: '0.5rem' }}>Summary</h2>
          <p>{resumeData.summary}</p>
        </div>
      )}

      {resumeData.experience && resumeData.experience.length > 0 && (
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ color: '#2c3e50', borderBottom: '2px solid #3498db', paddingBottom: '0.5rem' }}>Experience</h2>
          {resumeData.experience.map((exp, index) => (
            <div key={index} style={{ marginBottom: '1rem' }}>
              <h3 style={{ color: '#34495e', marginBottom: '0.25rem' }}>{exp.position}</h3>
              <p style={{ color: '#7f8c8d', marginBottom: '0.25rem' }}>{exp.company} | {exp.startDate} - {exp.endDate || 'Present'}</p>
              <p>{exp.description}</p>
            </div>
          ))}
        </div>
      )}

      {resumeData.education && resumeData.education.length > 0 && (
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ color: '#2c3e50', borderBottom: '2px solid #3498db', paddingBottom: '0.5rem' }}>Education</h2>
          {resumeData.education.map((edu, index) => (
            <div key={index} style={{ marginBottom: '1rem' }}>
              <h3 style={{ color: '#34495e', marginBottom: '0.25rem' }}>{edu.degree}</h3>
              <p style={{ color: '#7f8c8d', marginBottom: '0.25rem' }}>{edu.institution} | {edu.startDate} - {edu.endDate || 'Present'}</p>
              {edu.fieldOfStudy && <p style={{ color: '#7f8c8d' }}>{edu.fieldOfStudy}</p>}
              {edu.description && <p>{edu.description}</p>}
            </div>
          ))}
        </div>
      )}

      {resumeData.skills && resumeData.skills.length > 0 && (
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ color: '#2c3e50', borderBottom: '2px solid #3498db', paddingBottom: '0.5rem' }}>Skills</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {resumeData.skills.map((skill, index) => (
              <span
                key={index}
                style={{
                  backgroundColor: '#3498db',
                  color: 'white',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '15px',
                  fontSize: '0.9rem'
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {resumeData.projects && resumeData.projects.length > 0 && (
        <div>
          <h2 style={{ color: '#2c3e50', borderBottom: '2px solid #3498db', paddingBottom: '0.5rem' }}>Projects</h2>
          {resumeData.projects.map((project, index) => (
            <div key={index} style={{ marginBottom: '1rem' }}>
              <h3 style={{ color: '#34495e', marginBottom: '0.25rem' }}>{project.name}</h3>
              {project.technologies && (
                <p style={{ color: '#7f8c8d', marginBottom: '0.25rem' }}>Technologies: {project.technologies}</p>
              )}
              <p>{project.description}</p>
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#3498db', textDecoration: 'none' }}
                >
                  View Project →
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Classic Template Component
const ClassicTemplate = ({ resumeData }) => {
  return (
    <div style={{ fontFamily: 'Georgia, serif', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem', borderBottom: '2px solid #2c3e50', paddingBottom: '1rem' }}>
        <h1 style={{ color: '#2c3e50', marginBottom: '0.5rem', fontSize: '2.5rem' }}>{resumeData.fullName}</h1>
        <p style={{ color: '#7f8c8d', fontSize: '1.1rem' }}>{resumeData.email} | {resumeData.phone}</p>
        {resumeData.address && <p style={{ color: '#7f8c8d' }}>{resumeData.address}</p>}
      </div>

      {resumeData.summary && (
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ color: '#2c3e50', borderBottom: '1px solid #2c3e50', paddingBottom: '0.5rem', fontSize: '1.5rem' }}>Professional Summary</h2>
          <p style={{ lineHeight: '1.6' }}>{resumeData.summary}</p>
        </div>
      )}

      {resumeData.experience && resumeData.experience.length > 0 && (
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ color: '#2c3e50', borderBottom: '1px solid #2c3e50', paddingBottom: '0.5rem', fontSize: '1.5rem' }}>Professional Experience</h2>
          {resumeData.experience.map((exp, index) => (
            <div key={index} style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ color: '#34495e', marginBottom: '0.25rem', fontSize: '1.2rem' }}>{exp.position}</h3>
              <p style={{ color: '#7f8c8d', marginBottom: '0.25rem', fontStyle: 'italic' }}>{exp.company} | {exp.startDate} - {exp.endDate || 'Present'}</p>
              <p style={{ lineHeight: '1.6' }}>{exp.description}</p>
            </div>
          ))}
        </div>
      )}

      {resumeData.education && resumeData.education.length > 0 && (
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ color: '#2c3e50', borderBottom: '1px solid #2c3e50', paddingBottom: '0.5rem', fontSize: '1.5rem' }}>Education</h2>
          {resumeData.education.map((edu, index) => (
            <div key={index} style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ color: '#34495e', marginBottom: '0.25rem', fontSize: '1.2rem' }}>{edu.degree}</h3>
              <p style={{ color: '#7f8c8d', marginBottom: '0.25rem', fontStyle: 'italic' }}>{edu.institution} | {edu.startDate} - {edu.endDate || 'Present'}</p>
              {edu.fieldOfStudy && <p style={{ color: '#7f8c8d' }}>{edu.fieldOfStudy}</p>}
              {edu.description && <p style={{ lineHeight: '1.6' }}>{edu.description}</p>}
            </div>
          ))}
        </div>
      )}

      {resumeData.skills && resumeData.skills.length > 0 && (
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ color: '#2c3e50', borderBottom: '1px solid #2c3e50', paddingBottom: '0.5rem', fontSize: '1.5rem' }}>Skills</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {resumeData.skills.map((skill, index) => (
              <span
                key={index}
                style={{
                  backgroundColor: '#2c3e50',
                  color: 'white',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '3px',
                  fontSize: '0.9rem'
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {resumeData.projects && resumeData.projects.length > 0 && (
        <div>
          <h2 style={{ color: '#2c3e50', borderBottom: '1px solid #2c3e50', paddingBottom: '0.5rem', fontSize: '1.5rem' }}>Projects</h2>
          {resumeData.projects.map((project, index) => (
            <div key={index} style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ color: '#34495e', marginBottom: '0.25rem', fontSize: '1.2rem' }}>{project.name}</h3>
              {project.technologies && (
                <p style={{ color: '#7f8c8d', marginBottom: '0.25rem', fontStyle: 'italic' }}>Technologies: {project.technologies}</p>
              )}
              <p style={{ lineHeight: '1.6' }}>{project.description}</p>
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#2c3e50', textDecoration: 'none', fontStyle: 'italic' }}
                >
                  View Project →
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ResumePreview;