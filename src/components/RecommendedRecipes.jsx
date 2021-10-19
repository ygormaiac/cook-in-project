import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './RecommendedRecipes.css';
import '../pages/index.css';

const SIX = 6;

export default function RecommendedRecipes(props) {
  const [recommendations, setRecommendations] = useState([]);
  const { nameApi, drinkOrMeals, imgAndTitle, linkMealOrDrink } = props;

  const fetchRecommendedRecipes = async () => {
    const results = await fetch(`https://www.${nameApi}.com/api/json/v1/1/search.php?s=`)
      .then((response) => response.json())
      .then((res) => res[drinkOrMeals]);

    setRecommendations([...results]);
  };

  useEffect(() => {
    fetchRecommendedRecipes();
  }, []);

  const forEachFunc = (recipeCard, index) => {
    const id = recipeCard[`id${imgAndTitle}`];
    if (index < SIX) {
      return (
        <Link to={ `/${linkMealOrDrink}/${id}` }>
          <div
            className="recomendation-card"
            data-testid={ `${index}-recomendation-card` }
            key={ index }
          >
            <img
              data-testid={ `${index}-card-img` }
              src={ recipeCard[`str${imgAndTitle}Thumb`] }
              alt={ recipeCard[`str${imgAndTitle}`] }
            />
            <h4
              data-testid={ `${index}-recomendation-title` }
            >
              {recipeCard[`str${imgAndTitle}`]}
            </h4>
          </div>
        </Link>
      );
    }
  };
  return (
    <div className="container-recommended">
      <h2>Recommended</h2>
      <div className="container-recomendation-card">
        { recommendations.map(forEachFunc) }
      </div>
    </div>
  );
}

RecommendedRecipes.propTypes = ({
  nameApi: PropTypes.string.isRequired,
  drinkOrMeals: PropTypes.string.isRequired,
  imgAndTitle: PropTypes.string.isRequired,
  linkMealOrDrink: PropTypes.string.isRequired,
});
