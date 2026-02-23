import { ChangeEvent, useState } from "react";

const InitTotoData = [
  { id: 1, todo: "공부하기", checked: false },
  { id: 2, todo: "운동하기", checked: false },
];

function Todo() {
  const [todoList, setTodoList] = useState(InitTotoData);
  const [newTodo, setNewTodo] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setNewTodo(value);
  };
  const handleAddTodo = () => {
    if (!newTodo) return;
    setTodoList((prev) => [
      ...prev,
      { id: todoList.length, todo: newTodo, checked: false },
    ]);
    setNewTodo("");
  };

  const handleDelete = () => {
    // checked: true 인것을 삭제하기
    const remainTodoList = todoList.filter((item) => !item.checked);
    setTodoList(remainTodoList);
  };

  return (
    <div>
      <div style={{ display: "flex", flexDirection: "column", rowGap: "10px" }}>
        <div style={{ display: "flex", columnGap: "6px" }}>
          <input value={newTodo} onChange={handleChange} />
          <button onClick={handleAddTodo}>할 일 추가 하기</button>
        </div>
        <button onClick={handleDelete}>삭제하기</button>
      </div>

      {todoList.map((item) => (
        <div key={item.id} style={{ display: "flex", columnGap: "6px" }}>
          <input
            type="checkbox"
            id={String(item.id)}
            checked={item.checked}
            onChange={(e) => {
              const checkValue = e.target.checked;
              setTodoList((prev) => {
                return prev.map((item) =>
                  String(item.id) === e.target.id
                    ? { ...item, checked: checkValue }
                    : item,
                );
              });
            }}
          />
          <h3>{item.todo}</h3>
        </div>
      ))}
    </div>
  );
}

export default Todo;
