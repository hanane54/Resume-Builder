import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import { getAllResumes, deleteResume } from '../api/resume';

// If authenticated, it should show the opttion to start creating your resume, otherwise should not be accessible 
// With a button to take me to the ResumeBuilder Page

const DashboardContainer = styled.div`
  max-width: 1200px;
  margin: 6rem auto 2rem;
  padding: 2rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #2c3e50;
`;

const CreateResumeButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  color: white;
  background-color: #2c3e50;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(44, 62, 80, 0.1);

  &:hover {
    background-color: #34495e;
    transform: translateY(-2px);
    box-shadow: 0 6px 8px rgba(44, 62, 80, 0.15);
  }
`;

const ResumesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const ResumeCard = styled.div`
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(44, 62, 80, 0.1);
  padding: 1.5rem;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const ResumeTitle = styled.h3`
  color: #2c3e50;
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
`;

const ResumeDate = styled.p`
  color: #7f8c8d;
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  background-color: ${props => {
    if (props.delete) return '#e74c3c';
    if (props.preview) return '#2ecc71';
    return '#3498db';
  }};
  color: white;

  &:hover {
    background-color: ${props => {
      if (props.delete) return '#c0392b';
      if (props.preview) return '#27ae60';
      return '#2980b9';
    }};
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(44, 62, 80, 0.1);
`;

const EmptyStateText = styled.p`
  color: #7f8c8d;
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
`;

const Dashboard = () => {
  const navigate = useNavigate();
  const [resumes, setResumes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    fetchResumes();
  }, [navigate]);

  const fetchResumes = async () => {
    try {
      const data = await getAllResumes();
      setResumes(data);
    } catch (err) {
      setError('Failed to fetch resumes');
      console.error('Error fetching resumes:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateResume = () => {
    navigate('/resume-builder');
  };

  const handleEditResume = (resumeId) => {
    navigate(`/resume-builder/${resumeId}`);
  };

  const handleDeleteResume = async (resumeId) => {
    if (window.confirm('Are you sure you want to delete this resume?')) {
      try {
        await deleteResume(resumeId);
        setResumes(resumes.filter(resume => resume.id !== resumeId));
      } catch (err) {
        setError('Failed to delete resume');
        console.error('Error deleting resume:', err);
      }
    }
  };

  const handlePreviewResume = (resumeId) => {
    // Navigate to the preview page with the modern template by default
    navigate(`/resume-preview/${resumeId}/modern`);
  };

  if (isLoading) {
    return <DashboardContainer>Loading...</DashboardContainer>;
  }

  return (
    <DashboardContainer>
      <Header>
        <Title>My Resumes</Title>
        <CreateResumeButton onClick={handleCreateResume}>
          <Plus size={20} />
          Create New Resume
        </CreateResumeButton>
      </Header>

      {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}

      {resumes.length === 0 ? (
        <EmptyState>
          <EmptyStateText>You haven't created any resumes yet.</EmptyStateText>
          <CreateResumeButton onClick={handleCreateResume}>
            <Plus size={20} />
            Create Your First Resume
          </CreateResumeButton>
        </EmptyState>
      ) : (
        <ResumesGrid>
          {resumes.map((resume) => (
            <ResumeCard key={resume.id}>
              <ResumeTitle>{resume.title}</ResumeTitle>
              <ResumeDate>
                Last updated: {new Date(resume.updatedAt).toLocaleDateString()}
              </ResumeDate>
              <ButtonGroup>
                <ActionButton preview onClick={() => handlePreviewResume(resume.id)}>
                  <Eye size={16} />
                  Preview
                </ActionButton>
                <ActionButton onClick={() => handleEditResume(resume.id)}>
                  <Edit size={16} />
                  Edit
                </ActionButton>
                <ActionButton delete onClick={() => handleDeleteResume(resume.id)}>
                  <Trash2 size={16} />
                  Delete
                </ActionButton>
              </ButtonGroup>
            </ResumeCard>
          ))}
        </ResumesGrid>
      )}
    </DashboardContainer>
  );
};

export default Dashboard;