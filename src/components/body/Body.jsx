import React, { useEffect, useState } from "react";
import axios from "axios";

import styles from "./body.module.css";
import ImgCard from "../cards/ImgCard";
import { useLocation, useNavigate } from "react-router-dom";

const Body = () => {
  const [data, setData] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get("query");

    if (query) {
      // console.log(query);
      fetchData(query);
    } else {
      fetchFeed();
    }
  }, [location.search]);

  const fetchData = async (query) => {
    try {
      const url = `https://api.unsplash.com/search/photos?query=${query}&page=1&client_id=56AdQzhmUDi3e4eJXdfKEUUfmW9lSpYzAampuJy0mRs`;

      const response = await axios.get(url);

      if (response.status === 200) {
        const data = response.data.results;
        setData(data);
        // console.log(data)
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchFeed = async () => {
    try {
      const url =
        "https://api.unsplash.com/photos?page=1&client_id=56AdQzhmUDi3e4eJXdfKEUUfmW9lSpYzAampuJy0mRs";

      const response = await axios.get(url);

      if (response.status === 200) {
        const data = response.data;
        setData(data);
        // console.log(data)
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // -----------------------

  const navigate = useNavigate();

  const handleImgClick = (slug) => {
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get("query");

    if (query) {
      navigate(`/?query=${query}&slug=${slug}`);
    } else navigate(`/?slug=${slug}`);
    console.log(slug);
  };

  return (
    <div className={styles["body"]}>
      {data &&
        data.map((item, index) => (
          <div
            onClick={() => {
              handleImgClick(item.id);
            }}
            className={styles["cell"]}
            key={index}
          >
            <ImgCard
              name={item.user.name}
              username={item.user.username}
              likes={item.likes}
              URL={item.urls.regular}
              userPic = {item.user.profile_image.large}
            />
          </div>
        ))}
    </div>
  );
};

export default Body;
