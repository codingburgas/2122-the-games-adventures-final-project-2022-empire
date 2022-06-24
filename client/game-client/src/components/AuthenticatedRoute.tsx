import React, { useContext, ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { UserContext } from "../App";

interface Props {
    children?: ReactNode
}

function AuthenticatedRoute({ children }: Props): any {
  const { pathname, search } = useLocation();
  const userContext = useContext(UserContext);

  if (!userContext?.authenticated && !userContext?.isLoading) {
    return <Navigate to={`/`} />;
  }

  return children;
}

export default AuthenticatedRoute;