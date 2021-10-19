import React from 'react';
import { useLocation } from 'react-router-dom';
import EspecificRecipeProgress from '../components/EspecificRecipeProgress';

export default function EspecificFoodProgress() {
  const { pathname } = useLocation();
  const id = pathname.split('/')[2];
  return (
    <EspecificRecipeProgress
      nameApi="themealdb"
      id={ id }
      drinkOrMeals="meals"
      imgAndTitle="Meal"
      objType="comida"
      food
      localStorageObj="meals"
    />
  );
}
