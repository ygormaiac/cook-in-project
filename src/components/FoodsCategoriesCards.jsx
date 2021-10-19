import React, { useState, useContext, useEffect } from 'react';
import { Image, Grid, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import MyConText from '../context/Context';
import './RecipeCard.css';

const TWELVE = 12;

export default function FoodsCategoriesCards() {
  const [foodCategoy, setFoodCategory] = useState();
  const { categoryName } = useContext(MyConText);

  const fetchFoodCategories = async () => {
    const results = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`)
      .then((response) => response.json())
      .then((res) => [...res.meals]);

    setFoodCategory(results);
  };

  useEffect(() => {
    fetchFoodCategories();
  }, [categoryName]);

  useEffect(() => {
    fetchFoodCategories();
  }, []);

  const forEachFunc = ({
    strMeal, strMealThumb, idMeal }, index) => {
    if (index < TWELVE) {
      return (
        <Link to={ `/comidas/${idMeal}` }>
          <Grid columns={ 1 }>
            <Grid.Column>
              <Segment padded>
                <Image
                  fluid
                  label={ {
                    as: 'a',
                    color: 'black',
                    content: strMeal,
                    icon: 'spoon',
                    ribbon: true,
                    size: 'big',
                  } }
                  src={ strMealThumb }
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
      { (foodCategoy)
      && foodCategoy.map((element, index) => forEachFunc(element, index)) }
    </div>
  );
}
