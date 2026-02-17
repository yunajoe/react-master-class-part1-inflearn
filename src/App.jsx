import "./App.css";
import Count from "./Count.tsx";
import Input from "./Input.tsx";
import Toggle from "./Toggle.tsx";

function App() {
  return (
    <div style={{ display: "flex", flexDirection: "column", rowGap: "10px" }}>
      <Count />
      <Toggle />
      <Input />
    </div>
  );
}

export default App;
