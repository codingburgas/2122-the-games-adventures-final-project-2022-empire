import { cloneElement, useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../App";

function querystring(name: string, url = window.location.href) {
  const parsedName = name.replace(/[[]]/g, "\\$&");
  const regex = new RegExp(`[?&]${parsedName}(=([^&#]*)|&|#|$)`, "i");
  const results = regex.exec(url);

  if (!results || !results[2]) {
    return false;
  }

  return decodeURIComponent(results[2].replace(/\+/g, " "));
}


function UnauthenticatedRoute(props: any) {
  const userContext = useContext(UserContext);
  const { children } = props;
  const redirect = querystring("redirect");

  if (userContext?.authenticated && !userContext.isLoading) {
    return <Navigate to={redirect || "/"} />;
  }

  return cloneElement(children, props);
}

export default UnauthenticatedRoute;
