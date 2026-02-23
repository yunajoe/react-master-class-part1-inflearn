import "./App.css";
import Todo from "./Todo.tsx";
/**
 * 
 * @returns 
 * # 초기 상태
공부하기
운동하기

# [할 일 추가] 클릭 후
공부하기
운동하기
청소하기

# [삭제] 클릭 후
운동하기
청소하기

# 체크박스 클릭 시
공부하기 (✅)
운동하기 (✅)
 * 
 */

function App() {
  return (
    <>
      {/* <Profile />
      <User /> */}
      <Todo />
    </>
  );
}

export default App;
