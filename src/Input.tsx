import { ChangeEvent, useState } from "react";

function Input() {
  const [text, setText] = useState("");
  const [isSale, setIsSale] = useState(false);
  const [category, setCategory] = useState("all");

  const handleText = (e: ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
    setText(e.target.value);
  };
  const handleSale = (e: ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
    setIsSale(e.target.checked);
  };

  const handleSelect = (
    e: ChangeEvent<HTMLSelectElement, HTMLSelectElement>,
  ) => {
    setCategory(e.target.value);
  };

  const handleReset = () => {
    setText("");
    setIsSale(false);
    setCategory("all");
  };
  return (
    <div style={{ border: "5px solid blue" }}>
      <h3>입력·체크박스·셀렉트 동시 제어</h3>
      <input type="text" value={text} onChange={handleText} />
      <div>
        <label htmlFor="sale">세일여부</label>
        <input
          id="sale"
          type="checkbox"
          checked={isSale}
          onChange={handleSale}
        />
      </div>
      <select value={category} name="category" onChange={handleSelect}>
        <option value="all">All</option>
        <option value="electronics">electronics</option>
        <option value="foods">foods</option>
        <option value="furniture">furniture</option>
      </select>
      <div>
        <p>입력한 텍스트: {text}</p>
        <p>세일만 보기: {isSale ? "켜짐" : "꺼짐"}</p>
        <p>카테고리: {category}</p>
      </div>
      <button onClick={handleReset}>초기화 버튼</button>
    </div>
  );
}

export default Input;
