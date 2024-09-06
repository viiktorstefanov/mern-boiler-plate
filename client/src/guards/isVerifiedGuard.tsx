import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../state/store';

type VerifiedProps = {
  children: React.ReactElement;
};

const VerifiedRoute: React.FC<VerifiedProps> = ({ children }) => {

  const { isVerified, isAuthenticated } = useSelector((state: RootState) => state.auth);
  const location = useLocation();

  if (isAuthenticated && isVerified) {
    return <Navigate to="/" state={{ from: location }} />;
  } 

  return children
};

export default VerifiedRoute;
