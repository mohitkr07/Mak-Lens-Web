import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./nav.module.css";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DispModal from "../modal/DispModal";

import SearchAppBar from "./MuiSearchBar";

const Nav = () => {
  const [query, setQuery] = useState("");

  const [theme, setTheme] = useState("light-theme");

  const navigate = useNavigate();
  const location = useLocation();

  const [popModal, showModal] = useState(false);

  const [showMenu, setShowMenu] = useState(false);

  const [home, setHome] = useState(0);

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const slug = query.get("slug");
    const q = query.get("query");

    if (!slug && !q) setHome(1);
    else setHome(0);

    if (slug) {
      handleModal();
    } else {
      closeModal(false);
    }
  }, [location.search]);

  useEffect(() => {
    if(localStorage.getItem("theme"))
    document.body.className = localStorage.getItem("theme");
  }, []);

  const handleSearch = () => {
    if (query) {
      navigate(`/?query=${query}`);

      sessionStorage.setItem("flag", 0);
      sessionStorage.setItem("newSearch", 1);
      sessionStorage.setItem("home", 0);
    }
  };

  const handleModal = () => {
    showModal(true);
  };
  const closeModal = (rec) => {
    showModal(rec);
  };

  const handleThemeChange = (e) => {
    let newTheme = theme === "light-theme" ? "dark-theme" : "light-theme";
    localStorage.setItem("theme", newTheme);
    document.body.className = newTheme;
    setTheme(newTheme);
  };

  const moveToHome = () => {
    setQuery("");
    navigate("/");
    window.location.reload();
  };

  return (
    <>
      {popModal && <DispModal onClick={closeModal} />}

      <nav className={`${styles["nav2"]} ${"main-div"}`}>
        <span>
          <div
            style={{ cursor: "pointer", alignItems: "center" }}
            className={styles["logo-2"]}
          >
            {!showMenu && (
              <i
                onClick={() => {
                  setShowMenu(true);
                }}
                class="fa-solid fa-bars"
              />
            )}
            {showMenu && (
              <i
                onClick={() => {
                  setShowMenu(false);
                }}
                class="fa-solid fa-x"
              />
            )}
            <p
              onClick={() => {
                moveToHome();
              }}
            >
              Tars Images
            </p>
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
        </span>
        {showMenu && (
          <div className={styles["nav-button-2"]}>
            <ul>
              <li>Explore</li>
              <li>Collection</li>
              <li>Community</li>
              <li>
                <FormControlLabel
                  onChange={handleThemeChange}
                  control={
                    <Switch
                      checked={localStorage.getItem("theme") == "dark-theme"}
                    />
                  }
                  label="Dark Mode"
                />
              </li>
            </ul>
          </div>
        )}
        <div></div>
      </nav>

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
            control={
              <Switch checked={localStorage.getItem("theme") == "dark-theme"} />
            }
            label="Dark Mode"
          />
        </div>
      </nav>
      {home ? (
        <div className={styles["home"]}>
          <div className={styles["home-content"]}>
            <h2 style={{color: "#fff", marginBottom: "10px"}}>Download High Quality Images</h2>
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
          </div>
        </div>
      ): null}
    </>
  );
};

export default Nav;
