import { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import ActionButton from "./ActionButton.jsx";
import "./App.css";
import Head from "./Head.jsx";
import ProductCard from "./ProductCard.jsx";
import ToggleDemo from "./ToggleDemo.jsx";
import VariantButton from "./VariantButton.jsx";

const light = { bg: "#fff", fg: "#111" };
const dark = { bg: "#111", fg: "#fff" };

const Page = styled.div`
  background: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.fg};
`;

function App() {
  const [darkMode, setDarkMode] = useState(false);
  return (
    <ThemeProvider theme={darkMode ? dark : light}>
      <Page theme={darkMode}>
        <h1>상품 목록</h1>
      </Page>
      <ActionButton onClick={() => setDarkMode((prev) => !prev)}>
        다크모드 버튼
      </ActionButton>

      <ProductCard name="사과" price={2000} emoji="🍎" />
      <ProductCard name="바나나" price={3000} emoji="🍌" className="banana" />
      <Head />
      <VariantButton variant="primary">버튼1</VariantButton>
      <VariantButton variant="danger">버튼2</VariantButton>
      <VariantButton size="lg">버튼3</VariantButton>
      <ToggleDemo />
    </ThemeProvider>
  );
}

export default App;
