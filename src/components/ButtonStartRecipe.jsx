import React, { useEffect } from 'react';
import { useHistory as UseHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function ButtonStartRecipe(props) {
  const history = UseHistory();
  const { id, localstorage, linkMealOrDrink, controlButton, classNameButton } = props;

  const redirectInProgress = () => {
    history.push(`/${linkMealOrDrink}/${id}/in-progress`);
    const getLocalStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));

    if (controlButton === 1) {
      if (getLocalStorage === null) {
        localStorage.setItem('inProgressRecipes', JSON.stringify({
          [localstorage]: {
            [id]: [],
          },
        }));
      } else {
        localStorage.setItem('inProgressRecipes', JSON.stringify(
          { ...getLocalStorage,
            [localstorage]: {
              ...getLocalStorage[localstorage],
              [id]: [],
            },
          },
        ));
      }
    }
  };

  const handleTextButton = () => {
    if (controlButton === 2) {
      // (document.getElementById('start-button').textContent('teste'));
      const buttonElement = document.querySelector('#start-button');
      buttonElement.textContent = 'Continuar Receita';
    }
  };

  useEffect(() => {
    handleTextButton();
  }, [controlButton]);

  return (
    <button
      type="button"
      data-testid="start-recipe-btn"
      id="start-button"
      className={ `footer ${classNameButton} button-start` }
      onClick={ redirectInProgress }
    >
      Iniciar Receita
    </button>
  );
}

ButtonStartRecipe.propTypes = ({
  id: PropTypes.string.isRequired,
  localstorage: PropTypes.string.isRequired,
  linkMealOrDrink: PropTypes.string.isRequired,
  controlButton: PropTypes.number.isRequired,
  classNameButton: PropTypes.string.isRequired,
});
