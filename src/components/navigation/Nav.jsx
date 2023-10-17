import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./nav.module.css";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DispModal from "../modal/DispModal";

const Nav = () => {
  const [query, setQuery] = useState(""); // State variable to track the query

  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = () => {
    if (query) {
      navigate(`/?query=${query}`);
    }
  };

  

  const[popModal, hideModal] = useState(false);

  const handleModal = ()=>{
    hideModal(!popModal)

  }
  const closeModal = (rec)=>{
    hideModal(rec);

  }

  useEffect(()=>{
    const query = new URLSearchParams(location.search)
    const slug = query.get("slug")

    if(slug){
      handleModal()
    }
  },[location.search])

  return (
    <>
      {popModal && <DispModal onClick={closeModal} />}
      <nav className={styles["nav"]}>
        <div style={{ cursor: "pointer" }} className={styles["logo"]}>
          <h3
            onClick={() => {
              navigate("/");
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
          <FormControlLabel control={<Switch />} label="Dark Mode" />
        </div>
      </nav>
    </>
  );
};

export default Nav;
