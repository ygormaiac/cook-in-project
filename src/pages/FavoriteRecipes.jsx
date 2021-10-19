import React, { useState, useEffect } from 'react';
import FavoriteRecipeCard from '../components/FavoriteRecipeCard';
import { Header } from '../components/index';

export default function FavoriteRecipes() {
  const [localStorageValue, setLocalStorageValue] = useState([]);
  const [favoriteRecipes, setFavoriteRecipes] = useState();

  useEffect(() => {
    const toRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    console.log(toRecipes);
    setLocalStorageValue(toRecipes);
    setFavoriteRecipes(toRecipes);
  }, []);

  function filterAllType(filter) {
    if (filter === 'comida') {
      return setFavoriteRecipes(localStorageValue
        .filter(({ type }) => type === 'comida'));
    }

    if (filter === 'bebida') {
      return setFavoriteRecipes(localStorageValue
        .filter(({ type }) => type === 'bebida'));
    }
    return setFavoriteRecipes(localStorageValue);
  }

  const removeRecipes = (nameRecipe) => {
    const favRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));

    const filteredRecipe = favRecipes.filter(({ name }) => name !== nameRecipe);
    setFavoriteRecipes(filteredRecipe);
    localStorage.setItem('favoriteRecipes', JSON.stringify(filteredRecipe));
  };

  return (
    <>
      <Header title="Receitas Favoritas" visibility={ false } />
      <div>
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
      </div>
      <div>
        <FavoriteRecipeCard
          localStorageValue={ favoriteRecipes }
          removeRecipes={ removeRecipes }
        />
      </div>
    </>
  );
}
