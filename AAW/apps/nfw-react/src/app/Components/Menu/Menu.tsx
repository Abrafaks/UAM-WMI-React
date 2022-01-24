import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MenuItem from './MenuItem';
import styles from './Menu.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { pizzasActions } from '../../store/pizzas.slice';
import { sauceActions } from '../../store/sauce.slice';

enum CartItemType{
  Pizza = 'pizza',
  Sauce = 'sauce'
}

const Menu = (props) => {
  const dispatch = useDispatch();
  const [pizzaItems, setPizzaItems] = useState([]);
  let storedPizzas = useSelector((state: RootState) => state.pizzas.pizzas);
  const storedSauces = useSelector((state: RootState) => state.sauce.sauces);

  useEffect(() => {

    const processPizzas = (pizzas) => {
      setPizzaItems(
        pizzas.map((pizza) => {
          return <MenuItem data={pizza} key={pizza.id} />;
        })
      );
    };
storedPizzas = []
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
          pizza.type = CartItemType.Pizza
          return pizza;
        });

        dispatch(pizzasActions.setPizzas(pizzas));
        processPizzas(pizzas);
      };

      fetchPizzas();
    }

    if (storedSauces.length === 0) {
      // id, name, price
      const fetchSauces = async () => {
        let sauces = (await axios.get('http://localhost:3333/api/sauce')).data;

        console.log(sauces);

        dispatch(sauceActions.setSauces(sauces));
      };

      fetchSauces();
    }
  }, []);

  return <div className={styles.gridContainer}>{pizzaItems}</div>;
};

export default Menu;
