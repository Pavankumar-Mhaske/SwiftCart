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


const colorOptions = [];
colorState.forEach((color, key) => {
  colorOptions.push({
    label: color.name,
    value: color._id,
  });
});