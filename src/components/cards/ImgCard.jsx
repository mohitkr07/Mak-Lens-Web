import styles from "./cards.module.css";

const ImgCard = () => {
  return (
    <div className={styles["img-card"]}>
        <div className={styles["thumbnail"]}>
            <img src="images/test.jpg" />
        </div>
        <div className={styles["contributer"]}>
            <div className={styles["user"]}>
                <span className={styles["user-pic"]}>

                </span>

                <span className={styles["user-details"]}>
                    <p>Mohit Kumar</p>
                    <p>@makarya</p>
                </span>
            </div>
            <div className={styles["likes"]}>
                
            </div>
        </div>
    </div>
  );
};

export default ImgCard;
