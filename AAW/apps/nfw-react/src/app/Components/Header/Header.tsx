import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Header.module.css';
import { navActions } from '../../store/nav.slice';
import { RootState } from '../../store';

export const Header = () => {
  const dispatch = useDispatch();
  const active = useSelector((state: RootState) => state.nav.active);

  console.log(active)

  const toggleActiveHomeHandler = () => {
    dispatch(navActions.activateHome());
  };
  const toggleActiveMenuHandler = () => {
    dispatch(navActions.activateMenu());
  };
  const toggleActiveCartHandler = () => {
    dispatch(navActions.activateCart());
  };

  return (
    <nav>
      <ul className={styles.ul}>
        <li>
          <Link
            to="/"
            className={active === 'home' ? styles.active : ''}
            onClick={toggleActiveHomeHandler}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/menu"
            className={active === 'menu' ? styles.active : ''}
            onClick={toggleActiveMenuHandler}
          >
            Menu
          </Link>
        </li>
        <li>
          <Link
            to="/cart"
            className={active === 'cart' ? styles.active : ''}
            onClick={toggleActiveCartHandler}
          >
            Cart
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
