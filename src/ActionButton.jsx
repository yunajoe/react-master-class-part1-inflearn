import styled from "styled-components";

const Button = styled.button`
  background: steelblue;
  color: white;
  &:hover {
    background: dodgerblue;
  }
  &:active {
    background: navy;
    transform: scale(2);
  }
`;

function ActionButton({ children, onClick }) {
  return <Button onClick={onClick}>{children}</Button>;
}

export default ActionButton;
