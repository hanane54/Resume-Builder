import React from 'react';
import styled from 'styled-components';

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f0f8ff;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 3rem;
  color: #2c3e50;
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  font-size: 1.5rem;
  color: #34495e;
`;

const Home = () => {
  return (
    <HomeContainer>
      <Title>Welcome to Hanane's Resume Builder ^_^</Title>
      <Subtitle>Create and manage your resumes easily</Subtitle>
    </HomeContainer>
  );
};

export default Home;