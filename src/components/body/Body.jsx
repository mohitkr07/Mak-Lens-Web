import React from 'react'
import styles from "./body.module.css"
import ImgCard from '../cards/ImgCard'


const Body = () => {
  return (
    <div className={styles["body"]}>
        <ImgCard />
    </div>
  )
}

export default Body