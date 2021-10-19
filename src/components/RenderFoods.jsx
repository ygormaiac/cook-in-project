import React, { useContext, useEffect } from 'react';
import { useHistory as UseHistory, Link } from 'react-router-dom';
import { Image, Grid, Segment } from 'semantic-ui-react';
import MyConText from '../context/Context';
import './RecipeCard.css';

const TWELVE = 12;
export default function RenderFoods() {
  const { mealState } = useContext(MyConText);
  const history = UseHistory();

  useEffect(() => {
    const pushe = (comidas = mealState) => {
      if (mealState.meals.length === 1) {
        history.push(`/comidas/${comidas.meals[0].idMeal}`);
      } else {
        return null;
      }
    };

    pushe();
  }, [mealState, history]);

  const forEachFunc = ({ strMeal, strMealThumb, idMeal }, index) => {
    if (index < TWELVE) {
      return (
        <Link to={ `/comidas/${idMeal}` }>
          <Grid columns={ 1 }>
            <Grid.Column>
              <Segment padded compact>
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
          {/* <div
            className="recipeCard"
            data-testid={ `${index}-recipe-card` }
            key={ index }
          >
            <img
              data-testid={ `${index}-card-img` }
              src={ strMealThumb }
              alt={ strMeal }
            />
            <h4
              data-testid={ `${index}-card-name` }
            >
              { strMeal }
            </h4>
          </div> */}
        </Link>
      );
    }
  };

  return (
    <div className="recipe-card-container">
      {
        mealState.meals.map((meal, index) => forEachFunc(meal, index))
      }
    </div>
  );
}
