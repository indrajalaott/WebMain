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
  margin-bottom: ${({ isMobile }) => (isMobile ? '10px' : '20px')};
`;

export const MovieGridWrapper = styled.div`
  display: flex;
  justify-content: ${({ isMobile, isTablet }) => (isMobile ? 'center' : isTablet ? 'space-around' : 'space-between')};
  align-items: ${({ isMobile }) => (isMobile ? 'center' : 'flex-start')};
  flex-direction: ${({ isMobile }) => (isMobile ? 'column' : 'row')};
  flex-wrap: ${({ isMobile }) => (isMobile ? 'nowrap' : 'wrap')};
  overflow-y: ${({ isMobile }) => (isMobile ? 'auto' : 'unset')};
  padding: ${({ isMobile }) => (isMobile ? '5px' : '10px')};
  background: transparent;
  gap: ${({ isMobile }) => (isMobile ? '10px' : '20px')};
  width: ${({ isMobile }) => (isMobile ? '90%' : '100%')};
  margin: ${({ isMobile }) => (isMobile ? '0 auto' : '0')};
  height: ${({ isMobile }) => (isMobile ? 'calc(100vh - 80px)' : 'auto')};
  scroll-behavior: smooth;

  > div {
    flex: ${({ isMobile, isTablet }) => (isMobile ? '0 0 auto' : isTablet ? '0 0 45%' : '0 0 calc(33.333% - 20px)')};
    max-width: ${({ isMobile, isTablet }) => (isMobile ? '90%' : isTablet ? '45%' : 'calc(33.333% - 20px)')};
    width: ${({ isMobile }) => (isMobile ? '90%' : 'auto')};
    background: transparent;
    border: 1px solid #ff69b4;
    border-radius: 5px;
    color: #ffffff;
    padding: 10px;
    margin-bottom: ${({ isMobile }) => (isMobile ? '15px' : '20px')};
    
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
        margin-top: 8px;
        text-align: center;
        font-size: 1.1em;
      }
      
      p {
        display: none;
      }
    `}

    ${({ isMobile, isTablet }) => !isMobile && !isTablet && `
      display: flex;
      flex-direction: column;
      
      img {
        width: 100%;
        height: auto;
        object-fit: cover;
        border-radius: 5px;
      }
      
      h3 {
        margin-top: 10px;
        font-size: 1.2em;
      }
      
      p {
        margin-top: 5px;
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