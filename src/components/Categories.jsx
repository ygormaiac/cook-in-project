import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import MyConText from '../context/Context';
import '../pages/index.css';

const FIVE = 5;
const THREE = 3;

export default function Categories(props) {
  const [categoriesList, setCategoriesList] = useState([]);
  const { nameApi, drinkOrMeals } = props;
  const {
    setRenderIndex,
    categoryNameTarget, renderIndex, categoryName } = useContext(MyConText);

  const fetchCategories = async () => {
    const results = await fetch(`https://www.${nameApi}.com/api/json/v1/1/list.php?c=list`)
      .then((response) => response.json())
      .then((res) => res[drinkOrMeals]);

    setCategoriesList([...results]);
  };

  const onClickButton = ({ target: { value } }) => {
    if (renderIndex === THREE && categoryName === value) {
      setRenderIndex(1);
      categoryNameTarget('');
    } else {
      setRenderIndex(THREE);
      categoryNameTarget(value);
    }
  };

  const onClickButtonAll = () => {
    setRenderIndex(1);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const forEachFunc = (category, index) => {
    if (index < FIVE) {
      return (
        <button
          type="button"
          data-testid={ `${category.strCategory}-category-filter` }
          onClick={ (event) => onClickButton(event) }
          value={ category.strCategory }
        >
          { category.strCategory }
        </button>
      );
    }
  };

  return (
    <div className="container-categories">
      <button
        data-testid="All-category-filter"
        type="button"
        onClick={ () => onClickButtonAll() }
      >
        All
      </button>
      {categoriesList.map(forEachFunc)}
    </div>
  );
}

Categories.propTypes = ({
  nameApi: PropTypes.string.isRequired,
  drinkOrMeals: PropTypes.string.isRequired,
});
