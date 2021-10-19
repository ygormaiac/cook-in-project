import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import './RecipeCard.css';
import { Link } from 'react-router-dom';
import { Image, Grid, Label, Segment } from 'semantic-ui-react';
import MyConText from '../context/Context';

const TWELVE = 12;
const URL_AREA = 'https://www.themealdb.com/api/json/v1/1/filter.php?a=';

export default function RecipeCard(props) {
  const [recipeCardList, setRecipeCardList] = useState([]);
  const { nameApi, imgAndTitle, linkMealOrDrink, drinkOrMeals } = props;
  const { ingredient, optionArea } = useContext(MyConText);

  const fetchCategories = async () => {
    if (ingredient) {
      const results = await fetch(`https://www.${nameApi}.com/api/json/v1/1/filter.php?i=${ingredient}`)
        .then((response) => (response.json()))
        .then((res) => res[drinkOrMeals]);
      setRecipeCardList([...results]);
    } else if (optionArea === 'All') {
      const results = await fetch(`https://www.${nameApi}.com/api/json/v1/1/search.php?s=`)
        .then((response) => response.json())
        .then((res) => res[drinkOrMeals]);

      setRecipeCardList([...results]);
    } else if (optionArea !== 'All') {
      console.log('entrei aqui');
      const results = await fetch(`${URL_AREA}${optionArea}`)
        .then((response) => response.json())
        .then((res) => res[drinkOrMeals]);

      setRecipeCardList([...results]);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [optionArea, ingredient]);

  const forEachFunc = (recipeCard, index) => {
    const id = recipeCard[`id${imgAndTitle}`];
    if (index < TWELVE) {
      return (
        <Link to={ `/${linkMealOrDrink}/${id}` }>
          <Grid columns={ 1 }>
            <Grid.Column>
              <Segment padded compact>
                {recipeCard.strArea !== undefined ? (
                  <Label
                    attached="bottom"
                    size="big"
                    horizontal
                    alignment
                  >
                    {`${recipeCard.strArea}`}

                  </Label>)
                  : (
                    <Label
                      attached="bottom"
                      size="big"
                      horizontal
                      alignment
                    >
                      {`${recipeCard.strAlcoholic}`}

                    </Label>
                  )}
                <Image
                  fluid
                  label={ {
                    as: 'a',
                    color: 'black',
                    content: recipeCard[`str${imgAndTitle}`],
                    icon: 'spoon',
                    ribbon: true,
                    size: 'big',
                  } }
                  src={ recipeCard[`str${imgAndTitle}Thumb`] }
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
      { recipeCardList.map(forEachFunc) }
    </div>
  );
}

RecipeCard.propTypes = ({
  nameApi: PropTypes.string.isRequired,
  drinkOrMeals: PropTypes.string.isRequired,
  imgAndTitle: PropTypes.string.isRequired,
  linkMealOrDrink: PropTypes.string.isRequired,
});
