import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FileText } from 'lucide-react';

// If authenticated, it should show the opttion to start creating your resume, otherwise should not be accessible 
// With a button to take me to the ResumeBuilder Page

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f0f8ff;
  padding: 2rem;
  margin-top: 4rem;
`;

const WelcomeSection = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #34495e;
  margin-bottom: 2rem;
`;

const CreateResumeButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 2rem;
  font-size: 1.1rem;
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

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 4px rgba(44, 62, 80, 0.1);
  }
`;

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  const handleCreateResume = () => {
    navigate('/resume-builder');
  };

  return (
    <DashboardContainer>
      <WelcomeSection>
        <Title>Welcome to Your Dashboard</Title>
        <Subtitle>Start building your professional resume today</Subtitle>
      </WelcomeSection>
      
      <CreateResumeButton onClick={handleCreateResume}>
        <FileText size={24} />
        Create New Resume
      </CreateResumeButton>
    </DashboardContainer>
  );
};

export default Dashboard;