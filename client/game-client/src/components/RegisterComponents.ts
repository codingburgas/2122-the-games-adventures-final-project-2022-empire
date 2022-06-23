import styled from "styled-components";

export const Hr = styled.hr`
    border: 3.7354px solid;
    color: #A74B61;
    width: 67.24px;
    height: 1px;
    float: left;
`;

export const InputContainer = styled.div`
  flex-basis: 48%;
  padding: 30px 2px;
`;

export const Container = styled.div`
  padding-right: 50px;
  padding-left: 140px;
  display:inline-block;
  text-align: left;
  font-size: 22px;
`;

export const Label = styled.label`
  color:#000000;
`;

export const Emoji = styled.img`
  width: 18px;
  height: 18px;
`;

export const Button = styled.button`
  background-color: #A74B61;
  color: #fff;
  padding: 16px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 379px;
  border-radius: 15px;
  font-size: 16pt;
`;

export const Input = styled.input`
  padding: 15px;
  margin: 5px 0 22px 0;
  width: 379px;
  display: inline-block;
  border-style: solid;
  border-color:#555555;
  border-radius: 9.74293px;
  background: #D7D7D7;
  
  &:focus
  {
    background-color: #d8c3c8;
    outline: none;
  }
`;

export const Form = styled.form`
  display:flex;
`;
