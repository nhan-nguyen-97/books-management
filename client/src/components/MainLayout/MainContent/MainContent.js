import styles from "./MainContent.module.scss";

function MainContent({ children, title }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>{title}</div>
      <div className={styles.body}>{children}</div>
    </div>
  );
}
export default MainContent;
