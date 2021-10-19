import React, { useState, useContext } from 'react';
import {
  Header,
  Search,
  Footer, Categories, RecipeCard, DrinksCategoriesCards } from '../components/index';
import RenderDrinks from '../components/RenderDrinks';
import MyConText from '../context/Context';

const THREE = 3;

export default function Drinks() {
  const [searchBar, setSearchBar] = useState(false);
  const { renderIndex } = useContext(MyConText);

  const headleSearchBar = () => {
    setSearchBar(!searchBar);
  };

  const conditionRender = () => {
    if (renderIndex === 1) {
      return (
        <RecipeCard
          nameApi="thecocktaildb"
          drinkOrMeals="drinks"
          imgAndTitle="Drink"
          linkMealOrDrink="bebidas"
        />);
    }

    if (renderIndex === 2) {
      return (<RenderDrinks />);
    }

    if (renderIndex === THREE) {
      return (<DrinksCategoriesCards />);
    }
  };

  return (
    <div>
      <Header
        id="bebidas"
        title="Bebidas"
        visibility
        headleSearchBar={ headleSearchBar }
      />

      { searchBar
        ? <Search /> : <Categories nameApi="thecocktaildb" drinkOrMeals="drinks" /> }
      { conditionRender() }
      <Footer />
    </div>
  );
}
