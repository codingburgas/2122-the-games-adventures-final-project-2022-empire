import styled, {keyframes} from 'styled-components';
import SF from '../../assets/fonts/sf.ttf';
import TGRegular from '../../assets/fonts/texgyreadventor-regular.otf';
import TGBold from '../../assets/fonts/texgyreadventor-bold.otf';
import FirstPic from '../../assets/pic1.png';
import SecondPic from '../../assets/pic2.png';
import ThirdPic from '../../assets/pic3.png';

export const FirstGradient = styled.div`
  background: linear-gradient(180deg, #282E48 0%, #16192E 81.14%);
  width: 100%;
  height: auto;
  padding-bottom: 16vh;
`;
export const SecondGradient = styled.div`
  background: radial-gradient(50% 50% at 50% 50%, #212A36 0%, #16192E 100%);
  width: 100%;
  height: auto;
  padding-bottom: 13vh;
`;
export const ThirdGradient = styled.div`
  background: #16192E;
  width: 100%;
  height: auto;
  padding-bottom: 15vh;
`;
export const  NavBar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  align-self: auto;
  gap: 9.4%;
  padding-top: 4rem;
  @media (max-width: 1450px) {
    zoom: 0.8;
    -moz-transform: scale(0.8);
  }
  @media (max-width: 1200px) {
    zoom: 0.6;
    -moz-transform: scale(0.6);
  }
  @media (max-width: 920px) {
    zoom: 0.4;
    -moz-transform: scale(0.4);
  }
  @media (max-width: 620px) {
    zoom: 0.3;
    -moz-transform: scale(0.3);
  }
  @media (max-width: 480px) {
    zoom: 0.2;
    -moz-transform: scale(0.2);
  }
`
export const  Text3 = styled.div`
  text-align: left;
  vertical-align: top;
  font-size: 29px;
  @font-face {
    font-family: 'SF';
    src: url("${SF}") format("opentype");
  }
  font-family: 'SF';
  letter-spacing: 0.33em;
  line-height: auto;
  color: #c7c7c7;
  &:hover {
    text-shadow: 0 0 1px #c7c7c7, 0 0 1px #c7c7c7, 0 0 2px #c7c7c7, 0 0 2px #c7c7c7, 0 0 5px #c7c7c7, 0 0 5px #c7c7c7, 0 0 70px #c7c7c7;
  }
  transition: 0.5s;
  cursor: pointer;
`
export const MainLogo = styled.img`
`
export const  Text4 = styled.div`
  text-align: left;
  vertical-align: top;
  font-size: 29px;
  @font-face {
    font-family: 'SF';
    src: url("${SF}") format("opentype");
  }
  font-family: SF;
  letter-spacing: 0.33em;
  line-height: auto;
  color: #c7c7c7;
  &:hover {
    text-shadow: 0 0 1px #c7c7c7, 0 0 1px #c7c7c7, 0 0 2px #c7c7c7, 0 0 2px #c7c7c7, 0 0 5px #c7c7c7, 0 0 5px #c7c7c7, 0 0 70px #c7c7c7;
  }
  transition: 0.5s;
  cursor: pointer;
`
export const  Text5 = styled.div`
  text-align: left;
  vertical-align: top;
  font-size: 29px;
  @font-face {
    font-family: 'SF';
    src: url("${SF}") format("opentype");
  }
  font-family: SF;
  letter-spacing: 0.33em;
  line-height: auto;
  color: #c7c7c7;
  &:hover {
    text-shadow: 0 0 1px #c7c7c7, 0 0 1px #c7c7c7, 0 0 2px #c7c7c7, 0 0 2px #c7c7c7, 0 0 5px #c7c7c7, 0 0 5px #c7c7c7, 0 0 70px #c7c7c7;
  }
  transition: 0.5s;
  cursor: pointer;
`
export const  Text6 = styled.div`
  text-align: center;
  vertical-align: center;
  font-size: 32px;
  @font-face {
    font-family: 'SF';
    src: url("${SF}") format("opentype");
  }
  font-family: SF;
  letter-spacing: 0.33em;
  line-height: auto;
  color: #c7c7c7;
