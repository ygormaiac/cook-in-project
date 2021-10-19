import React, { useState, useContext } from 'react';
import {
  Header,
  Search,
  Footer, Categories, RecipeCard, FoodsCategoriesCards } from '../components/index';
import RenderFoods from '../components/RenderFoods';
import MyConText from '../context/Context';

const THREE = 3;

export default function Foods() {
  const [searchBar, setSearchBar] = useState(false);
  const { renderIndex } = useContext(MyConText);

  const headleSearchBar = () => {
    setSearchBar(!searchBar);
  };

  const conditionRender = () => {
    if (renderIndex === 1) {
      return (
        <RecipeCard
          nameApi="themealdb"
          drinkOrMeals="meals"
          imgAndTitle="Meal"
          linkMealOrDrink="comidas"
        />);
    }

    if (renderIndex === 2) {
      return (<RenderFoods />);
    }

    if (renderIndex === THREE) {
      return (<FoodsCategoriesCards />);
    }
  };

  return (
    <div>
      <Header
        title="Comidas"
        visibility
        headleSearchBar={ headleSearchBar }
      />

      { searchBar ? <Search /> : <Categories nameApi="themealdb" drinkOrMeals="meals" /> }
      { conditionRender() }
      <Footer />
    </div>
  );
}
