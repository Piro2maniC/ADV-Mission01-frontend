import React, { useState } from "react";
import styles from "../../../../../styles/HomePageImageUploadModule.module.css";

function ImageUploadModule() {
  const [imageFile, setImageFile] = useState();
  function handleChange(e) {
    console.log(e.target.files);
    setImageFile(URL.createObjectURL(e.target.files[0]));
  }
  function handleClick() {
    console.log(`${imageFile} clicked`);
  }

  return (
    <div className={styles.container}>
      <div className={styles.h1}>
        Upload an image of your car to get an instant insurance quote:
      </div>
      <div className={styles.buttonContainer}>
        <input
          className={styles.imageSelector}
          type="file"
          onChange={handleChange}
        />
        <div className={styles.button} onClick={handleClick}>
          Submit
        </div>
      </div>
      <div className={styles.imageContainer}>
        <img className={styles.image} src={imageFile} />
      </div>
    </div>
  );
}

export default ImageUploadModule;