`
export const HeroText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: left;
  height: 750px;
  width: 597px;
  margin-left: 155px;
  gap: 50px;
  @media (max-width: 1450px) {
    zoom: 0.8;
    -moz-transform: scale(0.8);
    -moz-transform-origin: top left;
  }
  @media (max-width: 1200px) {
    zoom: 0.6;
    -moz-transform: scale(0.6);
    -moz-transform-origin: top left;
  }
  @media (max-width: 920px) {
    zoom: 0.4;
    -moz-transform: scale(0.4);
    -moz-transform-origin: top left;
  }
  @media (max-width: 620px) {
    zoom: 0.3;
    -moz-transform: scale(0.3);
    -moz-transform-origin: top left;
  }
  @media (max-width: 480px) {
    zoom: 0.2;
    -moz-transform: scale(0.2);
    -moz-transform-origin: top left;
  }
`
export const  Group4 = styled.div`
  height: 82px;
  width: 306px;
`

export const  Group42 = styled.div`
  height: 40px;
  width: 306px;
`

export const Rectangle30 = styled.div`
  display: flex;
  border-radius: 15px;
  height: 82px;
  width: 306px;
  border: 3px solid #4b4e7e;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover {
    text-shadow: 0 0 1px #c7c7c7, 0 0 1px #c7c7c7, 0 0 2px #c7c7c7, 0 0 2px #c7c7c7, 0 0 5px #c7c7c7, 0 0 5px #c7c7c7, 0 0 70px #c7c7c7;
  }
  transition: 0.5s;
`
export const  Text7 = styled.div`
  text-align: left;
  vertical-align: top;
  font-size: 32px;
  @font-face {
    font-family: 'SF';
    src: url("${SF}") format("opentype");
  }
  font-family: SF;
  letter-spacing: 0.33em;
  line-height: auto;
  color: #c7c7c7;
`
export const  Text8 = styled.div`
  text-align: left;
  vertical-align: top;
  font-size: 96px;
  @font-face {
    font-family: 'TG';
    src: url("${TGBold}") format("opentype");
  }
  font-family: 'TG';
  letter-spacing: 0.235em;
  line-height: auto;
  color: #ffffff;
  font-weight: bold;
  @media (max-width: 1450px) {
    font-size: 86px;
  }
`
export const  Text9 = styled.div`
  text-align: left;
  vertical-align: top;
  font-size: 32px;
  @font-face {
    font-family: 'SF';
    src: url("${SF}") format("opentype");
  }
  font-family: SF;
  letter-spacing: 0.235em;
  line-height: auto;
  margin-bottom: 20px;
  color: #c7c7c7;
`
export const  InfoGradient = styled.div`
  border-radius: 20px;
  height: 177px;
  width: 797px;
  background-color: ;
`
export const  Text10 = styled.div`
  text-align: left;
  vertical-align: top;
  font-size: 51px;
  @font-face {
    font-family: 'TG';
    src: url("${TGBold}") format("opentype");
  }
  font-family: 'TG';
  letter-spacing: 0.235em;
  line-height: auto;
  color: #ffffff;
  width: 500px;
  font-weight: bold;
`
export const  Frame9 = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  gap: 54px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 4.2em;
  @media (max-width: 1450px) {
    zoom: 0.8;
    -moz-transform: scale(0.8);
    -moz-transform-origin: top left;
  }
  @media (max-width: 1200px) {
    zoom: 0.6;
    -moz-transform: scale(0.6);
    -moz-transform-origin: top left;
  }
  @media (max-width: 920px) {
    zoom: 0.4;
    -moz-transform: scale(0.4);
    -moz-transform-origin: top left;
  }
  @media (max-width: 620px) {
    zoom: 0.3;
    -moz-transform: scale(0.3);
    -moz-transform-origin: top left;
  }
  @media (max-width: 480px) {
    zoom: 0.2;
    -moz-transform: scale(0.2);
    -moz-transform-origin: top left;
  }
`
export const  Group6 = styled.div`
  height: 157px;
  width: 287px;
  margin-left: 8%;
