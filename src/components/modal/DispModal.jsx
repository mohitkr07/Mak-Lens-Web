import { useEffect, useState } from "react";
import styles from "./modal.module.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const DispModal = (props) => {
  const [data, setData] = useState();
  const navigate = useNavigate();

  const location = useLocation();

  useEffect(() => {
    document.body.style.overflowY = "hidden";
  }, []);

  useEffect(() => {
    const slugParams = new URLSearchParams(location.search);
    const slug = slugParams.get("slug");

    console.log(slug);
    if (slug) {
      fetchData(slug);
    }
  }, [location.search]);

  const fetchData = async (slug) => {
    try {
      const url = `https://api.unsplash.com/photos/${slug}?client_id=56AdQzhmUDi3e4eJXdfKEUUfmW9lSpYzAampuJy0mRs`;

      const response = await axios.get(url);

      if (response.status === 200) {
        const data = response.data;
        setData(data);
        console.log(data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const closeModal = (e) => {
    if (e.target == e.currentTarget) {
      props.onClick(false);
      document.body.style.overflowY = "visible";
      navigate(-1);
    }
  };

  return (
    <>
      {data && (
        <div onClick={closeModal} className={styles["modal"]}>
          <div className={styles["popup"]}>
            <div className={styles["image"]}>
              <img src={data.urls.regular} />
            </div>
            <div className={styles["info"]}>
              <div className={styles["info-top"]}>
                <div className={styles["profile"]}>
                  <span style={{ display: "flex" }}>
                    <div className={styles["profile-pic"]}>
                      <img src={data.user.profile_image.large} />
                    </div>
                    <div className={styles["profile-info"]}>
                      <span>
                        <p>{data.user.name}</p>
                        <p>@{data.user.username}</p>
                      </span>
                      <i class="fa-brands fa-instagram" />
                      <p style={{ marginLeft: "5px" }}>
                        {data.user.social.instagram_username}
                      </p>
                      <i class="fa-brands fa-x-twitter" />
                      <p style={{ marginLeft: "5px" }}>
                        {data.user.social.twitter_username}
                      </p>
                    </div>
                  </span>
                  <span className={styles["social-res"]}>
                    <i class="fa-brands fa-instagram" />
                    <p style={{ marginLeft: "5px" }}>
                      {data.user.social.instagram_username}
                    </p>
                    <i class="fa-brands fa-x-twitter" />
                    <p style={{ marginLeft: "5px" }}>
                      {data.user.social.twitter_username}
                    </p>
                  </span>
                </div>
                <div className={styles["pic-info"]}>
                  <div className={styles["downloads"]}>
                    <p>{data.downloads} downloads</p>
                  </div>
                  <div className={styles["likes"]}>
                    <i className="fa-solid fa-heart" />
                    <p>{data.likes}</p>
                  </div>
                </div>

                <div className={styles["pic-info-res"]}>
                  <span>
                    <button>Download</button>
                  </span>
                  <span>
                    <div className={styles["downloads"]}>
                      <p style={{ marginRight: "5px" }}>{data.downloads}</p>
                      <p> downloads</p>
                    </div>
                    <div className={styles["likes"]}>
                      <i className="fa-solid fa-heart" />
                      <p>{data.likes}</p>
                    </div>
                  </span>
                </div>
              </div>
              <div className={styles["related-tags"]}>
                <p>Related Tags</p>
                <div className={styles["tags"]}>
                  {data.tags.map(
                    (item, index) =>
                      index < 25 && <p key={index}>{item.title}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DispModal;
