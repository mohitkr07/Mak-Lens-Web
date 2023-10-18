import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./nav.module.css";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DispModal from "../modal/DispModal";

const Nav = () => {
  const [query, setQuery] = useState("");

  const [theme, setTheme] = useState("light-theme");

  const navigate = useNavigate();
  const location = useLocation();

  const [popModal, hideModal] = useState(false);

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const slug = query.get("slug");

    if (slug) {
      handleModal();
    } else {
      closeModal(false);
    }
  }, [location.search]);

  useEffect(() => {
    document.body.className = localStorage.getItem("theme");
  }, []);

  const handleSearch = () => {
    if (query) {
      navigate(`/?query=${query}`);
    }
  };

  const handleModal = () => {
    hideModal(true);
  };
  const closeModal = (rec) => {
    hideModal(rec);
  };

  const handleThemeChange = (e) => {
    // if (theme === "light-theme") setTheme("dark-theme");
    // else setTheme("light-theme");
    let newTheme = theme === "light-theme" ? "dark-theme" : "light-theme";
    localStorage.setItem("theme", newTheme);
    document.body.className = newTheme;
    setTheme(newTheme);
  };

  const moveToHome = () => {
    setQuery("");
    navigate("/");
  };

  return (
    <>
      {popModal && <DispModal onClick={closeModal} />}
      <nav className={`${styles["nav"]} ${"main-div"}`}>
        <div style={{ cursor: "pointer" }} className={styles["logo"]}>
          <h3
            onClick={() => {
              moveToHome();
            }}
          >
            Tars Images
          </h3>
        </div>
        <div className={styles["search-bar1"]}>
          <input
            type="text"
            placeholder="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />
          <i
            onClick={() => handleSearch()}
            class="fa-solid fa-magnifying-glass"
          />
        </div>
        <div className={styles["nav-button"]}>
          <ul>
            <li>Explore</li>
            <li>Collection</li>
            <li>Community</li>
          </ul>
        </div>
        <div>
          <FormControlLabel
            onChange={handleThemeChange}
            control={<Switch />}
            label="Dark Mode"
          />
        </div>
      </nav>
    </>
  );
};

export default Nav;
