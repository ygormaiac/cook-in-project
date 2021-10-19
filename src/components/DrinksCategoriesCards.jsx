import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Image, Grid, Segment } from 'semantic-ui-react';
import MyConText from '../context/Context';
import './RecipeCard.css';

const TWELVE = 12;

export default function DrinksCategoriesCards() {
  const [drinkCategoy, setDrinkCategory] = useState();
  const { categoryName } = useContext(MyConText);

  const fetchFoodCategories = async () => {
    const results = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${categoryName}`)
      .then((response) => response.json())
      .then((res) => [...res.drinks]);

    setDrinkCategory(results);
  };

  useEffect(() => {
    fetchFoodCategories();
  }, [categoryName]);

  useEffect(() => {
    fetchFoodCategories();
  }, []);

  const forEachFunc = ({ strDrink, strDrinkThumb, idDrink }, index) => {
    if (index < TWELVE) {
      return (
        <Link to={ `/bebidas/${idDrink}` }>
          <Grid columns={ 1 }>
            <Grid.Column>
              <Segment padded>
                <Image
                  fluid
                  label={ {
                    as: 'a',
                    color: 'black',
                    content: strDrink,
                    icon: 'spoon',
                    ribbon: true,
                    size: 'big',
                  } }
                  src={ strDrinkThumb }
                />
              </Segment>
            </Grid.Column>
          </Grid>
        </Link>
      );
    }
  };

  return (
    <div className="recipe-card-container">
      { (drinkCategoy)
      && drinkCategoy.map((element, index) => forEachFunc(element, index)) }
    </div>
  );
}
