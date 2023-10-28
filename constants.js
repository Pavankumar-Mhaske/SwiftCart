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
  YELLOW: "YELLOW",
  PURPLE: "PURPLE",
  ORANGE: "ORANGE",
  PINK: "PINK",
  GRAY: "GRAY",
  BROWN: "BROWN",
  SILVER: "SILVER",
  GOLD: "GOLD",
  TEAL: "TEAL",
  CYAN: "CYAN",
  LIME: "LIME",
  MAGENTA: "MAGENTA",
  INDIGO: "INDIGO",
  LAVENDER: "LAVENDER",
  TURQUOISE: "TURQUOISE",
  PLUM: "PLUM",
  OLIVE: "OLIVE",
  MAROON: "MAROON",
  NAVY: "NAVY",
  TAN: "TAN",
  AQUA: "AQUA",
  BEIGE: "BEIGE",
  CORAL: "CORAL",
  CHOCOLATE: "CHOCOLATE",
  CHARCOAL: "CHARCOAL",
  BRONZE: "BRONZE",
  COPPER: "COPPER",
  CRIMSON: "CRIMSON",
  IVORY: "IVORY",
  KHAKI: "KHAKI",
  MAUVE: "MAUVE",
  SEPIA: "SEPIA",
  VIOLET: "VIOLET",
  LILAC: "LILAC",
  GRASS_GREEN: "GRASS_GREEN",
  SKY_BLUE: "SKY_BLUE",
  SUNSET_ORANGE: "SUNSET_ORANGE",
  LEMON_YELLOW: "LEMON_YELLOW",
  RUBY_RED: "RUBY_RED",
  PEACH: "PEACH",
  ROSE: "ROSE",
  PLATINUM: "PLATINUM",
  LAVENDER_BLUE: "LAVENDER_BLUE",
  MINT_GREEN: "MINT_GREEN",
  STEEL_GRAY: "STEEL_GRAY",
  MANGO: "MANGO",
  OLIVE_GREEN: "OLIVE_GREEN",
  BURGUNDY: "BURGUNDY",
  EGGPLANT: "EGGPLANT",
  PERIWINKLE: "PERIWINKLE",
  SAFFRON: "SAFFRON",
  COBALT_BLUE: "COBALT_BLUE",
  MAHOGANY: "MAHOGANY",
  RUST: "RUST",
  BEETROOT: "BEETROOT",
  CANARY_YELLOW: "CANARY_YELLOW",
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

export const ProductTagsEnum = {
  HOT: "HOT",
  POPULAR: "POPULAR",
  NEW: "NEW",
  FEATURED: "FEATURED",
  TOP_RATED: "TOP_RATED",
  SALE: "SALE",
  BEST_SELLER: "BEST_SELLER",
  CLEARANCE: "CLEARANCE",
  LIMITED_STOCK: "LIMITED_STOCK",
  TRENDING: "TRENDING",
  SPECIAL_OFFER: "SPECIAL_OFFER",
  HOLIDAY: "HOLIDAY",
  BACK_IN_STOCK: "BACK_IN_STOCK",
  EXCLUSIVE: "EXCLUSIVE",
  DISCOUNTED: "DISCOUNTED",
  PRE_ORDER: "PRE_ORDER",
  CUSTOM: "CUSTOM",
  HANDMADE: "HANDMADE",
  ORGANIC: "ORGANIC",
  VEGAN: "VEGAN",
  SUSTAINABLE: "SUSTAINABLE",
  ETHICAL: "ETHICAL",
  LOCAL: "LOCAL",
  RECYCLABLE: "RECYCLABLE",
};

export const AvailableProductTags = Object.values(ProductTagsEnum);

export const ProductCategoryEnum = {
  ELECTRONICS: "ELECTRONICS",
  FOOD: "FOOD",
  AUTOMOBILES: "AUTOMOBILES",
  APPAREL: "APPAREL",
  FOOTWEAR: "FOOTWEAR",
  HOME_AND_GARDEN: "HOME_AND_GARDEN",
  BEAUTY_AND_PERSONAL_CARE: "BEAUTY_AND_PERSONAL_CARE",
  HEALTH_AND_WELLNESS: "HEALTH_AND_WELLNESS",
  SPORTS_AND_OUTDOORS: "SPORTS_AND_OUTDOORS",
  BOOKS_AND_MEDIA: "BOOKS_AND_MEDIA",
  TOYS_AND_GAMES: "TOYS_AND_GAMES",
  JEWELRY_AND_ACCESSORIES: "JEWELRY_AND_ACCESSORIES",
  FURNITURE: "FURNITURE",
  PET_SUPPLIES: "PET_SUPPLIES",
  OFFICE_SUPPLIES: "OFFICE_SUPPLIES",
  MUSIC_AND_MUSICAL_INSTRUMENTS: "MUSIC_AND_MUSICAL_INSTRUMENTS",
  ART_AND_CRAFT_SUPPLIES: "ART_AND_CRAFT_SUPPLIES",
  BABY_AND_MATERNITY: "BABY_AND_MATERNITY",
  INDUSTRIAL_AND_SCIENTIFIC: "INDUSTRIAL_AND_SCIENTIFIC",
  TRAVEL_AND_LUGGAGE: "TRAVEL_AND_LUGGAGE",
  GENERAL: "GENERAL",
};

export const AvailableProductCategories = Object.values(ProductCategoryEnum);

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

/**
 * @type {{ PENDING: "PENDING"; CANCELLED: "CANCELLED"; DELIVERED: "DELIVERED" } as const}
 */
export const OrderStatusEnum = {
  PENDING: "PENDING",
  CANCELLED: "CANCELLED",
  DELIVERED: "DELIVERED",
};

export const AvailableOrderStatuses = Object.values(OrderStatusEnum);

/**
 * @type {{ UNKNOWN:"UNKNOWN"; RAZORPAY: "RAZORPAY"; PAYPAL: "PAYPAL"; } as const}
 */
export const PaymentProviderEnum = {
  UNKNOWN: "UNKNOWN",
  RAZORPAY: "RAZORPAY",
  PAYPAL: "PAYPAL",
  COD: "COD",
};

export const paypalBaseUrl = {
  sandbox: "https://api-m.sandbox.paypal.com",
};

export const AvailablePaymentProviders = Object.values(PaymentProviderEnum);

/**
 * @type {{ GOOGLE: "GOOGLE"; GITHUB: "GITHUB"; EMAIL_PASSWORD: "EMAIL_PASSWORD"} as const}
 */
export const UserLoginType = {
  GOOGLE: "GOOGLE",
  GITHUB: "GITHUB",
  EMAIL_PASSWORD: "EMAIL_PASSWORD",
};
export const AvailableSocialLogins = Object.values(UserLoginType);
