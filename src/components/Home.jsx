import React, { useEffect } from "react";
import styles from "./home.module.css";

import Nav from "./navigation/Nav";
import Body from "./body/Body";

const Home = () => {
  useEffect(() => {
    sessionStorage.setItem("flag", 0);
  }, [1]);
  return (
    <div className={styles["home"]}>
      <Nav />
      <Body />
    </div>
  );
};

export default Home;
