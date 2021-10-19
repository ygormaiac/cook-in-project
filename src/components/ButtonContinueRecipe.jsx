import React from 'react';
import { useHistory as UseHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function ButtonContinueRecipe(props) {
  const history = UseHistory();
  const { id, linkMealOrDrink } = props;

  const redirectInProgress = () => {
    history.push(`/${linkMealOrDrink}/${id}/in-progress`);
  };

  return (
    <button
      type="button"
      data-testid="start-recipe-btn"
      className="footer"
      onClick={ redirectInProgress }
    >
      Continuar Receita
    </button>
  );
}

ButtonContinueRecipe.propTypes = ({
  id: PropTypes.string.isRequired,
  linkMealOrDrink: PropTypes.string.isRequired,
});
