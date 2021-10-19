import React, { useEffect, useState } from 'react';
import { Header } from '../components/index';
import RecipeCardDone from '../components/RecipeCardDone';

export default function DoneRecipes() {
  const [localStorageValue, setStorageValue] = useState([]);
  const [doneRecipesFiltered, setDoneRecipesFiltered] = useState();

  useEffect(() => {
    const toRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    setStorageValue(toRecipes);
    setDoneRecipesFiltered(toRecipes);
  }, []);

  function filterAllType(filter) {
    if (filter === 'comida') {
      return setDoneRecipesFiltered(localStorageValue
        .filter(({ type }) => type === 'comida'));
    }

    if (filter === 'bebida') {
      return setDoneRecipesFiltered(localStorageValue
        .filter(({ type }) => type === 'bebida'));
    }
    return setDoneRecipesFiltered(localStorageValue);
  }

  return (
    <>
      <Header title="Receitas Feitas" visibility={ false } />
      <div className="container-buttons">
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => filterAllType() }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ () => filterAllType('comida') }
        >
          Food
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => filterAllType('bebida') }
        >
          Drinks
        </button>
      </div>
      <div>
        {doneRecipesFiltered
        && <RecipeCardDone
          localStorageValue={ doneRecipesFiltered }
        />}
      </div>
    </>

  );
}
