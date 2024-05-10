import styles from "./Footer.module.sass";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.team}>
        <div className={styles.line}></div>
        <div className={styles.text}>ByGroup344© 2024</div>
        <div className={styles.line}></div>
      </div>
      <div className={styles.contacts}>
        <a href="https://t.me/VinGP">
          <div className={styles.imageWrapper}>
            <img src="/icons/tg.svg" alt="tg icon" />
          </div>
          BackEnd
        </a>
        <a href="https://t.me/Andrew13145">
          <div className={styles.imageWrapper}>
            <img src="/icons/tg.svg" alt="tg icon" />
          </div>
          FrontEnd
        </a>
        <a href="https://t.me/y_sklv">
          <div className={styles.imageWrapper}>
            <img src="/icons/tg.svg" alt="tg icon" />
          </div>
          Design
        </a>
      </div>
    </footer>
  );
};

export default Footer;
