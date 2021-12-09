import { useEffect, useState } from 'react';
import axios from 'axios';
import React from 'react';
import MenuItem from './MenuItem';
import styles from './Menu.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { pizzasActions } from '../../store/pizzas.slice';

const Menu = (props) => {
  const dispatch = useDispatch();
  const [pizzaItems, setPizzaItems] = useState([]);
  const storedPizzas = useSelector((state: RootState) => state.pizzas.pizzas);

  useEffect(() => {

    const processPizzas = (pizzas) => {
      setPizzaItems(
        pizzas.map((pizza) => {
          return <MenuItem data={pizza} key={pizza.id} />;
        })
      );
    }

    if(storedPizzas.length > 0){
      processPizzas(storedPizzas)
    }else{
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
          console.log('HERE IS THE PIZZA', pizza)
          return pizza;
        });

        dispatch(pizzasActions.setPizzas(pizzas))
        processPizzas(pizzas)

      };

      fetchPizzas();
    }


  }, [ ]);

  return <div className={styles.gridContainer}>{pizzaItems}</div>;
};

export default Menu;
