// props에 따라 변형되는 버튼
import styled from "styled-components";
const Button = styled.button`
  background: ${({ variant }) =>
    variant === "primary"
      ? "royalblue"
      : variant === "danger"
        ? "crimson"
        : "gray"};

  color: white;
  border: none;
  border-radius: 8px;
  padding: ${({ size }) => (size === "lg" ? "14px 18px" : "10px 14px")};
`;

function VariantButton({ variant, size, children }) {
  return (
    <Button variant={variant} size={size}>
      {children}
    </Button>
  );
}

export default VariantButton;
