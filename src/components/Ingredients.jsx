import React from 'react';
import PropTypes from 'prop-types';

export default function Ingredients(props) {
  const { ingredientsList } = props;

  const mapIngredients = () => {
    const objectIngredients = Object.entries(ingredientsList);

    const ingredientsName = objectIngredients
      .filter((element) => element[0].includes('strIngredient'));

    const ingredientsQuantities = objectIngredients
      .filter((element) => element[0].includes('strMeasure'));

    const arrayIngredients = ingredientsName
      .map((ingredient, index) => [ingredient[1], ingredientsQuantities[index][1]]);

    return arrayIngredients;
  };

  return (
    <div>
      { mapIngredients().map((ingredient, index) => {
        if (ingredient[0]) {
          return (
            <p
              data-testid={ `${index}-ingredient-name-and-measure` }
              key={ index }
            >
              { `${ingredient[0]} - ${ingredient[1]}` }
            </p>
          );
        } return null;
      }) }
    </div>
  );
}

Ingredients.propTypes = ({
  ingredientsList: PropTypes.objectOf().isRequired,
});
