import "./App.css";
import Button from "./Button";
import Form from "./Form";
import Fruits from "./Fruits";

function App() {
  return (
    <div style={{ display: "flex", flexDirection: "column", rowGap: "10px" }}>
      <Fruits />
      <Form />
      <Button />
    </div>
  );
}

export default App;
