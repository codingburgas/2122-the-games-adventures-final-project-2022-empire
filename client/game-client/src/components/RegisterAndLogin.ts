import styled from "styled-components";

export const Hr = styled.hr`
transform: rotate(0deg);
height: 0px;
width: 102px;
border: 5.69px solid #282e48;
`;

export const InputContainer = styled.div`
  flex-basis: 48%;
  padding: 30px 2px;
`;

export const Container = styled.div`
  padding-right: 50px;
  padding-left: 30px;
  display: inline-block;
  text-align: left;
  font-size: 22px;
`;

export const Label = styled.label`
  color: #000000;
`;

export const Emoji = styled.img`
  padding-left: 10px;
  padding-right: 10px;
  width: 18px;
  height: 18px;
`;

export const Button = styled.button`
  background-color: #282e48;
  color: #fff;
  padding: 16px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 100%;
  border-radius: 15px;
  font-size: 16pt;
`;

export const Input = styled.input`
  padding: 15px;
  margin: 5px 0 22px 0;
  width: 379px;
  display: inline-block;
  border-style: solid;
  border-color: #555555;
  border-radius: 9.74293px;
  background: #d7d7d7;

  &:focus {
    background-color: #d8c3c8;
    outline: none;
  }
`;

export const Form = styled.form`
  display: flex;
`;

export const FormClose = styled.div`
  background-color: rgba(255, 255, 255, 0.5);
  display: none;
  position: fixed;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  z-index: 8;
`;

export const FormPopup = styled.div`
  border-radius: 15px;
  background-color: #d7d7d7;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 9;
`;

export const HelperText = styled.p`
  color: #a74b61;
  font-size: 12px;
  padding: 0;
  text-align: left;
  margin-top: 5px;
  margin-bottom: 5px;
`;