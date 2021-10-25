import { useEffect, useState } from 'react';
import axios from 'axios';
import React from 'react';
import MenuItem from './MenuItem';
import styles from './Menu.module.css';

const Menu = (props) => {
  const [pizzaItems, setPizzaItems] = useState([]);

  useEffect(() => {
    let ingredientList;
    const fetchIngredients = async () => {
      ingredientList = (await axios.get('http://localhost:3333/api/ingredient'))
        .data;
      console.log(ingredientList);
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
        return pizza;
      });

      setPizzaItems(
        pizzas.map((pizza) => {
          return <MenuItem data={pizza} key={pizza.id} />;
        })
      );
    };

    fetchPizzas();
  }, []);

  return <div className={styles.gridContainer}>{pizzaItems}</div>;
};

export default Menu;
