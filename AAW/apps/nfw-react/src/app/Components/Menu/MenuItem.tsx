import React from 'react';
import styles from './MenuItem.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { cartActions } from '../../store/cart.slice';
import { RootState } from '../../store';

const MenuItem = (props) => {
  const dispatch = useDispatch();
  const { name, price, ingredients } = props.data;
  let cartItems = useSelector((state: RootState) => state.cart.cart) || [];

  const addItem = () => {
    dispatch(cartActions.addToCart(props.data));
  };

  const removeOneItem = () => {
    dispatch((cartActions.removeOneFromCart(props.data)));
  };

  const indexOfCurrentItemInCart = cartItems.findIndex(pizza => pizza.id === props.data.id)
  const shouldRemoveButtonBeDisplayed = indexOfCurrentItemInCart !== -1;

  return (
    <div className={styles.container}>
      <div>
        <div>
          <h3>{name}</h3>
          {ingredients.join(', ')}
        </div>
        <div>{price}zł</div>
      </div>
      <div className={styles.buttonsAndCounter}>
        <button className={styles.buttons} onClick={addItem}>+</button>
        <div className={styles.counter}> {shouldRemoveButtonBeDisplayed && cartItems[indexOfCurrentItemInCart].amount}</div>
        {shouldRemoveButtonBeDisplayed && <button className={styles.buttons} onClick={removeOneItem}>-</button>}
      </div>
    </div>
  )
    ;
};

export default MenuItem;
