import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { login } from '../api/auth';

// Styled components for the login page
const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f0f8ff;
  padding: 2rem 0;
`;

const FormContainer = styled.form`
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(44, 62, 80, 0.15);
  padding: 2.5rem;
  width: 90%;
  max-width: 400px;
`;

const Title = styled.h2`
  font-size: 2rem;
  color: #2c3e50;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const FieldContainer = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-size: 1rem;
  color: #34495e;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid #bdc3c7;
  border-radius: 5px;
  background-color: #f9f9f9;
  transition: border-color 0.3s, box-shadow 0.3s;

  &:focus {
    border-color: #3498db;
    box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
    outline: none;
  }
`;

const LoginButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: #2c3e50;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 0.5rem;

  &:hover {
    background-color: #34495e;
  }
`;

const ForgotPassword = styled.div`
  text-align: right;
  margin-top: 0.5rem;
  margin-bottom: 1.5rem;
`;

const ForgotPasswordLink = styled.a`
  color: #3498db;
  font-size: 0.9rem;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const SignUpPrompt = styled.div`
  text-align: center;
  margin-top: 1.5rem;
  color: #7f8c8d;
  font-size: 0.95rem;
`;

const SignUpLink = styled.a`
  color: #3498db;
  text-decoration: none;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
`;

const ErrorMessage = styled.div`
  color: #e74c3c;
  background-color: #fde8e8;
  padding: 0.75rem;
  border-radius: 5px;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  text-align: center;
`;

const Login = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      const response = await login(credentials);
      console.log('Login successful:', response);
      // Store the token if it exists
      if (response.token) {
        localStorage.setItem('token', response.token);
      }
      // Redirect to dashboard
      navigate('/dashboard');
    } catch (err) {
      console.error('Login failed:', err);
      if (err.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        setError(err.response.data?.message || 'Invalid username or password');
      } else if (err.request) {
        // The request was made but no response was received
        setError('No response from server. Please check your connection.');
      } else {
        // Something happened in setting up the request that triggered an Error
        setError('An error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LoginContainer>
      <FormContainer onSubmit={handleSubmit}>
        <Title>Welcome Back</Title>
        
        {error && <ErrorMessage>{error}</ErrorMessage>}
        
        <FieldContainer>
          <Label htmlFor="username">Username</Label>
          <Input 
            id="username"
            type="text" 
            placeholder="Username" 
            value={credentials.username}
            onChange={(e) => setCredentials({ ...credentials, username: e.target.value })} 
            required
          />
        </FieldContainer>
        
        <FieldContainer>
          <Label htmlFor="password">Password</Label>
          <Input 
            id="password"
            type="password" 
            placeholder="Password" 
            value={credentials.password}
            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })} 
            required
          />
        </FieldContainer>
        
        <ForgotPassword>
          <ForgotPasswordLink href="#">Forgot password?</ForgotPasswordLink>
        </ForgotPassword>
        
        <LoginButton type="submit" disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Login'}
        </LoginButton>
        
        <SignUpPrompt>
          Don't have an account? <SignUpLink href="/register">Sign up</SignUpLink>
        </SignUpPrompt>
      </FormContainer>
    </LoginContainer>
  );
};

export default Login;