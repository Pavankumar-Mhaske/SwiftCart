import multer from "multer";
import sharp from "sharp";
import path from "path";

import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const multerStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/images/products"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + ".jpeg");
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
    // console.log("inside the multerFilter:", req.files);
  } else {
    cb(
      {
        message:
          "Not an image, or Unsupported file format! Please upload only images.",
      },
      false
    );
  }
};

const uploadPhoto = multer({
  // storage: multer.memoryStorage(),
  // limits: {
  //     fileSize: 1024 * 1024 * 5,
  // },
  storage: multerStorage,
  fileFilter: multerFilter,
  limits: {
    fieldSize: 5000000,
  },
});

const productImgResize = async (req, res, next) => {
  if (!req.files) return next();
  console.log("req.files", req.files),
    await Promise.all(
      req.files.map(async (file) => {
        // console.log("file", file);
        const outputFilename = `${file.fieldname}-${Date.now()}.jpeg`; // Create a unique filename
        await sharp(file.path)
          .resize(300, 300)
          .toFormat("jpeg")
          .jpeg({ quality: 90 }) // 90% quality
          // .toFile(path.join(`/public/images/products/${file.filename}`));
          // .toFile(/public/images/products/${file.filename}`);
          .toFile(
            path.join(__dirname, "../public/images/products", outputFilename)
          );
      })
    );
  next();
};

const blogImgResize = async (req, res, next) => {
  if (!req.file) return next();
  await Promise.all(
    req.files.map(async (file) => {
      const outputFilename = `${file.fieldname}-${Date.now()}.jpeg`; // Create a unique filename
      await sharp(file.path)
        .resize(300, 300)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        // .toFile(path.join(`/public/images/blog/${file.filename}`));
        // .toFile(/public/images/blog/${file.filename}`);
        .toFile(path.join(__dirname, "../public/images/blog", outputFilename));
    })
  );
  next();
};

export { uploadPhoto, productImgResize, blogImgResize };
