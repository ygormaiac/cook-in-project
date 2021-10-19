import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { RecommendedRecipes,
  ButtonStartRecipe } from '../components/index';
import '../components/Footer.css';
import MyConText from '../context/Context';
import EspecificRecipe from '../components/EspecificRecipe';
import '../components/RecipeCard.css';

export default function EspecificFood() {
  const [controlButton, setControlButton] = useState(1);
  const { pathname } = useLocation();
  const id = pathname.split('/')[2];
  const { ingredientIndex } = useContext(MyConText);
  const [displayButton, setDisplayButton] = useState('displayInBlock');

  const handleButtonsContinueAndStart = () => {
    const getLocalStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));

    if (getLocalStorage) {
      const mealsObj = getLocalStorage.meals;
      if (mealsObj) {
        const verifyIdInMails = mealsObj[id];
        if (verifyIdInMails) {
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
        nameApi="themealdb"
        id={ id }
        drinkOrMeals="meals"
        imgAndTitle="Meal"
        objType="comida"
        food
      />
      {(ingredientIndex === 1) && <RecommendedRecipes
        nameApi="thecocktaildb"
        drinkOrMeals="drinks"
        imgAndTitle="Drink"
        linkMealOrDrink="bebidas"
      />}
      <ButtonStartRecipe
        id={ id }
        localstorage="meals"
        linkMealOrDrink="comidas"
        controlButton={ controlButton }
        classNameButton={ displayButton }
      />
    </div>
  );
}
