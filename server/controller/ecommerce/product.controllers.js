import mongoose from "mongoose";
import slugify from "slugify";
import { Product } from "../../models/ecommerce/product.models.js";
import { User } from "../../models/auth/user.models.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import {
  getLocalPath,
  getMongoosePaginationOptions,
  getStaticFilePath,
  removeLocalFile,
} from "../../utils/helpers.js";
import { MAXIMUM_SUB_IMAGE_COUNT } from "../../constants.js";
import { ProductCategory } from "../../models/ecommerce/productCategory.models.js";
import {
  cloudinaryUploadImg,
  cloudinaryDeleteImg,
} from "../../utils/cloudinary.js";
import fs from "fs";

const createProduct = asyncHandler(async (req, res) => {
  const {
    name, // done
    description, // done
    price, // done
    stock, // done
    soldItems,
    category, // done
    brand, // done
    colors, // done
    tags,
    subImages,
    mainImages,
  } = req.body;

  const slug = name ? slugify(name, { lower: true }) : undefined;

  console.log("Subimages in product controller is : ", subImages);
  // name ? (req.body.slug = slugify(name, { lower: true })) : undefined;
  // const categoryToBeAdded = await Category.findById(category);

  // if (!categoryToBeAdded) {
  //   throw new ApiError(404, "Category does not exist");
  // }

  // // Check if user has uploaded a main image
  // if (!req.files?.mainImage || !req.files?.mainImage.length) {
  //   throw new ApiError(400, "Main image is required");
  // }

  // const mainImageUrl = getStaticFilePath(
  //   req,
  //   req.files?.mainImage[0]?.filename
  // );
  // const mainImageLocalPath = getLocalPath(req.files?.mainImage[0]?.filename);

  // Check if user has uploaded any subImages if yes then extract the file path
  // else assign an empty array

  /**
   * @type {{ url: string; localPath: string; }[]}
   */

  // const subImages =
  //   req.files.subImages && req.files.subImages?.length
  //     ? req.files.subImages.map((image) => {
  //         const imageUrl = getStaticFilePath(req, image.filename);
  //         const imageLocalPath = getLocalPath(image.filename);
  //         return { url: imageUrl, localPath: imageLocalPath };
  //       })
  //     : [];

  const owner = req.user._id;

  const product = await Product.create({
    name,
    slug,
    description,
    price,
    stock,
    soldItems,
    category,
    colors,
    brand,
    owner,
    tags,
    subImages,
    mainImages,
  });
  return res
    .status(201)
    .json(new ApiResponse(201, product, "Product created successfully"));
});

const getAllProducts = asyncHandler(async (req, res) => {
  /**
   * page: which page to show ( only Products respective to that page will be fetched )
   * limit: how many products to show in a page
   */
  const { page = 1, limit = 10 } = req.query;
  // Filtering
  const queryObj = { ...req.query };
  // console.log(queryObj);

  const excludedFields = ["page", "limit", "sort", "fields"];
  excludedFields.forEach((el) => delete queryObj[el]);
  // console.log(queryObj);

  let queryStr = JSON.stringify(queryObj);
  queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
  // console.log(JSON.parse(queryStr));

  const priceCriteria = JSON.parse(queryStr);
  // console.log(priceCriteria.price);

  /**
   * @type {{ price: { $gte: number; $lte: number; }; }}
   * - if the the query contains price in which alphabetical operator have value is in string form then convert it to a number
   */
  for (const key in priceCriteria) {
    if (key === "price") {
      // console.log(priceCriteria[key]);
      const value = priceCriteria[key];
      // Convert the value to a number if it's a string
      for (const innerkey in value) {
        if (typeof value[innerkey] === "string") {
          priceCriteria[key][innerkey] = parseFloat(value[innerkey]);
          // console.log(priceCriteria[key]);
        }
      }
      // console.log(priceCriteria[key]);
    }
  }

  // const productAggregate = Product.aggregate([{ $match: {color:color} }]);
  // const productAggregate = Product.aggregate([{ $match: queryObj }]);
  let productAggregate = Product.aggregate([{ $match: priceCriteria }]);
  // const productAggregate = Product.find(priceCriteria);

  // Sorting
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    console.log(sortBy);
    /**
     * Sorting according to the given criteria
     * - display the product according to the given criteria
     */
    productAggregate = productAggregate.sort(sortBy);
  } else {
    /**
     * Sorting according to the createdAt
     * - display the latest product first/at the top
     */
    productAggregate = productAggregate.sort("-createdAt");
  }

  // Field limiting
  if (req.query.fields) {
    const fields = req.query.fields.split(",").join(" ");
    productAggregate = productAggregate.project(fields);
  } else {
    productAggregate = productAggregate.project("-__v");
  }

  const products = await Product.aggregatePaginate(
    productAggregate,
    getMongoosePaginationOptions({
      page,
      limit,
      customLabels: {
        totalDocs: "totalProducts",
        docs: "products",
      },
    })
  );

  return res
    .status(200)
    .json(new ApiResponse(200, products, "Products fetched successfully"));
});

