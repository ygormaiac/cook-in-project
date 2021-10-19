import React from 'react';
import { useLocation } from 'react-router-dom';
import EspecificRecipeProgress from '../components/EspecificRecipeProgress';

export default function EspecificDrinkProgress() {
  const { pathname } = useLocation();
  const id = pathname.split('/')[2];
  return (
    <EspecificRecipeProgress
      nameApi="thecocktaildb"
      id={ id }
      drinkOrMeals="drinks"
      imgAndTitle="Drink"
      food={ false }
      objType="bebida"
      localStorageObj="cocktails"
    />
  );
}
