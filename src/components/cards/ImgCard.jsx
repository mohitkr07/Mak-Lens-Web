import styles from "./cards.module.css";

const ImgCard = (props) => {
  return (
    <div className={`${styles["img-card"]}`}>
      <div className={styles["thumbnail"]}>
        <img src={props.URL} />
      </div>
      <div className={styles["contributer"]}>
        <div className={styles["user"]}>
          <div className={styles["user-pic"]}>
            <img src="images/user.jpg" />
          </div>

          <span className={styles["user-details"]}>
            <p>Mohit Kumar</p>
            <p>@makarya</p>
          </span>
        </div>
        <div className={styles["likes"]}>
          <i class="fa-solid fa-heart" />
          <p>129</p>
        </div>
      </div>
    </div>
  );
};

export default ImgCard;
