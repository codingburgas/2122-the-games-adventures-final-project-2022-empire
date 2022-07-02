import styled, {keyframes} from 'styled-components';
import SpaceMission from '../../assets/fonts/PressStart2P.ttf';
import ScreenImage from '../../assets/menuArt.png';
import monitorImg from "../../assets/monitor.png";

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

export const Monitor = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(${monitorImg});
  background-repeat: no-repeat;
  height: 100vh;
  width: 100vw;
  background-attachment: fixed;
`

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

export const InventorySlot = styled.img`
  position: absolute;
  z-index: 9;
  width: 55px;
  padding-top: 52.6em;
  margin-left: -34.7em;
`;

export const InventoryBackground = styled.img`
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  padding-top: 52.6em;
  width: 40em;
`
