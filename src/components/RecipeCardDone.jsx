import React, { useState } from 'react';
import copytoclipboard from 'clipboard-copy';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import '../pages/index.css';

export default function RecipeCardDone({ localStorageValue }) {
  const [copied, setCopied] = useState(false);

  if (localStorageValue === []) {
    return (<div>Você não possui receitas finalizadas!</div>);
  }

  const copyLink = (id, type) => {
    const FOUR = 4000;
    if (type === 'bebida') {
      copytoclipboard(`http://localhost:3000/bebidas/${id}`);
      setCopied(true);
      return setTimeout(() => setCopied(false), FOUR);
    }

    copytoclipboard(`http://localhost:3000/comidas/${id}`);
    setCopied(true);
    return setTimeout(() => setCopied(false), FOUR);
  };

  // const linkCopy = (id, type) => {
  //   const FOUR = 4000;
  //   if (type === 'bebida') {
  //     copytoclipboard(`http://localhost:3000/bebidas/${id}`);
  //     setCopied(true);
  //     return setTimeout(() => setCopied(false), FOUR);
  //   }

  //   copytoclipboard(`http://localhost:3000/comidas/${id}`);
  //   setCopied(true);
  //   return setTimeout(() => setCopied(false), FOUR);
  // };

  return (
    <div>
      {localStorageValue && localStorageValue.map((index, teste) => (
        <div key={ index.name } className="container-recipe-done">
          <div>
            <Link
              to={ (index.type === 'comida')
                ? `/comidas/${index.id}` : `/bebidas/${index.id}` }
            >
              <img
                className="img-recipe-done"
                alt={ `foto de ${index.name}` }
                data-testid={ `${teste}-horizontal-image` }
                src={ index.image }
                style={ { width: '150px', height: '150px' } }
              />
            </Link>
          </div>
          <div>
            <div className="container-shade-category">
              <p data-testid={ `${teste}-horizontal-top-text` }>
                {index.type === 'comida'
                  ? `${index.area} - ${index.category}`
                  : index.alcoholicOrNot}
              </p>
              <button
                type="button"
                className="button-share"
                onClick={ () => copyLink(index.id, index.type) }
              >
                <img
                  alt="compartilhar"
                  src={ shareIcon }
                  data-testid={ `${teste}-horizontal-share-btn` }
                />
              </button>
            </div>
            {copied && <span className="link">Link copiado!</span>}
            <Link
              to={ (index.type === 'comida')
                ? `/comidas/${index.id}`
                : `/bebidas/${index.id}` }
            >
              <p
                data-testid={ `${teste}-horizontal-name` }
                className="title-done"
              >
                {index.name}
              </p>
            </Link>
            <p
              data-testid={ `${teste}-horizontal-done-date` }
              className="data-finish"
            >
              { `Feita em: ${index.doneDate}` }
            </p>
            {index.tags && index.tags.map((tagName) => (
              <span
                className="span-recipe"
                data-testid={ `${teste}-${tagName}-horizontal-tag` }
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

RecipeCardDone.propTypes = {
  localStorageValue: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    type: PropTypes.string,
    area: PropTypes.string,
    category: PropTypes.string,
    doneDate: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
  })).isRequired,
};
