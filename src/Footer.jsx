import styles from "./Footer.module.css";
function Footer() {
  return (
    <footer>
      <h2>FOOTER 영역</h2>
      <button className={styles.button}>Footer Button</button>
    </footer>
  );
}

export default Footer;
