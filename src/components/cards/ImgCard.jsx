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
            <img src={props.userPic} />
          </div>

          <span className={styles["user-details"]}>
            <p>{props.name}</p>
            <p>@{props.username}</p>
          </span>
        </div>
        <div className={styles["likes"]}>
          <i class="fa-solid fa-heart" />
          <p>{props.likes}</p>
        </div>
      </div>
    </div>
  );
};

export default ImgCard;
