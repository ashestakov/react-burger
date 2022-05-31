import PropTypes from "prop-types";

export const ingredientType = PropTypes.shape(
  {
    name: PropTypes.string,
    price: PropTypes.number,
    type: PropTypes.string
  }
)

export const ingredientWithNutritionFactsType = PropTypes.shape({
  name: PropTypes.string,
  image_large: PropTypes.string,
  proteins: PropTypes.number,
  fat: PropTypes.number,
  carbohydrates: PropTypes.number,
  calories: PropTypes.number
})