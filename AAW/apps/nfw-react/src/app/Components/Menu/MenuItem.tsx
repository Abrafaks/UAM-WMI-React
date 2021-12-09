import React from 'react';
import styles from './MenuItem.module.css';
import { useDispatch } from 'react-redux';
import { cartActions } from '../../store/cart.slice';

const MenuItem = (props) => {
  const dispatch = useDispatch()
  const { name, price, ingredients } = props.data;

  const addItem = () => {
    dispatch(cartActions.addToCart(props.data))
  }

  return (
    <div className={styles.container}>
      <div>
        <div>
          <h3>{name}</h3>
          {ingredients.join(', ')}
        </div>
        <div>{price}zł</div>
      </div>
      <div>
        <button onClick={addItem}>ADD</button>
      </div>
    </div>
  )
    ;
};

export default MenuItem;
