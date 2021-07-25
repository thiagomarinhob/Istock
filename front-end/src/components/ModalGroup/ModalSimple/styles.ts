import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  img {
    width: 66px;
    height: 66px;
  }

  h2 {
    color: #2a333e;
    font-size: 26px;
    font-weight: 600;
    margin-top: 8px;
  }

  p {
    color: #404f61;
    margin: 0;
    margin-top: 8px;
  }
`;

export const Button = styled.button`
  text-align: center;
  margin-top: 25px;
  width: 125px;
  height: 40px;
  background: #0054A6;
  color: #FFF;
  border: 1px solid #007DC5;
  box-sizing: border-box;
  border-radius: 4px;
`;