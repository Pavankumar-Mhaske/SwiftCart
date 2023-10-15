import { Router } from "express";
import {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
  likeDisLikeBlog,
} from "../../controller/ecommerce/blog.controllers.js";
import {
  verifyPermission,
  verifyJWT,
} from "../../middlewares/auth.middlewares.js";
import { validate } from "../../validators/validate.js";
import { MAXIMUM_SUB_IMAGE_COUNT, UserRolesEnum } from "../../constants.js";
import { mongoIdPathVariableValidator } from "../../validators/common/mongodb.validators.js";
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

router
  .route("/:blogId")
  .patch(
    mongoIdPathVariableValidator("blogId"),
    verifyJWT,
    verifyPermission([UserRolesEnum.ADMIN]),
    validate,
    updateBlog
  )
  .post(
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
