import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  color: #2A333E;

  .card {
    background-color:rgba(255, 255, 255, 0.719);
    padding: 30px;
    border-radius: 10px;
    box-shadow: 3px 3px 1px 0px rgba(0, 0, 0, 0.6);
    margin-top: 100px;
  }

  .card h1{
      text-align: center;
      margin-bottom: 20px;
  }

  .label-float input{
      width: 400px;
      padding: 5px 5px;
      display: inline-block;
      border: 0;
      background-color: transparent;
      border-bottom: solid 1.5px;
      outline: none;
      font-size: 16px;
  }


  .card .label-float{
      position: relative;
      padding-top: 13px;
      margin-top: 5%;
      margin-bottom: 5%;

  }

  .label-float label{
      pointer-events: none;
      position: absolute;
      top:0;
      left: 0;
      margin-top: 13px;
      transition: all 0.2s ease-out;
  }

  .label-float input:focus + label,
  .label-float input:valid + label{
      font-size: 13px;
      margin-top: 0;
  }

  .justify-center {
      
    button {
      width: 100%;
      background-color: transparent;
      box-sizing: border-box;
      border-radius: 4px;
      padding-top: 10px;
      padding-bottom: 10px;
      font-weight: bold;
      font-size: 12pt;
      margin-top: 10px;
      border-radius: 4px;
      cursor: pointer;
      outline: none;
      transition: all .3s ease-out;
    }
    .btn {
      background: #0054A6;
      border: 1px solid #0054A6;
      color: #fff;
    }

    .btnBack {
      border: 1px solid #0054A6;
      box-sizing: border-box;
      color: #0054A6;
    }
  }

  .justify-center{
    display: block;
    justify-content: center;
  }
`;