const updateProduct = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  // const { name, description, category, price, stock } = req.body;

  // const { name, description, price, stock, soldItems, category, brand } =
  //   req.body;

  // const slug = name ? slugify(name, { lower: true }) : undefined;

  req.body.name
    ? (req.body.slug = slugify(req.body.name, { lower: true }))
    : undefined;
  const product = await Product.findById(productId);

  // Check the product existence
  if (!product) {
    throw new ApiError(404, "Product does not exist");
  }

  // const mainImage = req.files?.mainImage?.length
  //   ? {
  //       // If user has uploaded new main image then we have to create an object with new url and local path in the project
  //       url: getStaticFilePath(req, req.files?.mainImage[0]?.filename),
  //       localPath: getLocalPath(req.files?.mainImage[0]?.filename),
  //     }
  //   : product.mainImage; // if there is no new main image uploaded we will stay with the old main image of the product

  // /**
  //  * @type {{ url: string; localPath: string; }[]}
  //  */
  // let subImages =
  //   // If user has uploaded new sub images then we have to create an object with new url and local path in the array format
  //   req.files?.subImages && req.files.subImages?.length
  //     ? req.files.subImages.map((image) => {
  //         const imageUrl = getStaticFilePath(req, image.filename);
  //         const imageLocalPath = getLocalPath(image.filename);
  //         return { url: imageUrl, localPath: imageLocalPath };
  //       })
  //     : []; // if there are no new sub images uploaded we want to keep an empty array

  // const existedSubImages = product.subImages.length; // total sub images already present in the project
  // const newSubImages = subImages.length; // Newly uploaded sub images
  // const totalSubImages = existedSubImages + newSubImages;

  // if (totalSubImages > MAXIMUM_SUB_IMAGE_COUNT) {
  //   // We want user to only add at max 4 sub images
  //   // If the existing sub images + new sub images count exceeds 4
  //   // We want to throw an error

  //   // Before throwing an error we need to do some cleanup

  //   // remove the  newly uploaded sub images by multer as there is not updation happening
  //   subImages?.map((img) => removeLocalFile(img.localPath));
  //   if (product.mainImage.url !== mainImage.url) {
  //     // If use has uploaded new main image remove the newly uploaded main image as there is no updation happening
  //     removeLocalFile(mainImage.localPath);
  //   }
  //   throw new ApiError(
  //     400,
  //     "Maximum " +
  //       MAXIMUM_SUB_IMAGE_COUNT +
  //       " sub images are allowed for a product. There are already " +
  //       existedSubImages +
  //       " sub images attached to the product."
  //   );
  // }

  // // If above checks are passed. We need to merge the existing sub images and newly uploaded sub images
  // subImages = [...product.subImages, ...subImages];

  const updatedProduct = await Product.findByIdAndUpdate(
    productId,
    // {
    // $set: {
    // name,
    // description,
    // stock,
    // price,
    // category,
    // mainImage,
    // subImages,

    // },

    // },
    req.body,
    {
      new: true,
    }
  );

  // // Once the product is updated. Do some cleanup
  // if (product.mainImage.url !== mainImage.url) {
  //   // If user is uploading new main image remove the previous one because we don't need that anymore
  //   removeLocalFile(product.mainImage.localPath);
  // }

  return res
    .status(200)
    .json(new ApiResponse(200, updatedProduct, "Product updated successfully"));
});

const getProductById = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const product = await Product.findById(productId).populate("colors");

  if (!product) {
    throw new ApiError(404, "Product does not exist");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, product, "Product fetched successfully"));
});

