import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
  background-color: #2c3e50;
  padding: 1rem 2rem;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1000;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const NavContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  color: #f0f8ff;
  font-size: 1.5rem;
  font-weight: bold;
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: #3498db;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  color: #f0f8ff;
  text-decoration: none;
  font-size: 1rem;
  transition: color 0.3s ease;
  padding: 0.5rem 1rem;
  border-radius: 4px;

  &:hover {
    color: #3498db;
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: #f0f8ff;
  font-size: 1.5rem;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileMenu = styled.div`
  display: none;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  background-color: #2c3e50;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    display: ${props => props.isOpen ? 'flex' : 'none'};
  }
`;

const Button = styled.button`
  background-color: transparent;
  color: white;
  border: 1px solid white;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s;

  &:hover {
    background-color: white;
    color: #2c3e50;
  }
`;

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, [location.pathname]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <Nav>
      <NavContainer>
        <Logo to="/">Resume Builder</Logo>
        
        <NavLinks>
          {isAuthenticated ? (
            <>
              <NavLink to="/dashboard">Dashboard</NavLink>
              <Button onClick={handleLogout}>Logout</Button>
            </>
          ) : (
            <>
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/register">Register</NavLink>
            </>
          )}
        </NavLinks>

        <MobileMenuButton onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? '✕' : '☰'}
        </MobileMenuButton>
      </NavContainer>

      <MobileMenu isOpen={isMobileMenuOpen}>
        {isAuthenticated ? (
          <>
            <NavLink to="/dashboard" onClick={toggleMobileMenu}>Dashboard</NavLink>
            <Button onClick={handleLogout}>Logout</Button>
          </>
        ) : (
          <>
            <NavLink to="/login" onClick={toggleMobileMenu}>Login</NavLink>
            <NavLink to="/register" onClick={toggleMobileMenu}>Register</NavLink>
          </>
        )}
      </MobileMenu>
    </Nav>
  );
};

export default Navbar;