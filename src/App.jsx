import "./App.css";
import Count from "./Count.tsx";
import Toggle from "./Toggle.tsx";

function App() {
  return (
    <div style={{ display: "flex", flexDirection: "column", rowGap: "10px" }}>
      <Count />
      <Toggle />
    </div>
  );
}

export default App;
