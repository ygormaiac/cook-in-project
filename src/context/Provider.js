import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MyConText from './Context';

function Provider({ children }) {
  const [mealState, setMealState] = useState({ meals: {} });
  const [urlCopy, setUrlCopy] = useState('');
  const [drinkState, setDrinkState] = useState({ drinks: {} });
  const [renderIndex, setRenderIndex] = useState(1);
  const [categoryName, setCategoryName] = useState('');
  const [ingredientIndex, setIngredientIndex] = useState(1);
  const [ingredient, setIngredient] = useState('');
  const [optionArea, setOptionArea] = useState('All');

  const alert = 'Sinto muito, não encontramos nenhuma receita para esses filtros.';

  const handleIngredientIndex = () => {
    setIngredientIndex(2);
  };

  const categoryNameTarget = (value) => {
    setCategoryName(value);
  };

  const FecthFood = (url) => {
    fetch(url)
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
        if (res.meals === null) {
          global.alert(alert);
        } else {
          setMealState(res);
          setRenderIndex(2);
        }
      });
  };

  const FecthDrink = (url) => {
    fetch(url)
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
        if (res.drinks === null) {
          global.alert(alert);
        } else {
          setDrinkState(res);
          setRenderIndex(2);
        }
      });
  };

  async function MealFunction() {
    if (document.getElementById('ingredient-search-radio').checked) {
      const ingrediente = document.getElementById('search').value;
      const url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingrediente}`;
      console.log('checked');
      FecthFood(url);
    } else if (document.getElementById('name-search-radio').checked) {
      const name = document.getElementById('search').value;
      const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`;
      FecthFood(url);
    } else if (document.getElementById('first-letter-search-radio').checked) {
      if (document.getElementById('search').value.length > 1) {
        global.alert('Sua busca deve conter somente 1 (um) caracter');
      } else {
        const fl = document.getElementById('search').value;
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${fl}`;
        FecthFood(url);
      }
    }
  }

  async function DrinkFunction() {
    if (document.getElementById('ingredient-search-radio').checked) {
      const ingrediente = document.getElementById('search').value;
      const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingrediente}`;
      FecthDrink(url);
    } else if (document.getElementById('name-search-radio').checked) {
      const name = document.getElementById('search').value;
      const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`;
      FecthDrink(url);
    } else if (document.getElementById('first-letter-search-radio').checked) {
      if (document.getElementById('search').value.length > 1) {
        global.alert('Sua busca deve conter somente 1 (um) caracter');
      } else {
        const fl = document.getElementById('search').value;
        const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${fl}`;
        FecthDrink(url);
      }
    }
  }

  async function FetchAPI() {
    if (document.getElementById('Comidas')) {
      MealFunction();
    } else if (document.getElementById('Bebidas')) {
      DrinkFunction();
    }
  }

  const Context = {
    FetchAPI,
    drinkState,
    mealState,
    setDrinkState,
    setMealState,
    renderIndex,
    setRenderIndex,
    categoryNameTarget,
    categoryName,
    ingredientIndex,
    handleIngredientIndex,
    urlCopy,
    setUrlCopy,
    ingredient,
    setIngredient,
    optionArea,
    setOptionArea,
  };

  return (
    <MyConText.Provider value={ Context }>
      { children }
    </MyConText.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
