import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { register } from '../api/auth';

// Styled components for the registration page
const RegisterContainer = styled.div`
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
  padding: 2rem;
  width: 90%;
  max-width: 500px;
`;

const Title = styled.h2`
  font-size: 2rem;
  color: #2c3e50;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const FieldSet = styled.fieldset`
  border: none;
  padding: 0;
  margin: 0;
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

const RequiredMark = styled.sup`
  color: #e74c3c;
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

const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid #bdc3c7;
  border-radius: 5px;
  background-color: #f9f9f9;
  appearance: menulist;
  transition: border-color 0.3s, box-shadow 0.3s;

  &:focus {
    border-color: #3498db;
    box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
    outline: none;
  }
`;

const ErrorMessage = styled.p`
  color: #e74c3c;
  font-size: 0.85rem;
  margin-top: 0.5rem;
`;

const SubmitButton = styled.button`
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

  &:hover:not(:disabled) {
    background-color: #34495e;
  }

  &:disabled {
    background-color: #95a5a6;
    cursor: not-allowed;
  }
`;

// Password error message component
const PasswordErrorMessage = () => {
  return <ErrorMessage>Password should have at least 8 characters</ErrorMessage>;
};

// Email validation function
export const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState({
    value: "",
    isTouched: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const getIsFormValid = () => {
    return (
      username &&
      validateEmail(email) &&
      password.value.length >= 8 
    );
  };

  const clearForm = () => {
    setUsername("");
    setEmail("");
    setPassword({
      value: "",
      isTouched: false,
    });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const userData = {
        username,
        email,
        password: password.value
      };

      const response = await register(userData);
      console.log('Registration successful:', response);
      clearForm();
      navigate('/login'); // Redirect to login page after successful registration
    } catch (err) {
      console.error('Registration failed:', err);
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <RegisterContainer>
      <FormContainer onSubmit={handleSubmit}>
        <FieldSet>
          <Title>Sign Up</Title>
          
          {error && <ErrorMessage>{error}</ErrorMessage>}
          
          <FieldContainer>
            <Label>
              Username <RequiredMark>*</RequiredMark>
            </Label>
            <Input
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              placeholder="Username"
              required
            />
          </FieldContainer>
          
          <FieldContainer>
            <Label>
              Email address <RequiredMark>*</RequiredMark>
            </Label>
            <Input
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="Email address"
              type="email"
              required
            />
          </FieldContainer>
          
          <FieldContainer>
            <Label>
              Password <RequiredMark>*</RequiredMark>
            </Label>
            <Input
              value={password.value}
              type="password"
              onChange={(e) => {
                setPassword({ ...password, value: e.target.value });
              }}
              onBlur={() => {
                setPassword({ ...password, isTouched: true });
              }}
              placeholder="Password"
              required
            />
            {password.isTouched && password.value.length < 8 ? (
              <PasswordErrorMessage />
            ) : null}
          </FieldContainer>
          
          <FieldContainer>
            <Label>
              Role <RequiredMark>*</RequiredMark>
            </Label>
            <Select>
              <option value="individual">Individual</option>
              <option value="business">Business</option>
            </Select>
          </FieldContainer>
          
          <SubmitButton type="submit" disabled={!getIsFormValid() || isLoading}>
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </SubmitButton>
        </FieldSet>
      </FormContainer>
    </RegisterContainer>
  );
}

export default Register;