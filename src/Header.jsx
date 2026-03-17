import styles from "./Header.module.css";

function Header() {
  return (
    <header>
      <h2>HEADER 영역</h2>
      <button className={styles.button}>Header Button</button>
    </header>
  );
}

export default Header;
