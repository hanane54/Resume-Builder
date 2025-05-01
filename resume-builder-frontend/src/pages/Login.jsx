import React, { useState } from 'react';
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

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await login(credentials);
      console.log('Login is done successfully:', response);
      // Add your redirect logic here after successful login
    } catch (err) {
      console.error('Login failed:', err);
      // Could add error state handling here to display error message to user
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LoginContainer>
      <FormContainer onSubmit={handleSubmit}>
        <Title>Welcome Back</Title>
        
        <FieldContainer>
          <Label htmlFor="email">Email</Label>
          <Input 
            id="email"
            type="email" 
            placeholder="Email address" 
            value={credentials.email}
            onChange={(e) => setCredentials({ ...credentials, email: e.target.value })} 
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