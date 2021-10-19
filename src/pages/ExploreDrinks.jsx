import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Header, Footer } from '../components/index';

export default function ExploreDrinks() {
  const [surpriseDrink, setSurpriseDrink] = useState(0);

  const getDrink = async () => {
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
      .then((res) => res.json());
    return setSurpriseDrink(response.drinks[0].idDrink);
  };

  useEffect(() => {
    getDrink();
  }, []);

  const idbebida = surpriseDrink;
  return (
    <div>
      <Header title="Explorar Bebidas" visibility={ false } />
      <div className="container-buttons-explore">
        <Link
          to="/explorar/bebidas/ingredientes"
        >
          <button
            data-testid="explore-by-ingredient"
            type="button"
          >
            Por Ingredientes

          </button>
        </Link>
        <Link
          to={ `/bebidas/${idbebida}` }
        >
          <button data-testid="explore-surprise" type="button">Me Surpreenda!</button>
        </Link>
      </div>
      <Footer />
    </div>
  );
}
