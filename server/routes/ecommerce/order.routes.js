import { Router } from "express";
import {
  generatePaypalOrder,
  generateRazorpayOrder,
  verifyPaypalPayment,
  verifyRazorpayPayment,
  updateOrderStatus,
  getOrderById,
  getOrderListAdmin,
  generateCashOnDeliveryOrder,
  updateCashOnDeliveryOrderStatus,
} from "../../controller/ecommerce/order.controllers.js";
import {
  verifyPermission,
  verifyJWT,
} from "../../middlewares/auth.middlewares.js";
import {
  orderUpdateStatusValidator,
  verifyPaypalPaymentValidator,
  verifyRazorpayPaymentValidator,
} from "../../validators/ecommerce/order.validators.js";
import { validate } from "../../validators/validate.js";
import { UserRolesEnum } from "../../constants.js";
import {
  mongoIdPathVariableValidator,
  mongoIdRequestBodyValidator,
} from "../../validators/common/mongodb.validators.js";

const router = Router();

router.use(verifyJWT);

router
  .route("/provider/razorpay")
  .post(
    mongoIdRequestBodyValidator("addressId"),
    validate,
    generateRazorpayOrder
  );

router
  .route("/provider/paypal")
  .post(
    mongoIdRequestBodyValidator("addressId"),
    validate,
    generatePaypalOrder
  );

router
  .route("/provider/cod")
  .post(
    mongoIdRequestBodyValidator("addressId"),
    validate,
    generateCashOnDeliveryOrder
  );

router
  .route("/provider/razorpay/verify-payment")
  .post(verifyRazorpayPaymentValidator(), validate, verifyRazorpayPayment);

router
  .route("/provider/paypal/verify-payment")
  .post(verifyPaypalPaymentValidator(), validate, verifyPaypalPayment);

router
  .route("/list/admin")
  .get(verifyPermission([UserRolesEnum.ADMIN]), getOrderListAdmin);

router
  .route("/:orderId")
  .get(mongoIdPathVariableValidator("orderId"), validate, getOrderById);

router
  .route("/status/:orderId")
  .patch(
    verifyPermission([UserRolesEnum.ADMIN]),
    mongoIdPathVariableValidator("orderId"),
    orderUpdateStatusValidator(),
    validate,
    updateOrderStatus
  );

router
  .route("/cod-status/:orderId")
  .patch(
    verifyPermission([UserRolesEnum.ADMIN]),
    mongoIdPathVariableValidator("orderId"),
    orderUpdateStatusValidator(),
    validate,
    updateCashOnDeliveryOrderStatus
  );

export default router;
