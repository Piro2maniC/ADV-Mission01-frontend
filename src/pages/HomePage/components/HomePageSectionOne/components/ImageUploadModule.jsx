import React, { useState } from "react";
import axios from "axios";
import styles from "../../../../../styles/HomePageImageUploadModule.module.css";

function ImageUploadModule() {
  const [imageFile, setImageFile] = useState(null); // Store the file object
  const [preview, setPreview] = useState(null); // Store the image preview URL
  const [prediction, setPrediction] = useState(null); // Store prediction results
  const [isLoading, setIsLoading] = useState(false); // Track loading state

  // Handle file selection
  function handleChange(e) {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file); // Store the file object
      setPreview(URL.createObjectURL(file)); // Create a preview URL for the file
    }
  }

  // Handle form submission
  async function handleClick() {
    if (!imageFile) {
      alert("Please select an image file before submitting.");
      return;
    }

    const formData = new FormData();
    formData.append("image", imageFile);

    console.log("Uploading file:", imageFile);

    try {
      setIsLoading(true);
      setPrediction(null);

      // Send the image file to the backend
      const response = await axios.post(
        "http://localhost:4000/api/predict",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setPrediction(response.data.predictions); // Update with prediction results
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Failed to upload image or fetch predictions.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>
        Upload an image of your car to get an instant insurance quote:
      </h1>
      <div className={styles.buttonContainer}>
        <input
          className={styles.imageSelector}
          type="file"
          accept="image/*"
          onChange={handleChange}
        />
        <div className={styles.button} onClick={handleClick}>
          {isLoading ? "Processing..." : "Submit"}
        </div>
      </div>
      <div className={styles.imageContainer}>
        {preview && (
          <img
            className={styles.image}
            src={preview}
            alt="Selected file preview"
          />
        )}
      </div>
      {prediction && (
        <div className={styles.predictionContainer}>
          <h2>Prediction Results:</h2>
          <ul>
            {prediction.map((p, index) => (
              <li key={index}>
                {p.tagName}: {(p.probability * 100).toFixed(2)}%
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ImageUploadModule;
