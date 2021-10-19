import React from 'react';
import { Link } from 'react-router-dom';
import { Header, Footer } from '../components/index';

export default function ExploreAll() {
  return (
    <div>
      <Header title="Explorar" visibility={ false } />
      <div className="container-buttons-explore">
        <Link
          to="/explorar/comidas"
        >
          <button data-testid="explore-food" type="button">Explorar Comidas</button>
        </Link>
        <Link
          to="/explorar/bebidas"
        >
          <button data-testid="explore-drinks" type="button">Explorar Bebidas</button>
        </Link>
      </div>
      <Footer />
    </div>
  );
}
