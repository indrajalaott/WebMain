import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: Arial, sans-serif;
    background-color: #000000;
    color: #ffffff;
  }
`;

export const Container = styled.div`
  min-height: 100vh;
  padding: 20px;
  background: linear-gradient(to bottom, #000000 50%, #ff69b4 100%);
`;

export const Title = styled.h1`
  text-align: center;
  color: #ffffff;
  margin-bottom: 30px;
  font-size: ${({ isMobile }) => (isMobile ? '1.5em' : '2em')};
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

export const MovieGridWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;

export const MovieGridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const MovieItem = styled.div`
  background-color: rgba(255, 105, 180, 0.1);
  border: 1px solid #ff69b4;
  border-radius: 10px;
  overflow: hidden;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 5px 15px rgba(255, 105, 180, 0.4);
  }
`;

export const MovieImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
`;

export const MovieInfo = styled.div`
  padding: 15px;
  color: white;  // Changed to white
`;

export const MovieTitle = styled.h3`
  font-size: 1.2em;
  margin-bottom: 10px;
  color: white;  // Changed to white
`;

export const MovieRating = styled.span`
  font-size: 1em;
  color: #ffff00;
  margin-left: 10px;
`;

export const MovieCategory = styled.p`
  font-size: 0.9em;
  color: white;  // Changed to white
  margin-bottom: 5px;
`;

export const LoadingMessage = styled.div`
  text-align: center;
  font-size: 1.2em;
  color: #ff69b4;
  margin-top: 50px;
`;

export const ErrorMessage = styled.div`
  text-align: center;
  font-size: 1.2em;
  color: #ff4444;
  margin-top: 50px;
`;
// In HomePageStyles.js
export const MovieDescription = styled.p`
  font-size: 14px;
  color: white;  // Changed to white
  margin: 8px 0;
  line-height: 1.4;
`;