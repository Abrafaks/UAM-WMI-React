import React from 'react';
import styles from './MenuItem.module.css';

const MenuItem = (props) => {
  const { name, price, ingredients } = props.data;

  return (
    <div className={styles.container}>
      <div>
        <h3>{name}</h3>
        {ingredients.join(', ')}
      </div>
      <div>{price}zł</div>
    </div>
  );
};

export default MenuItem;
