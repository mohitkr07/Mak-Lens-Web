import React from "react";
import styles from "./home.module.css";

import Nav from "./navigation/Nav";
import Body from "./body/Body";

const Home = () => {
  return (
    <div className={styles["home"]}>
      <Nav />
      <Body />
    </div>
  );
};

export default Home;
