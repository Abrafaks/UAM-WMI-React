import React from 'react';
import MenuItem from '../Menu/MenuItem';
import styles from '../Menu/Menu.module.css';
import cartStyles from './Cart.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';

const Cart = (props) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.cart);
  const totalAmount = useSelector((state: RootState) => state.cart.totalAmount) || 0;

  const currentCartItems = cartItems.map(pizza => <MenuItem data={pizza} key={pizza.id} />);

  console.log(currentCartItems);
  return <div>
    <div className={styles.gridContainer}>
      {currentCartItems}
    </div>
    <div className={cartStyles.totalPrice}>{`Total Price: ${totalAmount} zł`}</div>
  </div>;
};

export default Cart;
