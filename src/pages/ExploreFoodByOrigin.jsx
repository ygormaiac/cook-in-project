import React from 'react';
import { Header, Footer, DropDownArea, RecipeCard } from '../components/index';

export default function ExploreFoodsByOrigin() {
  return (
    <div>
      <Header title="Explorar Origem" visibility />
      <DropDownArea />
      <RecipeCard
        nameApi="themealdb"
        drinkOrMeals="meals"
        imgAndTitle="Meal"
        linkMealOrDrink="comidas"
      />
      <Footer />
    </div>
  );
}
