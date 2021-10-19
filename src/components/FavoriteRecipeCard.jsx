import React, { useState } from 'react';
import copytoclipboard from 'clipboard-copy';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

export default function FavoriteRecipeCard({ localStorageValue, removeRecipes }) {
  const [copied, setCopied] = useState(false);

  const copyLink = (id, type) => {
    const FOUR = 4000;
    if (type === 'bebida') {
      copytoclipboard(`http://localhost:3000/bebidas/${id}`);
      console.log('bebida copiada');
      setCopied(true);
      return setTimeout(() => setCopied(false), FOUR);
    }

    copytoclipboard(`http://localhost:3000/comidas/${id}`);
    setCopied(true);
    return setTimeout(() => setCopied(false), FOUR);
  };

  return (

    <div>
      {localStorageValue && localStorageValue.map((recipes, index) => (
        <div className="container-recipe-done" key={ recipes.name }>
          <div>
            <Link
              to={ (recipes.type === 'comida')
                ? `/comidas/${recipes.id}` : `/bebidas/${recipes.id}` }
            >
              <img
                alt={ `foto de ${recipes.name}` }
                data-testid={ `${index}-horizontal-image` }
                src={ recipes.image }
                style={ { width: '150px', height: '150px' } }
              />
            </Link>
          </div>
          <div>
            <div className="container-shade-favorite">
              <button
                type="button"
                className="button-share"
                onClick={ () => removeRecipes(recipes.name) }
              >
                <img
                  src={ blackHeartIcon }
                  alt="botão de desfavoritar"
                  data-testid={ `${index}-horizontal-favorite-btn` }
                />
              </button>
              <button
                type="button"
                className="button-share"
                onClick={ () => copyLink(recipes.id, recipes.type) }
              >
                <img
                  alt="compartilhar"
                  src={ shareIcon }
                  data-testid={ `${index}-horizontal-share-btn` }
                />
              </button>
            </div>
            {copied && <span className="link">Link copiado!</span>}
            <p className="data-finish" data-testid={ `${index}-horizontal-top-text` }>
              {recipes.type === 'comida'
                ? `${recipes.area} - ${recipes.category}`
                : recipes.alcoholicOrNot}
            </p>
            <Link
              to={ (recipes.type === 'comida')
                ? `/comidas/${recipes.id}`
                : `/bebidas/${recipes.id}` }
            >
              <p
                className="title-done"
                data-testid={ `${index}-horizontal-name` }
              >
                {recipes.name}
              </p>
            </Link>

            {recipes.tags && recipes.tags.map((tagName) => (
              <span
                data-testid={ `${index}-${tagName}-horizontal-tag` }
                key={ `${tagName}-span` }
              >
                {tagName}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

FavoriteRecipeCard.propTypes = {
  localStorageValue: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    type: PropTypes.string,
    area: PropTypes.string,
    category: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
  })).isRequired,
  removeRecipes: PropTypes.func.isRequired,
};
