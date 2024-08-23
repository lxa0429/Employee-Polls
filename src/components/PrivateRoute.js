import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ component: Component }) => {
  const authedUser = useSelector((state) => state.authedUser);
  const location = useLocation();

  if (!authedUser) {
    // Redirect to login page with the intended targetUrl as a query parameter
    return <Navigate to={`/login?targetUrl=${encodeURIComponent(location.pathname)}`} />;
  }

  return <Component />;
};

export default PrivateRoute;