const getProductsByCategory = asyncHandler(async (req, res) => {
  const { categoryId } = req.params;

  const { page = 1, limit = 10 } = req.query;

  const category = await ProductCategory.findById(categoryId).select(
    "name _id"
  );

  if (!category) {
    throw new ApiError(404, "ProductCategory does not exist");
  }

  const productAggregate = Product.aggregate([
    {
      // match the products with provided category
      $match: {
        category: new mongoose.Types.ObjectId(categoryId),
      },
    },
  ]);

  const products = await Product.aggregatePaginate(
    productAggregate,
    getMongoosePaginationOptions({
      page,
      limit,
      customLabels: {
        totalDocs: "totalProducts",
        docs: "products",
      },
    })
  );

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { ...products, category },
        "Category products fetched successfully"
      )
    );
});

const removeProductSubImage = asyncHandler(async (req, res) => {
  const { productId, subImageId } = req.params;

  const product = await Product.findById(productId);

  // check for product existence
  if (!product) {
    throw new ApiError(404, "Product does not exist");
  }

  const updatedProduct = await Product.findByIdAndUpdate(
    productId,
    {
      $pull: {
        // pull an item from subImages with _id equals to subImageId
        subImages: {
          _id: new mongoose.Types.ObjectId(subImageId),
        },
      },
    },
    { new: true }
  );

  // retrieve the file object which is being removed
  const removedSubImage = product.subImages?.find((image) => {
    return image._id.toString() === subImageId;
  });

  if (removedSubImage) {
    // remove the file from file system as well
    removeLocalFile(removedSubImage.localPath);
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, updatedProduct, "Sub image removed successfully")
    );
});

const deleteProduct = asyncHandler(async (req, res) => {
  const { productId } = req.params;

  const product = await Product.findOneAndDelete({
    _id: productId,
    owner: req.user._id,
  });

  if (!product) {
    throw new ApiError(404, "Product does not exist");
  }

  // const productImages = [product.mainImage, ...product.subImages];

  // productImages.map((image) => {
  //   // remove images associated with the product that is being deleted
  //   removeLocalFile(image.localPath);
  // });

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { deletedProduct: product },
        "Product deleted successfully"
      )
    );
});

// Product Add or Remove from wishList
const addRemoveProductInWishList = asyncHandler(async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user._id;

    //check if the product exists
    const product = await Product.findById(productId);
    if (!product) {
      throw new ApiError(404, "Product not found");
    }

    //check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      throw new ApiError(404, "User not found");
    }

    //check if the product is already in the wishlist of the user

    const isProductInWishlist = user.wishlist.includes(productId);

    if (isProductInWishlist) {
      // If product is already in wishList, remove it
      user.wishlist.pull(productId);
    } else {
      // If product is not in wishList, add it
      user.wishlist.push(productId);
    }

    await user.save();

    return res
      .status(200)
      .json(
        new ApiResponse(200, user, "Product added to wishList successfully")
      );
  } catch (error) {
    throw new ApiError(400, error.message);
  }
});

/**
 * 
    reviews: {
      type: [
        {
          user: {
            type: Schema.Types.ObjectId,
            ref: "User",
          },
          rating: {
            type: Number,
            min: 1,
            max: 5,
            default: 5,
          },
          comment: String,
        },
      ],
      default: [],
    }
 */
const reviewsAndRating = asyncHandler(async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user._id;

    //check if the product exists
    const product = await Product.findById(productId);
    if (!product) {
      throw new ApiError(404, "Product not found");
    }

    //check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      throw new ApiError(404, "User not found");
    }

    const { rating, comment } = req.body;

    // check if the user has already reviewed the product if yes then update the review
    const alreadyReviewed = product.reviews.find(
      (review) => review.user.toString() === userId.toString()
    );

    if (alreadyReviewed) {
      // update the review
      alreadyReviewed.rating = Number(rating);
      alreadyReviewed.comment = comment;
    } else {
      // add the review
      const review = {
        user: userId,
        rating: Number(rating),
        comment,
      };

      product.reviews.push(review);
    }

    const totalReviews = product.reviews.length;
    const totalRating = product.reviews.reduce((acc, item) => {
      return item.rating + acc;
    }, 0);

    product.rating = totalRating / totalReviews;

    await product.save();

    return res
      .status(200)
      .json(new ApiResponse(200, product, "Review added successfully"));
  } catch (error) {
    throw new ApiError(400, error.message);
  }
});

// const uploadImages = asyncHandler(async (req, res) => {
//   try {
//     const { productId } = req.params;
//     const uploader = async (path) => await cloudinaryUploadImg(path, "Images");

