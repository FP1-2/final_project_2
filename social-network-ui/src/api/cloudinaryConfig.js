import cloudinary from "cloudinary-core";

const cloudinaryCore = new cloudinary.Cloudinary({
  cloudName: "dl4ihoods",
  apiKey: "286381651545272",
  apiSecret: "286381651545272",
});

export default cloudinaryCore;
