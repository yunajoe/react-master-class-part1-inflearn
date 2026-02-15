import { KeyboardEvent, MouseEvent, useState } from "react";

const fruitsArray = ["사과", "바나나", "수박", "멜론", "키위"];

function Fruits() {
  const [fruitsList, setFruitsList] = useState<string[]>(fruitsArray);
  const [addItem, setAddItem] = useState("");
  const [clickedItem, setClickedItem] = useState("");
  const handleClick = (
    fruit: string,
    index: number,
    e: MouseEvent<HTMLLIElement>,
  ) => {
    const log = `클릭된 항목: ${fruit}
        인덱스: ${index}
        SyntheticEvent 객체: ${e}
    `;
    setClickedItem(fruit);
  };

  const handleAddItem = () => {
    // 버튼에는 e.target.value가 없낭
    setFruitsList((prev) => {
      return [...prev, addItem];
    });
    setAddItem("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    console.log("keydown");
    if (e.key === "Enter" && !e.nativeEvent.isComposing) {
      setFruitsList((prev) => {
        return [...prev, addItem];
      });
      setAddItem("");
    }
  };

  return (
    <>
      <div style={{ display: "flex", columnGap: "10px" }}>
        <input
          value={addItem}
          onKeyDown={handleKeyDown}
          onKeyUp={() => {
            console.log("keyup");
          }}
          onChange={(e) => {
            setAddItem(e.target.value);
          }}
        />
        <button onClick={handleAddItem} disabled={!addItem}>
          과일 추가하기
        </button>
      </div>

      <div>
        <h3>과일 리스트</h3>
        <ul>
          {fruitsList.map((fruit, index) => (
            <li
              key={index}
              style={{ background: fruit === clickedItem ? "blue" : "" }}
              onClick={(event) => handleClick(fruit, index, event)}
              data-fruit={fruit}
            >
              <p>아이템: {fruit}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Fruits;
