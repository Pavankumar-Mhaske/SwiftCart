import { Router } from "express";
import {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
  likeDisLikeBlog,
  uploadImages,
  deleteImages,
} from "../../controller/ecommerce/blog.controllers.js";
import {
  verifyPermission,
  verifyJWT,
} from "../../middlewares/auth.middlewares.js";
import { validate } from "../../validators/validate.js";
import { MAXIMUM_SUB_IMAGE_COUNT, UserRolesEnum } from "../../constants.js";
import {
  mongoIdPathVariableValidator,
  publicIdPathVariableValidator,
} from "../../validators/common/mongodb.validators.js";
import { blogImgResize, uploadPhoto } from "../../middlewares/uploadImages.js";
const router = Router();

router
  .route("/")
  .post(
    verifyJWT,
    verifyPermission([UserRolesEnum.ADMIN]),
    validate,
    createBlog
  )
  .get(validate, getAllBlogs);
/*
❗❗❗❗❗ 
    Remember - 
    More specific routes come before more general routes. 
    In your case, the /upload route is more specific than /:blogId, so it should be defined first.
❗❗❗❗❗
*/
router
  // .route("/upload/:productId") // we will receive productId in the url
  .route("/upload")
  .post(
    verifyJWT,
    verifyPermission([UserRolesEnum.ADMIN]),
    // mongoIdPathVariableValidator("blogId"),
    validate,
    uploadPhoto.array("images", 10),
    blogImgResize,
    uploadImages
  );

router
  .route("/delete/:publicId")
  .delete(
    verifyJWT,
    verifyPermission([UserRolesEnum.ADMIN]),
    publicIdPathVariableValidator("publicId"),
    validate,
    deleteImages
  );

router
  .route("/:blogId")
  .patch(
    mongoIdPathVariableValidator("blogId"),
    verifyJWT,
    verifyPermission([UserRolesEnum.ADMIN]),
    validate,
    updateBlog
  )
  .get(
    mongoIdPathVariableValidator("blogId"),
    // verifyJWT,
    // verifyPermission([UserRolesEnum.ADMIN]),
    validate,
    getBlogById
  )
  .delete(
    mongoIdPathVariableValidator("blogId"),
    verifyJWT,
    verifyPermission([UserRolesEnum.ADMIN]),
    validate,
    deleteBlog
  );

router
  .route("/like-dislike/:blogId")
  .post(
    mongoIdPathVariableValidator("blogId"),
    verifyJWT,
    verifyPermission([UserRolesEnum.ADMIN]),
    validate,
    likeDisLikeBlog
  );

export default router;
