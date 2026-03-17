import "./App.css";
import Head from "./Head.jsx";
import ProductCard from "./ProductCard.jsx";
function App() {
  return (
    <div>
      <h1>상품 목록</h1>
      <ProductCard name="사과" price={2000} emoji="🍎" />
      <ProductCard name="바나나" price={3000} emoji="🍌" className="banana" />
      <Head />
    </div>
  );
}

export default App;
