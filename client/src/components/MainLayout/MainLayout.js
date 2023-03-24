import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import MainContent from "./MainContent";
import styles from "./MainLayout.module.scss";

function MainLayout({ children }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <Header />
      </div>
      <div className={styles.body}>
        <div className={styles.sidebar}>{<Sidebar />}</div>
        <div className={styles.container}>
          <div className={styles.mainContent}>
            <MainContent>{children}</MainContent>
          </div>
          <div className={styles.footer}>
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainLayout;
