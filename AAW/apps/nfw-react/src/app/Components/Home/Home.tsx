import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { navActions } from '../../store/nav.slice';

const Home = (props) => {
  const dispatch = useDispatch();

  const toggleActiveHomeHandler = () => {
    dispatch(navActions.activateHome());
  };

  useEffect(() => {
    toggleActiveHomeHandler();
  });

  return <div>
    FAJNA PITCA
  </div>;
};

export default Home;
