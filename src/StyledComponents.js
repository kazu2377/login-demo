import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px;
  background-color: #e0f7fa;
  min-height: 100vh;
`;

export const Title = styled.h1`
  color: #4caf50;
  margin-bottom: 40px;
`;

export const Input = styled.input`
  border: none;
  border-bottom: 2px solid #4caf50;
  margin-bottom: 20px;
  padding: 10px;
  width: 250px;
  outline: none;
`;

export const Button = styled.button`
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #45a049;
  }
`;

export const FooterText = styled.p`
  margin-top: 20px;
  color: #666;
  font-size: 12px;
`;
