import styled from "styled-components";
import SF from '../../assets/fonts/sf.ttf';
import TGRegular from '../../assets/fonts/texgyreadventor-regular.otf';
import TGBold from '../../assets/fonts/texgyreadventor-bold.otf';

export const FirstGradient = styled.div`
  background: linear-gradient(180deg, #282E48 0%, #16192E 81.14%);
  width: 100%;
  height: 100vh;
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
export const  Group4 = styled.div`
  height: 51px;
  width: 191px;
`
export const  Rectangle30 = styled.div`
  border-radius: 9.375px;
  height: 51px;
  width: 191px;
  border: 1.875px solid #4b4e7e;
`
export const  Text7 = styled.div`
  text-align: center;
  vertical-align: top;
  margin-top: 1rem;
  font-size: 25.6px;
    @font-face {
    font-family: 'TG';
    src: url("${TGBold}") format("opentype");
  }
  font-family: 'TG';
  letter-spacing: 22%;
  line-height: auto;
  font-weight: bold;
  color: #ffffff;
`
export const Line2 = styled.div`
  margin-left: auto;
  margin-right: auto;
  height: 0px;
  width: 603px;
  border: 1px solid rgba(196, 196, 221, 0.20000000298023224);
`
export const  Text8 = styled.div`
  text-align: center;
  margin-top: 1rem;
  vertical-align: top;
  font-size: 25.6px;
    @font-face {
    font-family: 'TG';
    src: url("${TGBold}") format("opentype");
  }
  font-family: 'TG';
  letter-spacing: 22%;
  line-height: auto;
  font-weight: bold;
  color: #ffffff;
`
export const  Text9 = styled.div`
  text-align: left;
  vertical-align: top;
  letter-spacing: 0.05em;
  margin-top: -1em;
  font-size: 44.8px;
    @font-face {
    font-family: 'TG';
    src: url("${TGBold}") format("opentype");
  }
  font-family: 'TG';
  line-height: auto;
  font-weight: bold;
  color: #ffffff;
`
export const  Text10 = styled.div`
  text-align: left;
  vertical-align: top;
  font-size: 20.8px;
  font-family: @font-face {
    font-family: 'SF';
    src: url("${SF}") format("opentype");
  }
  font-family: 'SF';
  letter-spacing: 5%;
  line-height: auto;
  color: #ffffff;
`
export const  Text11 = styled.div`
  text-align: center;
  vertical-align: top;
  width: 300px;
  font-size: 20.8px;
  font-family: @font-face {
    font-family: 'SF';
    src: url("${SF}") format("opentype");
  }
  font-family: 'SF';;
  letter-spacing: 0.22em;
  line-height: auto;
  color: #ffffff;
`
export const Ellipse4 = styled.div`
  margin-top: 9em;
  height: 91px;
  width: 91px;
  background-color: #ffffff;
  border-radius: 50%;
  background-image: url(https://avatars.dicebear.com/api/adventurer-neutral/${Date.now()}.svg);
  background-size: cover;
`
export const  Text12 = styled.div`
  text-align: left;
  letter-spacing: 0.05em;
  vertical-align: top;
  font-size: 38.4px;
    @font-face {
    font-family: 'TG';
    src: url("${TGBold}") format("opentype");
  }
  font-family: 'TG';
  letter-spacing: 5%;
  line-height: auto;
  font-weight: bold;
  color: #ffffff;
`

export const Grid = styled.div`
  height: 432px;
  width: 1571px;
  margin-left: auto;
  margin-right: auto;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(5, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: 0px; 
`
export const Group16 = styled.div`
  border-radius: 12.5px;
  height: 277px;
  width: 647px; 
  margin-top: 60px;
  background-color: #3d425d;
  grid-area: 1 / 1 / 3 / 3;
`
export const  Group19 = styled.div`
  border-radius: 12.5px;
  height: 277px;
  width: 647px;
  margin-top: 170px;
  background-color: #3d425d;
  grid-area: 4 / 1 / 6 / 3;
`
export const Group18 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 12.5px;
  height: 643px;
  width: 854px;
  margin-top: 60px;
  margin-left: -220px;
  background-color: #3d425d;
  grid-area: 1 / 4 / 6 / 6;
`
export const Achievements = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 30px;
  gap: 20px;
`

export const Achievement = styled.img`
  filter: ${(props) => props.height};
`
export const Text20 = styled.div`
  text-align: center;
  letter-spacing: 0.05em;
  vertical-align: top;
  font-size: 28.4px;
    @font-face {
    font-family: 'TG';
    src: url("${TGBold}") format("opentype");
  }
  font-family: 'TG';
  letter-spacing: 5%;
  line-height: auto;
  font-weight: bold;
  color: #ffffff;
  margin-top: .6em;
`
export const Delete = styled.div`
  border-radius: 20px;
  height: 45px;
  width: 189px;
  background-color: #e22525;
  margin-left: auto;
  margin-right: auto;
  margin-top: 2em;
  cursor: pointer;
`
export const DeleteText = styled.div`
  font-family: @font-face {
    font-family: 'SF';
    src: url("${SF}") format("opentype");
  }
  font-family: 'SF';
  text-align: center;
  vertical-align: center;
  font-size: 28px;
  letter-spacing: 33%;
  line-height: auto;
  color: white;
`