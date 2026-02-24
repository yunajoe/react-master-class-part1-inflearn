import { ChangeEvent, useState } from "react";

const InitTotoData = [
  { id: 1, todo: "공부하기", checked: false },
  { id: 2, todo: "운동하기", checked: false },
];

function Todo() {
  const [todoList, setTodoList] = useState(InitTotoData);
  const [newTodo, setNewTodo] = useState("");
  const [isCompleteTodoHide, setIsCompleteTodoHide] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setNewTodo(value);
  };
  const handleAddTodo = () => {
    if (!newTodo) return;
    setTodoList((prev) => [
      ...prev,
      { id: Date.now(), todo: newTodo, checked: false },
    ]);
    setNewTodo("");
  };

  const handleDelete = () => {
    // checked: true 인것을 삭제하기
    const remainTodoList = todoList.filter((item) => !item.checked);
    setTodoList(remainTodoList);
  };

  const handleToggle = (
    e: ChangeEvent<HTMLInputElement, HTMLInputElement>,
    id: number,
  ) => {
    setTodoList((prev) => {
      return prev.map((todo) =>
        todo.id === id ? { ...todo, checked: e.target.checked } : todo,
      );
    });
  };

  const visibleTodos = isCompleteTodoHide
    ? todoList.filter((item) => !item.checked)
    : todoList;

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", columnGap: "20px" }}>
        <div style={{ display: "flex", columnGap: "6px" }}>
          <input value={newTodo} onChange={handleChange} />
          <button onClick={handleAddTodo}>할 일 추가 하기</button>
        </div>
        <div>
          <label>
            완료된 항목 숨기기
            <input
              type="checkbox"
              checked={isCompleteTodoHide}
              onChange={(e) => {
                const checked = e.target.checked;
                setIsCompleteTodoHide(checked);
              }}
            />
          </label>
        </div>
        {/* <button onClick={handleDelete}>삭제하기</button> */}
      </div>

      {visibleTodos.map((item) => (
        <div
          key={item.id}
          style={{
            display: "flex",
            columnGap: "6px",
            border: "5px solid blue",
            marginBottom: "10px",
          }}
        >
          <input
            type="checkbox"
            checked={item.checked}
            onChange={(e) => handleToggle(e, item.id)}
          />
          <h3>{item.todo}</h3>
        </div>
      ))}
    </div>
  );
}

export default Todo;
