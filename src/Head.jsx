import { useState } from "react";
import Footer from "./Footer.jsx";
import styles from "./Head.module.css";
import Header from "./Header.jsx";
function Head() {
  const [active, setActive] = useState(false);
  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <Header />
      <hr />
      <Footer />
      <button
        className={`${styles.button} ${active ? styles.active : ""}`}
        onClick={() => {
          setActive((prev) => !prev);
        }}
      >
        Click Me
      </button>
    </div>
  );
}

export default Head;
