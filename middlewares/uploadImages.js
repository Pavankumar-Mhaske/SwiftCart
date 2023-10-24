import multer from "multer";
import sharp from "sharp";
import path from "path";

const multerStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../../public/uploads"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + ".jpeg");
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
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
    fileSize: 2000000,
  },
});

const productImgResize = async (req, res, next) => {
  if (!req.file) return next();
  await Promise.all(
    req.files.map(async (file) => {
      await sharp(file.path)
        .resize(300, 300)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(path.join(`/public/images/products/${file.filename}`));
    })
  );
  next();
};

const blogImgResize = async (req, res, next) => {
  if (!req.file) return next();
  await Promise.all(
    req.files.map(async (file) => {
      await sharp(file.path)
        .resize(300, 300)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(path.join(`/public/images/blog/${file.filename}`));
    })
  );
  next();
};

export { uploadPhoto, productImgResize, blogImgResize };
