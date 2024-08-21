import React from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

const LandingPage = () => {
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
        <FooterLink href="https://policy.indrajala.in/Terms-of-Usage">Terms and Usage</FooterLink>
        <FooterLink href="https://policy.indrajala.in/Data-Policy">Data Policy</FooterLink>
        <FooterLink href="https://policy.indrajala.in/Refund-Policy">Refund Policy</FooterLink>
        <FooterLink href="https://policy.indrajala.in">Detailed Policy Page</FooterLink>
        <FooterText>© 2024, All rights reserved, Indrajala Movie Makers LLP</FooterText>
      </Footer>
    </Container>
  );
};

export default LandingPage;

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