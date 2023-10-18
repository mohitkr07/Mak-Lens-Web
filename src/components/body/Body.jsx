import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./body.module.css";
import ImgCard from "../cards/ImgCard";

const Body = () => {
  const [feedData, setFeedData] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get("query");
    const slug = queryParams.get("slug");

    if (slug) {
      sessionStorage.setItem("flag", 1);
      return;
    }

    if (sessionStorage.getItem("flag") == 1) return;

    if (query) {
      fetchData(query, page);
      setSearchQuery(query);
    } else {
      fetchFeed();
    }
  }, [location.search, page]);

  const fetchData = async (query, currentPage) => {
    try {
      const url = `https://api.unsplash.com/search/photos?query=${query}&page=${currentPage}&client_id=56AdQzhmUDi3e4eJXdfKEUUfmW9lSpYzAampuJy0mRs`;
      const response = await axios.get(url);

      if (response.status === 200) {
        const resData = response.data.results;
        if (currentPage > 1 && sessionStorage.getItem("newSearch") == 0) {
          setSearchData([...searchData, ...resData]);
        } else {
          setSearchData(resData);
          setPage(1);
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchFeed = async () => {
    try {
      const url = `https://api.unsplash.com/photos?page=${page}&client_id=56AdQzhmUDi3e4eJXdfKEUUfmW9lSpYzAampuJy0mRs`;
      const response = await axios.get(url);

      if (response.status === 200) {
        const resData = response.data;
        if (page > 1 && sessionStorage.getItem("newSearch") == 0) {
          setFeedData([...feedData, ...resData]);
        } else {
          setFeedData(resData);
          setPage(1);
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleImgClick = (slug) => {
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get("query");

    if (query) {
      navigate(`/?query=${query}&slug=${slug}`);
    } else {
      navigate(`/?slug=${slug}`);
    }
    console.log(page);
  };

  const handleLoad = () => {
    sessionStorage.setItem("flag", 0);
    sessionStorage.setItem("newSearch", 0);
    setPage(page + 1);
  };

  return (
    <>
      <div className={styles["body"]}>
        {searchQuery
          ? searchData.map((item, index) => (
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
                  userPic={item.user.profile_image.large}
                />
              </div>
            ))
          : feedData.map((item, index) => (
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
                  userPic={item.user.profile_image.large}
                />
              </div>
            ))}
      </div>
      <div className={styles["load-button"]}>
        <button onClick={handleLoad}>Load More</button>
      </div>
    </>
  );
};

export default Body;
