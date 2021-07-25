import styled from "styled-components";

export const Container = styled.div`
  margin-top: 5rem;

  .noResult {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 100px;
    flex-direction: column;
    
    span {
      color: #666666;
      margin-top: 20px;
    }
  }

  .scrol {
    margin-top: 20px;
    max-height: 517px;
    overflow-y: auto;
    padding: 0 5px;

    ::-webkit-scrollbar {
      width: 5px;
    }

    ::-webkit-scrollbar-track {
      background: #e8edf3;
      border-radius: 5px;
    }

    ::-webkit-scrollbar-thumb {
      background: #a7bed6;
      border-radius: 5px;
    }
  }

  table {
    width: 60%;
    max-height: 120px;
    overflow-y: auto;
    border-radius: 4px;
    background: #D7E2ED;
    border: 1px solid #AEC0D2;
    box-sizing: border-box;
    border-spacing: 0 0; // distância na tabela

    th {
      background: #D7E2ED;
      font-size: 16px;
      font-weight: 600;
      color: #2A333E;
      padding: 1rem 2rem;
      text-align: left;
      line-height: 0.5rem;
      border: 1px solid #AEC0D2;
      box-sizing: border-box;
    }

    td {
      padding: 0.5rem 1.2rem;
      border: 0;
      background: #FFF;
      color: #2A333E;
      border: 1px solid #AEC0D2;
      box-sizing: border-box;
      /* border-radius: 3px; */
    }
  }
`;

export const Search = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  label {
    font-family: Source Sans Pro;
    font-style: normal;
    font-weight: 600;
    font-size: 22px;
    color: #2A333E;
  }

  input {
    width: 250px;
    height: 40px;
    padding: 8px 16px;
    margin-left: 10px;
    border: 1px solid #AEC0D2;
    box-sizing: border-box;
    border-radius: 4px;
  }
`;

export const Total = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 200px;
  height: 41px;
  font-weight: 600;
  font-size: 18px;
  color: #FFFFFF;
  background: #0054A6;
  border: 1px solid #D7E2ED;
  box-sizing: border-box;
  border-radius: 4px;
  margin-left: 75px;
`;