import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { RootState } from '../state/store';

type isLoggedProps = {
  children: React.ReactElement;
};

const IsLoggedGuard: React.FC<isLoggedProps> = ({ children }) => {

  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const location = useLocation();

  if (isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} />;
  } 

  return children
};

export default IsLoggedGuard;
