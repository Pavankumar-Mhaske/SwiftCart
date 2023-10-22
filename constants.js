/**
 * @type {{ ADMIN: "ADMIN"; USER: "USER"} as const}
 */
export const UserRolesEnum = {
  ADMIN: "ADMIN",
  USER: "USER",
};
export const AvailableUserRoles = Object.values(UserRolesEnum);

export const ProductColorsEnum = {
  RED: "RED",
  GREEN: "GREEN",
  BLUE: "BLUE",
  BLACK: "BLACK",
  WHITE: "WHITE",
};
export const AvailableProductColors = Object.values(ProductColorsEnum);

export const ProductBrandsEnum = {
  APPLE: "APPLE",
  LENOVO: "LENOVO",
  SAMSUNG: "SAMSUNG",
  MI: "MI",
  TESLA: "TESLA",
};
export const AvailableProductBrands = Object.values(ProductBrandsEnum);

export const DB_NAME = "ecommerce";

export const USER_TEMPORARY_TOKEN_EXPIRY = 20 * 60 * 1000; // 20 minutes

export const MAXIMUM_SUB_IMAGE_COUNT = 10;

/**
 * @type {{ FLAT:"FLAT"; } as const}
 */
export const CouponTypeEnum = {
  FLAT: "FLAT",
  PERCENTAGE: "PERCENTAGE",
};

export const AvailableCouponTypes = Object.values(CouponTypeEnum);