`
export const  Text11 = styled.div`
  text-align: left;
  vertical-align: top;
  font-size: 64px;
  @font-face {
    font-family: 'TG';
    src: url("${TGBold}") format("opentype");
  }
  font-family: 'TG';
  letter-spacing: 0.235em;
  line-height: auto;
  color: #ffffff;
`
export const  Text12 = styled.div`
  text-align: left;
  vertical-align: top;
  font-size: 24px;
  @font-face {
    font-family: 'SF';
    src: url("${SF}") format("opentype");
  }
  font-family: SF;
  letter-spacing: 0.235em;
  line-height: auto;
  color: #c7c7c7;
`
export const  Group7 = styled.div`
  height: 157px;
  width: 289px;
`
export const  Text13 = styled.div`
  text-align: left;
  vertical-align: top;
  font-size: 24px;
  @font-face {
    font-family: 'SF';
    src: url("${SF}") format("opentype");
  }
  font-family: SF;
  letter-spacing: 0.235em;
  line-height: auto;
  color: #c7c7c7;
`
export const  Text14 = styled.div`
  text-align: left;
  vertical-align: top;
  font-size: 64px;
  @font-face {
    font-family: 'TG';
    src: url("${TGBold}") format("opentype");
  }
  font-family: 'TG';
  letter-spacing: 0.235em;
  line-height: auto;
  color: #ffffff;
`
export const  Group8 = styled.div`
  height: 157px;
  width: 287px;
`
export const  Text15 = styled.div`
  text-align: left;
  vertical-align: top;
  font-size: 24px;
  @font-face {
    font-family: 'SF';
    src: url("${SF}") format("opentype");
  }
  font-family: SF;
  letter-spacing: 0.235em;
  line-height: auto;
  color: #c7c7c7;
`
export const  Text16 = styled.div`
  text-align: left;
  vertical-align: top;
  font-size: 64px;
  @font-face {
    font-family: 'TG';
    src: url("${TGBold}") format("opentype");
  }
  font-family: 'TG';
  letter-spacing: 0.235em;
  line-height: auto;
  color: #ffffff;
