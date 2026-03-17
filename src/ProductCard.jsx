export default function ProductCard({ name, price, emoji, className }) {
  return (
    <div className={`card ${className || ""}`}>
      <h2>
        {name} {emoji}
      </h2>
      <p>가격: {price.toLocaleString()}원</p>
      <button>구매하기</button>
    </div>
  );
}
