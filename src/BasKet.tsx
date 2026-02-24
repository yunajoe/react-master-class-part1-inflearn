import { useState } from "react";

const initialData = [
  {
    id: 1,
    name: "노트북",
    price: 1200000,
    category: "electronics",
    gift: false,
  },
  {
    id: 2,
    name: "키보드",
    price: 50000,
    category: "electronics",
    gift: false,
  },
  { id: 3, name: "에코백", price: 19000, category: "fashion", gift: false },
];
function BasKet() {
  const [basketData, setBasketData] = useState(initialData);

  /**
   * 2만원 미만 무료증정 태그 달기 버튼을 누르면 price < 20000인
   * 항목들에 gift: true 필드를 추가(없으면 생성)합니다.
   *
   */
  const handleTenPercentDiscount = () => {
    setBasketData((prev) => {
      return prev.map((item) => ({
        ...item,
        price: item.price - item.price * 0.1,
      }));
    });
  };
  const handleElectronics = () => {
    setBasketData((prev) => {
      return prev.map((item) =>
        item.category === "electronics"
          ? { ...item, price: Math.floor(item.price * 0.95) }
          : item,
      );
    });
  };

  const handleGift = () => {
    setBasketData((prev) => {
      return prev.map((item) =>
        item.price < 20000 ? { ...item, gift: true } : item,
      );
    });
  };
  const handleReset = () => {
    setBasketData(initialData);
  };
  return (
    <div>
      {basketData.map((item) => (
        <p key={item.id}>
          {item.name} - {item.price} ({item.category}) {item.gift && "🎁"}
        </p>
      ))}
      <div style={{ display: "flex", flexDirection: "column", rowGap: "10px" }}>
        <button onClick={handleTenPercentDiscount}>전체 10% 할인 적용</button>
        <button onClick={handleElectronics}>전자제품만 +5% 추가할인</button>
        <button onClick={handleGift}>2만원 미만 무료증정 태그 달기</button>
        <button onClick={handleReset}>리셋</button>
      </div>
    </div>
  );
}

export default BasKet;
