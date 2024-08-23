import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import '../css/NotFound.css';

const NotFound = () => {
  const authedUser = useSelector((state) => state.authedUser);

  useEffect(() => {
    console.log('NotFound component rendered');
    console.log('Current authedUser:', authedUser);
  }, [authedUser]);

  console.log('authedUser in 404:', authedUser);
  return (
    <div className="not-found-container">
      <h1 className="not-found-title">404</h1>
      <p className="not-found-message">Sorry, the page you're looking for cannot be found.</p>
    </div>
  );
};

export default (NotFound);
