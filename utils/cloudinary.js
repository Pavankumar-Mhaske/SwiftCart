import cloudinary from "cloudinary";
// import {v2 as cloudinary} from 'cloudinary';
// import { config, uploader } from "cloudinary";

import dotenv from "dotenv";
import { resolveContent } from "nodemailer/lib/shared";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const cloudinaryUploadImg = async (fileToUploads) => {
  return new Promise((resolve) => {
    cloudinary.uploader.upload(fileToUploads, (error, result) => {
      if (error) {
        reject(error);
      }
      resolve(
        {
          url: result.secure_url,
        },
        {
          resource_type: "auto",
        }
      );
    });
  });
};

// const cloudinaryUpload = async (fileToUploads) => {
//   try {
//     const uploadedFiles = await Promise.all(
//       fileToUploads.map((file) =>
//         cloudinary.uploader.upload(file,
//             {
//           folder: "ecommerce",
//         }

//         )
//       )
//     );
//     return uploadedFiles;
//   } catch (error) {
//     console.log(error);
//   }
// };

export { cloudinaryUploadImg };
