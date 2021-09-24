import styled from "styled-components";

const Input = styled.input`
  width: 100%;
  height: 2em;
  border: 1px solid #bec0c3;
  background-color: rgba(255, 255, 255, 0);
  border-radius: 2px;
  padding: 1px 8px;

  transition: border 0.25s;
  box-sizing: border-box;

  &:focus {
    border: 1px solid ${({ theme }) => theme.text};
    outline: none;
  }

  ::placeholder {
    color: ${({ theme }) => theme.secondary};
  }
`;

export default Input;
