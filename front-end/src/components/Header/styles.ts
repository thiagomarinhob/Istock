import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: fixed;
  width: 100%;
  height: 60px;
  background: #0054A6;
`;

export const Logo = styled.div`
  display: flex;
  justify-content: center;
  font-size: 50px;
  color: #FFF;
  font-weight: bold;
  cursor: pointer;
`;

export const Menu = styled.button`
  width: 41px;
  height: 38px;
  align-items: center;
  margin-left: 375px;
  background: #0054A6;
  border: 1px solid #007DC5;
  box-sizing: border-box;
  border-radius: 4px;
`;

export const ContainerDropdown = styled.div`
  width: 220px;
  position: absolute;
  margin-top: 10px;
  margin-left: 156px;
  transform: translateX(-72%);
  padding: 20px;
  border-radius: 4px;
  box-sizing: border-box;
  background: #FFF;
  border: 1px solid #eee;
  z-index: 11;

  p {
    font-size: 14px;
    margin-bottom: 0;

    & + p {
      margin-top: 16px;
    }

  &:hover {
    text-decoration: none;
    color: #0054A6;
    font-weight: 600;
  }
  }
`;