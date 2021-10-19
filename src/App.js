import React from 'react';
import './App.css';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import {
  Login,
  Foods,
  Drinks,
  EspecificDrink,
  EspecificFood,
  EspecificFoodProgress,
  ExploreAll,
  ExploreFoods,
  ExploreDrinks,
  ExploreFoodsByIngredient,
  ExploreDrinksByIngredient,
  ExploreFoodByOrigin,
  User,
  DoneRecipes,
  FavoriteRecipes,
  EspecificDrinkProgress,
  NotFound } from './pages';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route
          exact
          path="/comidas/:id/in-progress"
          component={ EspecificFoodProgress }
        />
        <Route
          exact
          path="/bebidas/:id/in-progress"
          component={ EspecificDrinkProgress }
        />
        <Route path="/comidas/:id" component={ EspecificFood } />
        <Route path="/bebidas/:id" component={ EspecificDrink } />
        <Route path="/bebidas" component={ Drinks } />
        <Route path="/comidas" component={ Foods } />
        <Route exact path="/comidas" component={ Foods } />
        <Route exact path="/bebidas" component={ Drinks } />
        <Route exact path="/explorar" component={ ExploreAll } />
        <Route exact path="/explorar/comidas" component={ ExploreFoods } />
        <Route exact path="/explorar/bebidas" component={ ExploreDrinks } />
        <Route
          exact
          path="/explorar/comidas/ingredientes"
          component={ ExploreFoodsByIngredient }
        />
        <Route
          exact
          path="/explorar/bebidas/ingredientes"
          component={ ExploreDrinksByIngredient }
        />
        <Route exact path="/explorar/comidas/area" component={ ExploreFoodByOrigin } />
        <Route exact path="/perfil" component={ User } />
        <Route exact path="/receitas-feitas" component={ DoneRecipes } />
        <Route exact path="/receitas-favoritas" component={ FavoriteRecipes } />
        <Route component={ NotFound } />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
