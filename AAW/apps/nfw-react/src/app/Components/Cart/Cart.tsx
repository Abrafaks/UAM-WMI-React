import React from 'react';
import MenuItem from '../Menu/MenuItem';
import styles from '../Menu/Menu.module.css';
import cartStyles from './Cart.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import axios from 'axios';

const Cart = (props) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.cart);
  const totalAmount = useSelector((state: RootState) => state.cart.totalAmount) || 0;
  console.log(cartItems);
  const currentCartItems = cartItems.map(pizza => <MenuItem data={pizza} key={pizza.id} />);

  const sendOrder = async () => {
    try{
      const result = (await axios.post('http://localhost:3333/api/order', {
        pizza: cartItems,
        total: totalAmount
      }))

    }catch(e){
      console.log(e.response)
    }


  };

  console.log(currentCartItems);
  return <div>
    <div className={styles.gridContainer}>
      {currentCartItems}
    </div>
    <div className={cartStyles.totalPriceAndOrder}>
      <div> {`Total Price: ${totalAmount} zł`}</div>
      <div>
        <button onClick={sendOrder}>ORDER</button>
      </div>
    </div>


  </div>;
};

export default Cart;
