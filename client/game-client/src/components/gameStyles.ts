import styled, {keyframes} from 'styled-components';
import SpaceMission from '../../assets/fonts/PressStart2P.ttf';
import ScreenImage from '../../assets/menuArt.png';

const blinkingEffect = keyframes`
    50% {
      opacity: 0.2;
      font-size: 2.95em;
    }
`;

export const MenuArt = styled.div`
  background-image: url(${ScreenImage});
  background-size: 100% 100%;
  height: 100vh;
`;

export const PlayButton = styled.p`
  color: white;
  display: flex;
  justify-content:center;
  align-items:center;
  height: 95vh;
  width: 100vw;
  position: absolute;
  font-size: 3em;
  @font-face {
    font-family: 'SpaceMission';
    src: url("${SpaceMission}") format("opentype");
    }
  font-family: 'SpaceMission';
  animation: ${blinkingEffect} 1.5s infinite ease-in-out;
  @media (max-width: 1100px) {
    display: none;
  }
`;
