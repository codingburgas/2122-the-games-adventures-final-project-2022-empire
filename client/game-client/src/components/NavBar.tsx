import { useContext } from "react";
import { UserContext } from "../App";
import * as SC from "../pages/indexStyles";

import mainLogo from "../../assets/Mainlogo.svg?url";
import { deleteStorage } from "../localstorage";
import { Link } from "react-router-dom";

export function NavBar(props: any) {
  const userContext = useContext(UserContext);

  const handleLogOut = () => {
    deleteStorage("auth");
    window.location.reload();
  };

  const showForm = (id: string) => {
    document.getElementById(id)!.style.display = "block";
    document.body.classList.add("stop-scrolling");
  };

  return (
    <SC.NavBar>
      <Link to="/">
        <SC.MainLogo src={mainLogo} />
      </Link>
      <Link to="/">
        <SC.Text3>Home</SC.Text3>
      </Link>
      <SC.Text4>Stats</SC.Text4>
      <SC.Text5
        onClick={(e) => {
          e.preventDefault();
          window.location.href =
            "https://github.com/codingburgas/2122-the-games-adventures-final-project-2022-empire";
        }}
      >
        Source
      </SC.Text5>
      <SC.Group4>
        {!userContext?.authenticated ? (
          <>
            {props.hasUserRegistered ? (
              <SC.Rectangle30 onClick={() => showForm("login")}>
                <SC.Text6>Login</SC.Text6>
              </SC.Rectangle30>
            ) : (
              <SC.Rectangle30 onClick={() => showForm("register")}>
                <SC.Text6>Register</SC.Text6>
              </SC.Rectangle30>
            )}
          </>
        ) : (
          <>
            <Link to="/account">
              <SC.Rectangle30>
                <SC.Text6>MY ACCOUNT</SC.Text6>
              </SC.Rectangle30>
              <br />
            </Link>
            <SC.Rectangle30 onClick={handleLogOut}>
              <SC.Text6>LOG OUT</SC.Text6>
            </SC.Rectangle30>
          </>
        )}
      </SC.Group4>
    </SC.NavBar>
  );
}
