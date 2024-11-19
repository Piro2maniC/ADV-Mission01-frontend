import React from "react";
import ImageUploadModule from "./components/ImageUploadModule";
import styles from "../../../../styles/HomePageSectionOne.module.css";

function HomePageSectionOne() {
  return (
    <div className={styles.contentContainer}>
      <ImageUploadModule />
    </div>
  );
}

export default HomePageSectionOne;
