import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import MenuItem from '../Menu/MenuItem';
import styles from '../Menu/Menu.module.css';
import cartStyles from './Cart.module.css';
import { RootState } from '../../store';
import { cartActions } from '../../store/cart.slice';

const Cart = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const cartItems = useSelector((state: RootState) => state.cart.cart);
  const totalAmount = useSelector((state: RootState) => state.cart.totalAmount) || 0;
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isOrderBeingSent, setIsOrderBeingSent] = useState(false);
  const [totalPriceOrEmptyCartMessage, setTotalPriceOrEmptyCartMessage] = useState('');

  const currentCartItems = cartItems.map(pizza => <MenuItem data={pizza} key={pizza.id} />);

  const sendOrder = async () => {
    try {
      setIsOrderBeingSent(true);
      console.log(isButtonDisabled);
      const result = (await axios.post('http://localhost:3333/api/order', {
        pizza: cartItems,
        total: totalAmount
      }));

      setIsOrderBeingSent(false);

      if (result.status === 201) {
        dispatch(cartActions.deleteEntireCart());
        history.push('/delivery');
      }

    } catch (e) {
      console.log(e.response);
    }
  };

  useEffect(() => {
    if (cartItems.length === 0) {
      setTotalPriceOrEmptyCartMessage('Please add pizza to cart before ordering');
      setIsButtonDisabled(true);
    } else {
      setTotalPriceOrEmptyCartMessage(`Total Price: ${totalAmount} zł`);
      setIsButtonDisabled(false);
    }
  });


  return <div>
    <div className={styles.gridContainer}>
      {currentCartItems}
    </div>
    <div className={cartStyles.totalPriceAndOrder}>
      <div> {totalPriceOrEmptyCartMessage}</div>
      <div>
        <button disabled={isButtonDisabled || isOrderBeingSent} onClick={sendOrder}>ORDER</button>
      </div>
    </div>
  </div>;
};

export default Cart;
