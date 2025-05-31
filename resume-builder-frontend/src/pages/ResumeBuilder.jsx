import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import axiosInstance from '../api/axiosConfig';
import { getResumeById, updateResume } from '../api/resume';

const Container = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(44, 62, 80, 0.15);
`;

const Title = styled.h1`
  color: #2c3e50;
  margin-bottom: 2rem;
  text-align: center;
`;

const Section = styled.div`
  margin-bottom: 2rem;
  padding: 1.5rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
`;

const SectionTitle = styled.h2`
  color: #34495e;
  margin-bottom: 1rem;
  font-size: 1.5rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 500;
  color: #2c3e50;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #bdc3c7;
  border-radius: 5px;
  font-size: 1rem;

  &:focus {
    border-color: #3498db;
    outline: none;
    box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
  }
`;

const TextArea = styled.textarea`
  padding: 0.75rem;
  border: 1px solid #bdc3c7;
  border-radius: 5px;
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;

  &:focus {
    border-color: #3498db;
    outline: none;
    box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
  }
`;

const Button = styled.button`
  padding: 1rem;
  background-color: #2c3e50;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #34495e;
  }

  &:disabled {
    background-color: #95a5a6;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  color: #e74c3c;
  background-color: #fde8e8;
  padding: 0.75rem;
  border-radius: 5px;
  margin-bottom: 1rem;
  text-align: center;
`;

const ResumeBuilder = () => {
  const navigate = useNavigate();
  const { resumeId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [resumeData, setResumeData] = useState({
    title: '',
    fullName: '',
    email: '',
    phone: '',
    address: '',
    summary: '',
    education: [{
      institution: '',
      degree: '',
      fieldOfStudy: '',
      startDate: '',
      endDate: '',
      description: ''
    }],
    experience: [{
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      description: ''
    }],
    skills: [''],
    projects: [{
      name: '',
      description: '',
      technologies: '',
      link: ''
    }]
  });

  useEffect(() => {
    const fetchResume = async () => {
      if (resumeId) {
        try {
          const data = await getResumeById(resumeId);
          setResumeData(data);
        } catch (err) {
          setError('Failed to fetch resume data');
          console.error('Error fetching resume:', err);
        }
      }
    };

    fetchResume();
  }, [resumeId]);

  const handleInputChange = (section, index, field, value) => {
    if (section === 'education' || section === 'experience' || section === 'projects') {
      const newArray = [...resumeData[section]];
      newArray[index] = { ...newArray[index], [field]: value };
      setResumeData({ ...resumeData, [section]: newArray });
    } else if (section === 'skills') {
      const newSkills = [...resumeData.skills];
      newSkills[index] = value;
      setResumeData({ ...resumeData, skills: newSkills });
    } else {
      setResumeData({ ...resumeData, [field]: value });
    }
  };

  const addItem = (section) => {
    if (section === 'education') {
      setResumeData({
        ...resumeData,
        education: [...resumeData.education, {
          institution: '',
          degree: '',
          fieldOfStudy: '',
          startDate: '',
          endDate: '',
          description: ''
        }]
      });
    } else if (section === 'experience') {
      setResumeData({
        ...resumeData,
        experience: [...resumeData.experience, {
          company: '',
          position: '',
          startDate: '',
          endDate: '',
          description: ''
        }]
      });
    } else if (section === 'projects') {
      setResumeData({
        ...resumeData,
        projects: [...resumeData.projects, {
          name: '',
          description: '',
          technologies: '',
          link: ''
        }]
      });
    } else if (section === 'skills') {
      setResumeData({
        ...resumeData,
        skills: [...resumeData.skills, '']
      });
    }
  };

  const removeItem = (section, index) => {
    const newArray = [...resumeData[section]];
    newArray.splice(index, 1);
    setResumeData({ ...resumeData, [section]: newArray });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      let response;
      if (resumeId) {
        response = await updateResume(resumeId, resumeData);
      } else {
        response = await axiosInstance.post('/resumes', resumeData);
      }
      console.log('Resume saved successfully:', response.data);
      navigate(`/resume-templates/${response.data.id}`);
    } catch (err) {
      console.error('Failed to save resume:', err);
      setError(err.response?.data?.message || 'Failed to save resume. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <Title>{resumeId ? 'Edit Resume' : 'Build Your Resume'}</Title>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      
      <Form onSubmit={handleSubmit}>
        {/* Basic Information Section */}
        <Section>
          <SectionTitle>Basic Information</SectionTitle>
          <FormGroup>
            <Label>Resume Title</Label>
            <Input
              type="text"
              value={resumeData.title}
              onChange={(e) => handleInputChange('basic', null, 'title', e.target.value)}
              placeholder="e.g., Software Engineer Resume"
              required
            />
          </FormGroup>
          <FormGroup>
            <Label>Full Name</Label>
            <Input
              type="text"
              value={resumeData.fullName}
              onChange={(e) => handleInputChange('basic', null, 'fullName', e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label>Email</Label>
            <Input
              type="email"
              value={resumeData.email}
              onChange={(e) => handleInputChange('basic', null, 'email', e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label>Phone</Label>
            <Input
              type="tel"
              value={resumeData.phone}
              onChange={(e) => handleInputChange('basic', null, 'phone', e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label>Address</Label>
            <Input
              type="text"
              value={resumeData.address}
              onChange={(e) => handleInputChange('basic', null, 'address', e.target.value)}
            />
          </FormGroup>
        </Section>

        {/* Summary Section */}
        <Section>
          <SectionTitle>Professional Summary</SectionTitle>
          <FormGroup>
            <Label>Summary</Label>
            <TextArea
              value={resumeData.summary}
              onChange={(e) => handleInputChange('basic', null, 'summary', e.target.value)}
              placeholder="Write a brief summary of your professional background and career goals"
              required
            />
          </FormGroup>
        </Section>

        {/* Education Section */}
        <Section>
          <SectionTitle>Education</SectionTitle>
          {resumeData.education.map((edu, index) => (
            <div key={index} style={{ marginBottom: '1rem', padding: '1rem', border: '1px solid #eee', borderRadius: '5px' }}>
              <FormGroup>
                <Label>Institution</Label>
                <Input
                  type="text"
                  value={edu.institution}
                  onChange={(e) => handleInputChange('education', index, 'institution', e.target.value)}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label>Degree</Label>
                <Input
                  type="text"
                  value={edu.degree}
                  onChange={(e) => handleInputChange('education', index, 'degree', e.target.value)}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label>Field of Study</Label>
                <Input
                  type="text"
                  value={edu.fieldOfStudy}
                  onChange={(e) => handleInputChange('education', index, 'fieldOfStudy', e.target.value)}
                />
              </FormGroup>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <FormGroup style={{ flex: 1 }}>
                  <Label>Start Date</Label>
                  <Input
                    type="date"
                    value={edu.startDate}
                    onChange={(e) => handleInputChange('education', index, 'startDate', e.target.value)}
                    required
                  />
                </FormGroup>
                <FormGroup style={{ flex: 1 }}>
                  <Label>End Date</Label>
                  <Input
                    type="date"
                    value={edu.endDate}
                    onChange={(e) => handleInputChange('education', index, 'endDate', e.target.value)}
                  />
                </FormGroup>
              </div>
              <FormGroup>
                <Label>Description</Label>
                <TextArea
                  value={edu.description}
                  onChange={(e) => handleInputChange('education', index, 'description', e.target.value)}
                />
              </FormGroup>
              {index > 0 && (
                <Button
                  type="button"
                  onClick={() => removeItem('education', index)}
                  style={{ backgroundColor: '#e74c3c' }}
                >
                  Remove Education
                </Button>
              )}
            </div>
          ))}
          <Button type="button" onClick={() => addItem('education')}>
            Add Education
          </Button>
        </Section>

        {/* Experience Section */}
        <Section>
          <SectionTitle>Work Experience</SectionTitle>
          {resumeData.experience.map((exp, index) => (
            <div key={index} style={{ marginBottom: '1rem', padding: '1rem', border: '1px solid #eee', borderRadius: '5px' }}>
              <FormGroup>
                <Label>Company</Label>
                <Input
                  type="text"
                  value={exp.company}
                  onChange={(e) => handleInputChange('experience', index, 'company', e.target.value)}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label>Position</Label>
                <Input
                  type="text"
                  value={exp.position}
                  onChange={(e) => handleInputChange('experience', index, 'position', e.target.value)}
                  required
                />
              </FormGroup>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <FormGroup style={{ flex: 1 }}>
                  <Label>Start Date</Label>
                  <Input
                    type="date"
                    value={exp.startDate}
                    onChange={(e) => handleInputChange('experience', index, 'startDate', e.target.value)}
                    required
                  />
                </FormGroup>
                <FormGroup style={{ flex: 1 }}>
                  <Label>End Date</Label>
                  <Input
                    type="date"
                    value={exp.endDate}
                    onChange={(e) => handleInputChange('experience', index, 'endDate', e.target.value)}
                  />
                </FormGroup>
              </div>
              <FormGroup>
                <Label>Description</Label>
                <TextArea
                  value={exp.description}
                  onChange={(e) => handleInputChange('experience', index, 'description', e.target.value)}
                  required
                />
              </FormGroup>
              {index > 0 && (
                <Button
                  type="button"
                  onClick={() => removeItem('experience', index)}
                  style={{ backgroundColor: '#e74c3c' }}
                >
                  Remove Experience
                </Button>
              )}
            </div>
          ))}
          <Button type="button" onClick={() => addItem('experience')}>
            Add Experience
          </Button>
        </Section>

        {/* Skills Section */}
        <Section>
          <SectionTitle>Skills</SectionTitle>
          {resumeData.skills.map((skill, index) => (
            <FormGroup key={index}>
              <Input
                type="text"
                value={skill}
                onChange={(e) => handleInputChange('skills', index, null, e.target.value)}
                placeholder="Enter a skill"
                required
              />
              {index > 0 && (
                <Button
                  type="button"
                  onClick={() => removeItem('skills', index)}
                  style={{ backgroundColor: '#e74c3c' }}
                >
                  Remove Skill
                </Button>
              )}
            </FormGroup>
          ))}
          <Button type="button" onClick={() => addItem('skills')}>
            Add Skill
          </Button>
        </Section>

        {/* Projects Section */}
        <Section>
          <SectionTitle>Projects</SectionTitle>
          {resumeData.projects.map((project, index) => (
            <div key={index} style={{ marginBottom: '1rem', padding: '1rem', border: '1px solid #eee', borderRadius: '5px' }}>
              <FormGroup>
                <Label>Project Name</Label>
                <Input
                  type="text"
                  value={project.name}
                  onChange={(e) => handleInputChange('projects', index, 'name', e.target.value)}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label>Description</Label>
                <TextArea
                  value={project.description}
                  onChange={(e) => handleInputChange('projects', index, 'description', e.target.value)}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label>Technologies Used</Label>
                <Input
                  type="text"
                  value={project.technologies}
                  onChange={(e) => handleInputChange('projects', index, 'technologies', e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label>Project Link</Label>
                <Input
                  type="url"
                  value={project.link}
                  onChange={(e) => handleInputChange('projects', index, 'link', e.target.value)}
                />
              </FormGroup>
              {index > 0 && (
                <Button
                  type="button"
                  onClick={() => removeItem('projects', index)}
                  style={{ backgroundColor: '#e74c3c' }}
                >
                  Remove Project
                </Button>
              )}
            </div>
          ))}
          <Button type="button" onClick={() => addItem('projects')}>
            Add Project
          </Button>
        </Section>

        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Saving...' : resumeId ? 'Update Resume' : 'Save Resume'}
        </Button>
      </Form>
    </Container>
  );
};

export default ResumeBuilder;