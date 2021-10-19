import React from 'react';
import { Link } from 'react-router-dom';
import { Header, Footer } from '../components/index';

export default function User() {
  function eraseLocalStorage() {
    localStorage.clear();
  }

  const handleEmailLocalStorage = () => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user) {
      return (
        <h1
          data-testid="profile-email"
          className="email-user"
        >
          { user.email }
        </h1>
      );
    }
  };

  return (
    <div>
      <Header title="Perfil" visibility={ false } />
      <div className="container-user">
        { handleEmailLocalStorage() }
        <div className="container-buttons-user">
          <Link
            to="/receitas-feitas"
          >
            <button
              type="button"
              data-testid="profile-done-btn"
            >
              Receitas Feitas

            </button>
          </Link>
          <Link
            to="/receitas-favoritas"
          >
            <button
              type="button"
              data-testid="profile-favorite-btn"
            >
              Receitas Favoritas

            </button>
          </Link>
          <Link
            to="/"
          >
            <button
              type="button"
              data-testid="profile-logout-btn"
              onClick={ () => eraseLocalStorage() }
            >
              Sair

            </button>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}
