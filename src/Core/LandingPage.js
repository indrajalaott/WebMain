import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

const LandingPage = () => {
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    // Extract the JWT and expiry date from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('jwt');
    const expiryDate = urlParams.get('exp');

    if (token && expiryDate) {
      // Save the token and expiry date to localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('expiryDate', expiryDate);

      // Redirect to /Home if token and expiry date are present
      navigate('/Home');
    } else {
      // Check if token is already stored in localStorage
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        navigate('/Home');
      }
    }
  }, [navigate]);

  return (
    <Container>
      <NavBar>
        <NavLinks>
          <NavButton to="/login">Login</NavButton>
          <NavButton to="/register">Register</NavButton>
        </NavLinks>
      </NavBar>
      <Content>
        <Title>Indrajala</Title>
        <Subtitle>The OTT Platform For Your Fantasies</Subtitle>
        <GetStartedButton to="/register">Get Started</GetStartedButton>
      </Content>
      <Footer>
        <FooterLink href="https://policy.indrajala.in/Terms-of-Usage" target="_blank" rel="noopener noreferrer">Terms and Usage</FooterLink>
        <FooterLink href="https://policy.indrajala.in/Data-Policy" target="_blank" rel="noopener noreferrer">Data Policy</FooterLink>
        <FooterLink href="https://policy.indrajala.in/Refund-Policy" target="_blank" rel="noopener noreferrer">Refund Policy</FooterLink>
        <FooterLink href="https://policy.indrajala.in" target="_blank" rel="noopener noreferrer">Detailed Policy Page</FooterLink>
        <FooterText>© 2024, All rights reserved, Indrajala Movie Makers LLP</FooterText>
      </Footer>
    </Container>
  );
};

export default LandingPage;

// Styles remain the same
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  min-height: 100vh;
  background: linear-gradient(to bottom, #000000, #282828);
  color: #fff;
  animation: ${fadeIn} 1s ease-in-out;
`;

const NavBar = styled.nav`
  width: 100%;
  padding: 1rem 2rem;
  display: flex;
  justify-content: flex-end;
  background: #000;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-right: 2rem; /* Add margin to move buttons away from the right border */
`;

const NavButton = styled(Link)`
  padding: 0.5rem 1rem;
  background: #ff69b4;
  color: #000;
  font-weight: bold;
  text-decoration: none;
  border-radius: 5px;
  transition: background 0.3s;

  &:hover {
    background: #ff1493;
  }
`;

const Content = styled.div`
  text-align: center;
  margin-top: 5rem;
`;

const Title = styled.h1`
  font-size: 4rem;
  color: #ff69b4;
`;

const Subtitle = styled.h2`
  font-size: 2rem;
  margin: 1rem 0;
`;

const GetStartedButton = styled(Link)`
  display: inline-block;
  margin-top: 2rem;
  padding: 1rem 2rem;
  background: #ff69b4;
  color: #000;
  font-size: 1.5rem;
  font-weight: bold;
  text-decoration: none;
  border-radius: 5px;
  transition: background 0.3s;

  &:hover {
    background: #ff1493;
  }
`;

const Footer = styled.footer`
  width: 100%;
  padding: 2rem;
  background: #000;
  text-align: center;
`;

const FooterLink = styled.a`
  color: #ff69b4;
  text-decoration: none;
  margin: 0 1rem;

  &:hover {
    text-decoration: underline;
  }
`;

const FooterText = styled.p`
  margin-top: 1rem;
  color: #fff;
`;
