import React from 'react';
import styled from 'styled-components';
import { Home, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f0f8ff;
  text-align: center;
  padding: 0 1rem;
`;

const ErrorCode = styled.h1`
  font-size: 6rem;
  color: #2c3e50;
  margin-bottom: 0.5rem;
`;

const AnimationContainer = styled.div`
  position: relative;
  display: inline-block;
  margin: 1rem 0;
`;

const SpinningCircle = styled.div`
  width: 4rem;
  height: 4rem;
  border: 0.5rem dashed #2c3e50;
  border-radius: 50%;
  animation: spin 2s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const CenterText = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: bold;
  color: #2c3e50;
`;

const Title = styled.h2`
  font-size: 2rem;
  color: #2c3e50;
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #34495e;
  margin-bottom: 2rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  
  @media (min-width: 640px) {
    flex-direction: row;
  }
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-weight: 500;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  transition: all 0.3s ease;
`;

const OutlineButton = styled(Button)`
  background-color: transparent;
  color: #2c3e50;
  border: 1px solid #2c3e50;
  
  &:hover {
    background-color: rgba(44, 62, 80, 0.1);
  }
`;

const SolidButton = styled(Button)`
  background-color: #2c3e50;
  color: white;
  border: none;
  
  &:hover {
    background-color: #1e2b38;
  }
`;

const NotFound = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  const goHome = () => {
    navigate('/');
  };

  return (
    <NotFoundContainer>
      <ErrorCode>404</ErrorCode>
      
      <AnimationContainer>
        <SpinningCircle />
        <CenterText>?</CenterText>
      </AnimationContainer>
      
      <Title>Page Not Found</Title>
      <Subtitle>
        We couldn't find the page you're looking for. It might have been moved, deleted, or never existed.
      </Subtitle>
      
      <ButtonContainer>
        <OutlineButton onClick={goBack}>
          <ArrowLeft size={18} />
          Go Back
        </OutlineButton>
        
        <SolidButton onClick={goHome}>
          <Home size={18} />
          Go Home
        </SolidButton>
      </ButtonContainer>
    </NotFoundContainer>
  );
};

export default NotFound;