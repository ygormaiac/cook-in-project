import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { RecommendedRecipes,
  ButtonStartRecipe } from '../components/index';
import '../components/Footer.css';
import EspecificRecipe from '../components/EspecificRecipe';

export default function EspecificDrink() {
  const { pathname } = useLocation();
  const [controlButton, setControlButton] = useState(1);
  const id = pathname.split('/')[2];
  const [displayButton, setDisplayButton] = useState('displayInBlock');

  const handleButtonsContinueAndStart = () => {
    const getLocalStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));

    if (getLocalStorage) {
      const cocktailsObj = getLocalStorage.cocktails;
      if (cocktailsObj) {
        const verifyIdInCocktails = cocktailsObj[id];
        if (verifyIdInCocktails) {
          setControlButton(2);
        }
      }
    }
  };

  const handleRecipeDone = () => {
    const getLocalStorage = JSON.parse(localStorage.getItem('doneRecipes'));
    if (getLocalStorage) {
      const findId = getLocalStorage.find((recipe) => recipe.id === id);
      if (findId) {
        setDisplayButton('displayNone');
      }
    }
  };

  useEffect(() => {
    handleButtonsContinueAndStart();
    handleRecipeDone();
  }, []);

  return (
    <div>
      <EspecificRecipe
        nameApi="thecocktaildb"
        id={ id }
        drinkOrMeals="drinks"
        imgAndTitle="Drink"
        objType="bebida"
        food={ false }
      />
      <RecommendedRecipes
        nameApi="themealdb"
        drinkOrMeals="meals"
        imgAndTitle="Meal"
        linkMealOrDrink="comidas"
      />
      <ButtonStartRecipe
        id={ id }
        localstorage="cocktails"
        linkMealOrDrink="bebidas"
        controlButton={ controlButton }
        classNameButton={ displayButton }
      />
    </div>
  );
}