`
export const  Rectangle32 = styled.div`
  border-radius: 20px;
  height: 546px;
  width: 1471px;
  background: linear-gradient(245.36deg, #1E2235 1.16%, #494D5D 92.35%, #4D5261 101.81%);
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
  margin-top: 13em;
  @media (max-width: 1450px) {
    zoom: 0.8;
    -moz-transform: scale(0.8);
    -moz-transform-origin: top left;
  }
  @media (max-width: 1200px) {
    zoom: 0.6;
    -moz-transform: scale(0.6);
    -moz-transform-origin: top left;
  }
  @media (max-width: 920px) {
    zoom: 0.4;
    -moz-transform: scale(0.4);
    -moz-transform-origin: top left;
  }
  @media (max-width: 620px) {
    zoom: 0.3;
    -moz-transform: scale(0.3);
    -moz-transform-origin: top left;
  }
  @media (max-width: 480px) {
    zoom: 0.2;
    -moz-transform: scale(0.2);
    -moz-transform-origin: top left;
  }
`
export const  DebugSymbol1 = styled.div`
  height: 421px;
  width: 1297px;
`
export const  Text17 = styled.div`
  text-align: center;
  vertical-align: top;
  font-size: 52px;
  @font-face {
    font-family: 'TG';
    src: url("${TGBold}") format("opentype");
  }
  font-family: 'TG';
  letter-spacing: 0.235em;
  line-height: auto;
  color: #ffffff;
  margin-top: -.5em;
`
export const  Frame10 = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 127px;
`
export const  Group10 = styled.div`
  height: 243px;
  width: 229px;
  margin-top: 6em;
  display: flex;
  flex-direction: column;
  gap: 1em;
`
export const  Text18 = styled.div`
  text-align: left;
  vertical-align: top;
  font-size: 20px;
  @font-face {
    font-family: 'SF';
    src: url("${SF}") format("opentype");
  }
  font-family: SF;
  letter-spacing: 0.235em;
  line-height: auto;
  color: #c7c7c7;
`
export const  Text19 = styled.div`
  text-align: left;
  vertical-align: top;
  font-size: 24px;
  @font-face {
    font-family: 'TG';
    src: url("${TGBold}") format("opentype");
  }
  font-family: 'TG';
  letter-spacing: 0.235em;
  line-height: auto;
  color: #ffffff;
`
export const  Group13 = styled.div`
  height: 243px;
  width: 229px;
  margin-top: 6em;
  display: flex;
  flex-direction: column;
  gap: 1em;
`
export const  Text20 = styled.div`
  text-align: left;
  vertical-align: top;
  font-size: 20px;
  @font-face {
    font-family: 'SF';
    src: url("${SF}") format("opentype");
  }
  font-family: SF;
  letter-spacing: 0.235em;
  line-height: auto;
  color: #c7c7c7;
`
export const  Text21 = styled.div`
  text-align: left;
  vertical-align: top;
  font-size: 24px;
  @font-face {
    font-family: 'TG';
    src: url("${TGBold}") format("opentype");
  }
  font-family: 'TG';
  letter-spacing: 0.235em;
  line-height: auto;
  color: #ffffff;
`
export const  Group11 = styled.div`
  height: 243px;
  width: 229px;
  margin-top: 6em;
  display: flex;
  flex-direction: column;
  gap: 1em;
`
export const  Text22 = styled.div`
  text-align: left;
  vertical-align: top;
  font-size: 20px;
  @font-face {
    font-family: 'SF';
    src: url("${SF}") format("opentype");
  }
  font-family: SF;
  letter-spacing: 0.235em;
  line-height: auto;
  color: #c7c7c7;
`
export const  Text23 = styled.div`
  text-align: left;
  vertical-align: top;
  font-size: 24px;
  @font-face {
    font-family: 'TG';
    src: url("${TGBold}") format("opentype");
  }
  font-family: 'TG';
  letter-spacing: 0.235em;
  line-height: auto;
  color: #ffffff;
`
export const  Group12 = styled.div`
  height: 243px;
  width: 229px;
  margin-top: 6em;
  display: flex;
  flex-direction: column;
  gap: 1em;
`
export const  Text24 = styled.div`
  text-align: left;
  vertical-align: top;
  font-size: 20px;
  @font-face {
    font-family: 'SF';
    src: url("${SF}") format("opentype");
  }
  font-family: SF;
  letter-spacing: 0.235em;
  line-height: auto;
  color: #c7c7c7;
`
export const  Text25 = styled.div`
  text-align: left;
  vertical-align: top;
  font-size: 24px;
  @font-face {
    font-family: 'TG';
    src: url("${TGBold}") format("opentype");
  }
  font-family: 'TG';
  letter-spacing: 0.235em;
  line-height: auto;
  color: #ffffff;
`
export const  Text26 = styled.div`
  text-align: center;
  vertical-align: top;
  font-size: 52px;
  @font-face {
    font-family: 'TG';
    src: url("${TGBold}") format("opentype");
  }
  font-family: 'TG';
  letter-spacing: 0.235em;
  line-height: auto;
  color: #ffffff;
  margin-bottom: 2em;
`
export const  Group14 = styled.div`
  height: 652px;
  width: 1471px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(5, 1fr);
  grid-column-gap: 7em;
  grid-row-gap: 0px; 
  margin-left: auto;
  margin-right: auto;
  @media (max-width: 1750px) {
    zoom: 0.8;
    -moz-transform: scale(0.8);
    -moz-transform-origin: top left;
  }
  @media (max-width: 1500px) {
    zoom: 0.6;
    -moz-transform: scale(0.6);
    -moz-transform-origin: top left;
  }
  @media (max-width: 1220px) {
    zoom: 0.4;
    -moz-transform: scale(0.4);
    -moz-transform-origin: top left;
  }
  @media (max-width: 920px) {
    zoom: 0.3;
    -moz-transform: scale(0.3);
    -moz-transform-origin: top left;
  }
  @media (max-width: 780px) {
    zoom: 0.2;
    -moz-transform: scale(0.2);
    -moz-transform-origin: top left;
  }
`
export const  Rectangle34 = styled.div`
  border-radius: 20px;
  height: 700px;
  width: 875px;
  background-image: url("${FirstPic}");
  background-size: cover;
  grid-area: 1 / 1 / 6 / 3;
`
export const  Rectangle35 = styled.div`
  border-radius: 20px;
  height: 293px;
  width: 511px;
  background-image: url("${SecondPic}");
  background-size: cover;
  grid-area: 1 / 4 / 3 / 6;
`
export const  Rectangle36 = styled.div`
  border-radius: 20px;
  height: 293px;
  width: 511px;
  background-image: url("${ThirdPic}");
  background-size: cover;
  grid-area: 4 / 4 / 6 / 6;
`
export const  Footer = styled.div`
  height: 302px;
  width: 1920px;
`
export const  Rectangle3 = styled.div`
  height: 302px;
  width: 1920px;
  background-color: #2c3041;
`
export const  Group2 = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 75px;
`
export const  Text27 = styled.div`
  text-align: left;
  vertical-align: top;
  font-size: 20px;
  font-family: SF Pro;
  letter-spacing: 21.5%;
  line-height: auto;
  color: #eeeeee;
`
export const  Text28 = styled.div`
  text-align: left;
  vertical-align: top;
  font-size: 20px;
  font-family: SF Pro;
  letter-spacing: 21.5%;
  line-height: auto;
  color: #eeeeee;
`
export const  Text29 = styled.div`
  text-align: left;
  vertical-align: top;
  font-size: 20px;
  font-family: SF Pro;
  letter-spacing: 21.5%;
  line-height: auto;
  color: #eeeeee;
`
export const  Rectangle4 = styled.div`
  height: 57px;
  width: 441px;
  background-color: #ffffff;
`
export const  Text30 = styled.div`
  text-align: center;
  vertical-align: top;
  font-size: 20px;
  font-family: Poppins;
  letter-spacing: 9%;
  line-height: auto;
  color: rgba(0, 0, 0, 0.25999999046325684);
`
export const  Rectangle5 = styled.div`
  height: 57px;
  width: 178px;
  background-color: #4b4e7e;
`
export const  Text31 = styled.div`
  text-align: center;
  vertical-align: top;
  font-size: 20px;
  font-family: Poppins;
  letter-spacing: 18%;
  line-height: auto;
  color: #ffffff;
`
export const  Text32 = styled.div`
  text-align: center;
  vertical-align: top;
  font-size: 20px;
  font-family: SF Pro;
  letter-spacing: 18%;
  line-height: auto;
  color: #eeeeee;
`
export const  Line1 = styled.div`
  height: 0px;
  width: 1649px;
  border: 1px solid rgba(255, 255, 255, 0.20000000298023224);
`
export const  Text33 = styled.div`
  text-align: right;
  vertical-align: top;
  font-size: 12px;
  font-family: Poppins;
  letter-spacing: 30.5%;
  line-height: auto;
  color: rgba(255, 255, 255, 0.5);
`
export const  Text34 = styled.div`
  text-align: left;
  vertical-align: top;
  font-size: 39.253204345703125px;
  @font-face {
    font-family: 'TG';
    src: url("${TGBold}") format("opentype");
  }
  font-family: 'TG';
  letter-spacing: 45.5%;
  line-height: auto;
  color: #d9d9d9;
`
export const  Text35 = styled.div`
  text-align: left;
  vertical-align: top;
  font-size: 39.253204345703125px;
  @font-face {
    font-family: 'TG';
    src: url("${TGBold}") format("opentype");
  }
  font-family: 'TG';
  letter-spacing: 45.5%;
  line-height: auto;
  color: #d9d9d9;
`
export const  Rectangle28 = styled.div`
  height: 9px;
  width: 113px;
  background-color: #d9d9d9;
  border: 1px solid #eeeeee;
`
export const  Rectangle29 = styled.div`
  height: 9px;
  width: 89px;
  background-color: #d9d9d9;
  border: 1px solid #eeeeee;
`
export const  Switch = styled.div`
  height: 28px;
  width: 49px;
`
export const  Rectangle2 = styled.div`
  border-radius: 50px;
  height: 16px;
  width: 15px;
  background-color: #9aa2a9;
`
export const Rectangle33 = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  height: 83px;
  width: 83px;
  background-color: #ffffff;
`