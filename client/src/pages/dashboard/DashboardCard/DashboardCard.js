import styles from "./DashboardCard.module.scss";

function DashboardCard({ title, value }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.cart}>
        <h3>{title}</h3>
        <h2>{value}</h2>
      </div>
    </div>
  );
}

export default DashboardCard;
