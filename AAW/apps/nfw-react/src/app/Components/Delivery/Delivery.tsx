import React from 'react';

import styles from './Delivery.module.css';


export const Delivery = () => {

  return (
    <div className={styles.container}>
      <h1>Your order is in delivery</h1>
      <h2>You can safely exit the page</h2>
    </div>
  );
};

export default Delivery