//     const urls = [];
//     const files = req.files;
//     console.log("files inside the uploadImages controller", files);
//     for (const file of files) {
//       const { path } = file;
//       const newPath = await uploader(path);
//       urls.push(newPath);
//       removeLocalFile(path);
//       // fs.unlinkSync(path);
//     }
//     // // find the product by id and update it's subImages with the urls array values...
//     // const product = await Product.findById(productId);
//     // if (!product) {
//     //   throw new ApiError(404, "Product not found");
//     // }
//     // product.subImages = urls;
//     // await product.save();

//     const images = urls.map((url) => {
//       return { url };
//     });
//     res
//       .status(200)
//       .json(new ApiResponse(200, images, "Images uploaded successfully"));
//   } catch (error) {
//     throw new ApiError(400, error.message);
//   }
// });

const uploadImages = asyncHandler(async (req, res) => {
  try {
    // const { productId } = req.params;
    const uploader = async (path) => await cloudinaryUploadImg(path, "Images");

    const urls = [];
    const files = req.files;
    // console.log("files inside the uploadImages controller", files);
    for (const file of files) {
      const { path } = file;
      const newPath = await uploader(path);
      urls.push(newPath);
      removeLocalFile(path);
      // fs.unlinkSync(path);
    }
    // // find the product by id and update it's subImages with the urls array values...
    // const product = await Product.findById(productId);
    // if (!product) {
    //   throw new ApiError(404, "Product not found");
    // }
    // product.subImages = urls;
    // await product.save();
    // console.log("urls", urls);

    const images = urls.map((url) => {
      return { url };
    });
    console.log("images", images);

    // TODO:save the images in the database
    // const product = await Product.findById(productId);
    // if (!product) {
    //   throw new ApiError(404, "Product not found");
    // }
    // product.subImages = urls;
    // await product.save();
    const newFormedImages = {
      images: images,
    };
    res
      .status(200)
      .json(
        new ApiResponse(200, newFormedImages, "Images uploaded successfully")
      );
  } catch (error) {
    throw new ApiError(400, error.message);
  }
});

// 🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹
// const uploadImages = asyncHandler(async (req, res) => {
//   try {
//     const { productId } = req.params;
//     const uploader = async (path) => await cloudinaryUploadImg(path, "Images");

//     const urls = [];
//     const files = req.files;
//     // console.log("files inside the uploadImages controller", files);
//     for (const file of files) {
//       const { path } = file;
//       const newPath = await uploader(path);
//       urls.push(newPath);
//       removeLocalFile(path);
//       // fs.unlinkSync(path);
//     }
//     // // find the product by id and update it's subImages with the urls array values...
//     // const product = await Product.findById(productId);
//     // if (!product) {
//     //   throw new ApiError(404, "Product not found");
//     // }
//     // product.subImages = urls;
//     // await product.save();
//     // console.log("urls", urls);

//     const images = urls.map((url) => {
//       return { url };
//     });
//     console.log("images", images);

//     // TODO:save the images in the database
//     const product = await Product.findById(productId);
//     if (!product) {
//       throw new ApiError(404, "Product not found");
//     }
//     product.subImages = urls;
//     await product.save();

//     res
//       .status(200)
//       .json(new ApiResponse(200, product, "Images uploaded successfully"));
//   } catch (error) {
//     throw new ApiError(400, error.message);
//   }
// });

// 🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹

const deleteImages = asyncHandler(async (req, res) => {
  try {
    const { publicId } = req.params;
    // console.log("productId: ", productId);
    console.log("publicId: ", publicId);
    const deletedImage = await cloudinaryDeleteImg(publicId, "Images");

    console.log(deleteImages);
    // TODO: need to delete the images from the database -
    // as commited above why we need to delete the images from the database event if during uploading time we are storing urls from cludinary into in data base...?
    // answer - because we are storing the urls in the database not the images itself

    // fetch the remaining subimages from the database
    // const product = await Product.findById(productId);
    // if (!product) {
    //   throw new ApiError(404, "Product not found");
    // }
    // const remainingSubImages = product.subImages.filter(
    //   (image) => image.public_id !== publicId
    // );
    // product.subImages = remainingSubImages;
    // await product.save();

    res
      .status(200)
      .json(new ApiResponse(200, deletedImage, "Images deleted successfully"));
  } catch (error) {
    throw new ApiError(400, error.message);
  }
});

export {
  createProduct,
  getAllProducts,
  getProductById,
  // getProductsByCategory,
  updateProduct,
  deleteProduct,
  // removeProductSubImage,
  addRemoveProductInWishList,
  reviewsAndRating,
  uploadImages,
  deleteImages,
};
