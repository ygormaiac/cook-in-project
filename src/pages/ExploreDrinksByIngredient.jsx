import React, { useEffect, useState, useContext } from 'react';
import { useHistory as UseHistory } from 'react-router-dom';
import { Header, Footer } from '../components/index';
import MyConText from '../context/Context';

export default function ExploreDrinksByIngredient() {
  const [ingredients, setIngredientIndex] = useState('unfetched');
  const [fetched, setFetched] = useState(false);
  const { setIngredient } = useContext(MyConText);
  const history = UseHistory();

  const getIngredients = async () => {
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list')
      .then((res) => res.json());
    await setIngredientIndex(response.drinks);
    await setFetched(true);
  };

  const TWELVE = 12;

  function saveIngredientContext(ingredient) {
    setIngredient(ingredient);
    history.push('/bebidas');
  }

  function forEachFunc({ strIngredient1 }, index) {
    if (index < TWELVE) {
      return (
        <button
          type="button"
          onClick={ () => saveIngredientContext(strIngredient1) }
        >
          <div
            className="recipeCard"
            data-testid={ `${index}-ingredient-card` }
            key={ index }
          >
            <h4
              data-testid={ `${index}-card-name` }
            >
              { strIngredient1 }
            </h4>
            <img
              data-testid={ `${index}-card-img` }
              src={ `https://www.thecocktaildb.com/images/ingredients/${strIngredient1}-Small.png` }
              alt={ strIngredient1 }
            />
          </div>
        </button>
      );
    }
  }

  function createCards() {
    return ingredients.map((ingredient, index) => forEachFunc(ingredient, index));
  }

  useEffect(() => {
    getIngredients();
  }, []);

  return (
    <div>
      <Header title="Explorar Ingredientes" visibility={ false } />
      { fetched ? createCards() : <h1>Carregando...</h1>}
      <Footer />
    </div>
  );
}
