import { Box, CircularProgress, Typography } from '@mui/material';
import styled, { keyframes } from 'styled-components';

function LoadingScreen() {
  return (
    <LoadingContainer>
      <StyledCircularProgress size={80} thickness={4} />
      <LoadingText variant="h5">
        Carregando dados do usuário...
      </LoadingText>
    </LoadingContainer>
  );
}

const pulseAnimation = keyframes`
  0% {
    transform: scale(1);
    opacity: 0.7;
  }
  50% {
    transform: scale(1.05);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 0.7;
  }
`;

const LoadingContainer = styled(Box)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 32px;
  background: #1ADB72;
  overflow: hidden;
`;

const LoadingText = styled(Typography)`
  color: white;
  font-weight: 300;
  animation: ${pulseAnimation} 2s ease-in-out infinite;
`;

const StyledCircularProgress = styled(CircularProgress)`
  && {
    color: white;
  }
`;

export default LoadingScreen;