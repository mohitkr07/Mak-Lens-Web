import React from "react";
import styles from "./nav.module.css";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

const Nav = () => {
  return (
    <nav className={styles["nav"]}>
      <div className={styles["logo"]}>
        <h3>Tars Images</h3>
      </div>
      <div className={styles["search-bar1"]}>
        <input type="text" placeholder="search" />
        <i class="fa-solid fa-magnifying-glass" />
      </div>
      <div className={styles["nav-button"]}>
        <ul>
          <li>Explore</li>
          <li>Collection</li>
          <li>Community</li>
        </ul>
      </div>
      <div>
        <FormControlLabel control={<Switch />} label="Dark Mode" />
      </div>
    </nav>
  );
};

export default Nav;
