import React, { useEffect, useState, useContext } from 'react';
import { useHistory as UseHistory } from 'react-router-dom';
import { Header, Footer } from '../components/index';
import MyConText from '../context/Context';

export default function ExploreFoodsByIngredient() {
  const [ingredients, setIngredientIndex] = useState('unfetched');
  const [fetched, setFetched] = useState(false);
  const { setIngredient } = useContext(MyConText);
  const history = UseHistory();

  const getIngredients = async () => {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list')
      .then((res) => res.json());
    await setIngredientIndex(response.meals);
    await setFetched(true);
  };

  const TWELVE = 12;

  function saveIngredientContext(ingredient) {
    setIngredient(ingredient);
    history.push('/comidas');
  }

  function forEachFunc({ strIngredient }, index) {
    if (index < TWELVE) {
      return (
        <button
          type="button"
          onClick={ () => saveIngredientContext(strIngredient) }
        >
          <div
            className="recipeCard"
            data-testid={ `${index}-ingredient-card` }
            key={ index }
            value={ strIngredient }
          >
            <h4
              data-testid={ `${index}-card-name` }
            >
              { strIngredient }
            </h4>
            <img
              data-testid={ `${index}-card-img` }
              src={ `https://www.themealdb.com/images/ingredients/${strIngredient}-Small.png` }
              alt={ strIngredient }
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
