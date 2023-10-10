import React, { useState } from "react";
import axios from "axios";

const cloudinaryImageUpload = () => {
  const cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME; // Cloudinary cloud name

  const uploadPreset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET; // Cloudinary upload preset

  //   const [imageUrl, setImageUrl] = useState(""); // image url
  //   const [error, setError] = useState(""); // error

  const handleImageUpload = async (event) => {
    // image upload
    const file = event.target.files[0];

    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/upload`,
        formData
      );

      if (response.status === 200) {
        const uploadedImageUrl = response.data.secure_url;
        setImageUrl(uploadedImageUrl);
        setError("");
      } else {
        setError("Something went wrong");
      }
    } catch (err) {
      setError("Something went wrong");
    }
  };
};

export default cloudinaryImageUpload;
