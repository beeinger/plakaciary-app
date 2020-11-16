import styled from "styled-components";

const Input = styled.input`
  width: 100%;
  height: 2em;
  border: 1px solid #bec0c3;
  background-color: rgba(255, 255, 255, 0);
  border-radius: 2px;
  margin-bottom: 3vh;
  padding: 1px 1px 1px 8px;
  transition: border 0.25s;

  &:focus {
    border: 1px solid black;
    outline: none;
  }

  @media screen and (max-width: 992px) {
    width: 95%;
  }

  @media screen and (max-width: 600px) {
    width: 90%;
  }
`;

export default Input;
