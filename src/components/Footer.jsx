import React from 'react';
import { useHistory as UseHistory } from 'react-router-dom';
import { Menu, Icon } from 'semantic-ui-react';
import './Footer.css';

export default function Footer() {
  const history = UseHistory();

  const redirectDrinks = () => {
    history.push('/bebidas');
  };

  const redirectExplore = () => {
    history.push('/explorar');
  };

  const redirectMeals = () => {
    history.push('/comidas');
  };

  return (
    <div data-testid="footer" className="footer">
      <Menu compact icon="labeled">
        <Menu.Item
          name="gamepad"
          onClick={ redirectDrinks }
        >
          <Icon name="beer" />
          Bebidas
        </Menu.Item>

        <Menu.Item
          name="paper plane"
          onClick={ redirectExplore }
        >
          <Icon name="paper plane" />
          Explorar
        </Menu.Item>

        <Menu.Item
          name="utensils"
          onClick={ redirectMeals }
        >
          <Icon name="utensils" />
          Comidas
        </Menu.Item>
      </Menu>
    </div>
  );
}
