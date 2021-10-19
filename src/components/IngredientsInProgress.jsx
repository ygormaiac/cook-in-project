import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './RecipeCard.css';

const FIVE_HUNDRED = 500;

export default function IngredientsInProgress(props) {
  const [controlLocalStorage, setControlLocalStorage] = useState(false);
  const { ingredientsList,
    setIgredientChecked,
    setIgredientCheckedLenght, ingredientChecked, localStorageObj, id } = props;

  const mapIngredientsInProgress = () => {
    const objectIngredients = Object.entries(ingredientsList);

    const ingredientsName = objectIngredients
      .filter((element) => element[0].includes('strIngredient'));

    const ingredientsQuantities = objectIngredients
      .filter((element) => element[0].includes('strMeasure'));

    const arrayIngredients = ingredientsName
      .map((ingredient, index) => [ingredient[1], ingredientsQuantities[index][1]]);

    return arrayIngredients;
  };

  const ingredientsInProgressLength = (mapIngredientsInProgress()
    .filter((ingredient) => {
      if (ingredient[0]) {
        return ingredient[0];
      }
      return null;
    }));

  const handleClassName = ({ target }) => {
    if (target.checked) {
      target.parentElement.className = 'scratched';

      const getLocalStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
      localStorage.setItem('inProgressRecipes',
        JSON.stringify({
          ...getLocalStorage,
          [localStorageObj]: {
            ...getLocalStorage[localStorageObj],
            [id]: [...getLocalStorage[localStorageObj][id], target.id],
          },
        }));
      setControlLocalStorage(!controlLocalStorage);
      setIgredientCheckedLenght(ingredientsInProgressLength.length);
      setIgredientChecked([...ingredientChecked, target.value]);
    } else {
      target.parentElement.classList.remove('scratched');
      const getLocalStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
      const arrayIds = getLocalStorage[localStorageObj][id];
      const arrayIdsFiltered = arrayIds.filter((element) => element !== target.id);

      localStorage.setItem('inProgressRecipes',
        JSON.stringify({
          ...getLocalStorage,
          [localStorageObj]: {
            ...getLocalStorage[localStorageObj],
            [id]: arrayIdsFiltered,
          },
        }));
      const arrayFiltered = ingredientChecked
        .filter((element) => element !== target.value);
      setIgredientChecked([...arrayFiltered]);
    }
  };

  const ingredientsInProgress = () => {
    const getItemLocalStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const getObjectMealOrDrink = getItemLocalStorage[localStorageObj];
    const arrayIds = getObjectMealOrDrink[id];

    if (arrayIds) {
      arrayIds.map((idIngredient) => {
        const teste = document.getElementById(idIngredient);

        if (teste) {
          teste.parentElement.classList.add('scratched');
          teste.checked = true;
          teste.setAttribute('checked', 'checked');
        } return null;
      });
    }
  };

  setTimeout(() => {
    ingredientsInProgress();
  }, FIVE_HUNDRED);

  return (
    <div>
      { mapIngredientsInProgress().map((ingredient, index) => {
        if (ingredient[0]) {
          return (
            <div className="input-checkbok">
              <label
                htmlFor={ ingredient[0] }
                key={ index }
                data-testid={ `${index}-ingredient-step` }
              >
                <input
                  type="checkbox"
                  id={ ingredient[0] }
                  value={ ingredient[0] }
                  onClick={ (event) => handleClassName(event) }
                />
                <span />
                { `${ingredient[0]} - ${ingredient[1]}` }
              </label>
            </div>
          );
        } return null;
      }) }
    </div>
  );
}

IngredientsInProgress.propTypes = ({
  ingredientsList: PropTypes.objectOf().isRequired,
  setIgredientChecked: PropTypes.func.isRequired,
  setIgredientCheckedLenght: PropTypes.func.isRequired,
  ingredientChecked: PropTypes.string.isRequired,
  localStorageObj: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
});
