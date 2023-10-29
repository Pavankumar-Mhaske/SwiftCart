import { Router } from "express";
import {
  addItemOrUpdateItemQuantity,
  clearCart,
  getUserCart,
  removeItemFromCart,
} from "../../controller/ecommerce/cart.controllers.js";
import { verifyJWT } from "../../middlewares/auth.middlewares.js";
import { addItemOrUpdateItemQuantityValidator } from "../../validators/ecommerce/cart.validators.js";
import { validate } from "../../validators/validate.js";
import { mongoIdPathVariableValidator } from "../../validators/common/mongodb.validators.js";

const router = Router();

router.use(verifyJWT);

router.route("/").get(getUserCart);

router.route("/clear").delete(clearCart);

router
  .route("/item/:productId")
  .post(
    mongoIdPathVariableValidator("productId"),
    addItemOrUpdateItemQuantityValidator(),
    validate,
    addItemOrUpdateItemQuantity
  )
  .delete(
    mongoIdPathVariableValidator("productId"),
    validate,
    removeItemFromCart
  );

export default router;
