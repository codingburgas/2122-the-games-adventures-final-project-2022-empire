import styled from "styled-components";

export const Hr = styled.hr`
    border: 3.7354px solid;
    color: #A74B61;
    width: 67.24px;
    height: 1px;
    float: left;
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
  width: 16px;
  height: 16px;
  margin-right: 5px;
  margin-top: 2px;
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
