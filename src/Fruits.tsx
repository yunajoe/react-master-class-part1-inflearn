import { MouseEvent } from "react";

const fruitsArray = ["사과", "바나나", "수박", "멜론", "키위"];

function Fruits() {
  const handleClick = (
    fruit: string,
    index: number,
    e: MouseEvent<HTMLLIElement>,
  ) => {
    const log = `클릭된 항목: ${fruit}
        인덱스: ${index}
        SyntheticEvent 객체: ${e}
    `;
    console.log(log);
  };

  return (
    <ul>
      {fruitsArray.map((fruit, index) => (
        <li
          key={index}
          onClick={(event) => handleClick(fruit, index, event)}
          data-fruit={fruit}
        >
          <p>아이템: {fruit}</p>
        </li>
      ))}
    </ul>
  );
}

export default Fruits;
