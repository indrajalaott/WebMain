// HomePageStyles.js
import styled from 'styled-components';

export const Container = styled.div`
  padding: 20px;
  background: linear-gradient(to bottom, #000000 50%, #ff69b4 100%);
  min-height: 100vh;
`;

export const Title = styled.h1`
  text-align: center;
  color: #ffffff;
  margin-bottom: 20px;
`;

export const MovieGridWrapper = styled.div`
  display: flex;
  justify-content: ${({ isMobile, isTablet }) => (isMobile ? 'flex-start' : isTablet ? 'space-around' : 'space-between')};
  align-items: ${({ isMobile }) => (isMobile ? 'center' : 'flex-start')};
  flex-direction: ${({ isMobile }) => (isMobile ? 'column' : 'row')};
  flex-wrap: ${({ isMobile }) => (isMobile ? 'nowrap' : 'wrap')};
  overflow-y: ${({ isMobile }) => (isMobile ? 'auto' : 'unset')};
  padding: ${({ isMobile }) => (isMobile ? '10px 5%' : '10px')};
  background: transparent;
  gap: 20px;
  width: ${({ isMobile }) => (isMobile ? '90%' : '100%')};
  max-width: 1200px;
  margin: 0 auto;
  height: ${({ isMobile }) => (isMobile ? 'calc(100vh - 100px)' : 'auto')};
  scroll-behavior: smooth;

  > div {
    flex: ${({ isMobile }) => (isMobile ? '0 0 auto' : '1')};
    max-width: ${({ isMobile, isTablet }) => (isMobile ? '100%' : isTablet ? '45%' : '30%')};
    width: ${({ isMobile }) => (isMobile ? '100%' : 'auto')};
    background: transparent;
    border: 1px solid #ff69b4;
    border-radius: 5px;
    color: #ffffff;
    padding: 10px;
    margin-bottom: ${({ isMobile }) => (isMobile ? '20px' : '0')};
    
    ${({ isMobile }) => isMobile && `
      display: flex;
      flex-direction: column;
      align-items: center;
      
      img {
        width: 100%;
        height: auto;
        object-fit: cover;
        border-radius: 5px;
      }
      
      h3 {
        margin-top: 10px;
        text-align: center;
        font-size: 1.2em;
      }
      
      p {
        display: none;
      }
    `}
  }

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 4px;
  }

  &::-webkit-scrollbar-track {
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 4px;
  }

  -ms-overflow-style: scrollbar;
  scrollbar-width: thin;
`;