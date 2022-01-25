import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MenuItem from './MenuItem';
import styles from './Menu.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { pizzasActions } from '../../store/pizzas.slice';
import { sauceActions } from '../../store/sauce.slice';

export enum CartItemType {
  Pizza = 'pizza',
  Sauce = 'sauce'
}

const Menu = (props) => {
  const dispatch = useDispatch();
  const [pizzaItems, setPizzaItems] = useState([]);
  const [sauceItems, setSauceItems] = useState([]);
  let storedPizzas = useSelector((state: RootState) => state.pizzas.pizzas);
  let storedSauces = useSelector((state: RootState) => state.sauce.sauces);

  useEffect(() => {

    const processPizzas = (pizzas) => {
      setPizzaItems(
        pizzas.map((pizza) => {
          return <MenuItem data={pizza} key={pizza.id} />;
        })
      );
    };

    const processSauces = (sauces) => {
      setSauceItems(
        sauces.map((sauce) => {
          return <MenuItem data={sauce} key={sauce.id} />;
        })
      );
    };


    storedPizzas = [];
    if (storedPizzas.length > 0) {
      processPizzas(storedPizzas);
    } else {
      let ingredientList;
      const fetchIngredients = async () => {
        ingredientList = (await axios.get('http://localhost:3333/api/ingredient'))
          .data;
      };

      // id, name, price, ingredients
      const fetchPizzas = async () => {
        await fetchIngredients();
        let pizzas = (await axios.get('http://localhost:3333/api/pizza')).data;

        pizzas.map((pizza) => {
          let { ingredients } = pizza;

          ingredients = ingredients.map((ingredient) => {
            return ingredientList.find((ing) => ing.id === ingredient).name;
          });

          pizza.ingredients = ingredients;
          pizza.type = CartItemType.Pizza;
          return pizza;
        });

        dispatch(pizzasActions.setPizzas(pizzas));
        processPizzas(pizzas);
      };

      fetchPizzas();
    }
    storedSauces = [];
    if (storedSauces.length === 0) {
      // id, name, price
      const fetchSauces = async () => {
        let sauces = (await axios.get('http://localhost:3333/api/sauce')).data;

        sauces.map((sauce) => {
          sauce.type = CartItemType.Sauce;
          return sauce;
        });

        dispatch(sauceActions.setSauces(sauces));
        processSauces(sauces);
      };

      fetchSauces();
    } else {
      processSauces(storedSauces);
    }
  }, []);

  return <div>
    {pizzaItems.length !== 0 && sauceItems.length !== 0 ? <div>
    <h2 className={styles.headers}>Pizzas</h2>
    <div className={styles.gridContainer}>{pizzaItems}</div>
    <h2 className={styles.headers}>Sauces</h2>
    <div className={styles.gridContainer}>{sauceItems}</div>
      </div>
    : ''}
  </div>;
};

export default Menu;
