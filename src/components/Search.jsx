import React, { useContext } from 'react';
import MyConText from '../context/Context';
import '../pages/index.css';

export default function Search() {
  const { FetchAPI } = useContext(MyConText);

  const HandleClick = () => {
    FetchAPI();
  };

  return (
    <div className="container-search">
      <input
        id="search"
        data-testid="search-input"
        className="form-control input-search"
        autoComplete="off"
      />
      <div className="conteiner-radio">
        <label className="form-check-label" htmlFor="ingredient-search-radio">
          ingredient
          <input
            data-testid="ingredient-search-radio"
            type="radio"
            id="ingredient-search-radio"
            name="selected-search-radio"
            value="ingredient-search-radio"
            className="form-check-input"
          />
        </label>

        <label className="form-check-label" htmlFor="name-search-radio">
          name
          <input
            data-testid="name-search-radio"
            type="radio"
            id="name-search-radio"
            name="selected-search-radio"
            value="name-search-radio"
            className="form-check-input"
          />
        </label>

        <label className="form-check-label" htmlFor="first-letter-search-radio">
          first-letter
          <input
            data-testid="first-letter-search-radio"
            type="radio"
            id="first-letter-search-radio"
            name="selected-search-radio"
            value="first-letter-search-radio"
            className="form-check-input"
          />
        </label>
      </div>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ () => HandleClick() }
        className="btn btn-danger"
      >
        procurar?
      </button>
    </div>
  );
}
