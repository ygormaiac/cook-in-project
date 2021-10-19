import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Header, Footer } from '../components/index';

export default function ExploreFoods() {
  const [surpriseMeal, setSurpriseMeal] = useState(0);

  const getMeal = async () => {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php')
      .then((res) => res.json());
    return setSurpriseMeal(response.meals[0].idMeal);
  };

  useEffect(() => {
    getMeal();
  }, []);

  const idcomida = surpriseMeal;

  return (
    <div>
      <Header title="Explorar Comidas" visibility={ false } />
      <div className="container-buttons-explore">
        <Link
          to="/explorar/comidas/ingredientes"
        >
          <button
            data-testid="explore-by-ingredient"
            type="button"
          >
            Por Ingredientes

          </button>
        </Link>
        <Link
          to="/explorar/comidas/area"
        >
          <button data-testid="explore-by-area" type="button">Por Local de Origem</button>
        </Link>
        <Link
          to={ `/comidas/${idcomida}` }
        >
          <button data-testid="explore-surprise" type="button">Me Surpreenda!</button>
        </Link>
      </div>
      <Footer />
    </div>
  );
}
