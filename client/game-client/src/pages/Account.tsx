import { useContext } from "react";
import { UserContext } from "../App";
import * as SC from "../components/AccountComponents";
import { NavBar } from "../components/NavBar";
import { FirstGradient } from "./indexStyles";
import mainLogo from "../../assets/mainLogo.svg?url";

function Account() {
  const userContext = useContext(UserContext);

  return (
    <SC.FirstGradient>
      <SC.NavBar>
        <SC.MainLogo src={mainLogo} />
        <SC.Text3>Home</SC.Text3>
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
      </SC.NavBar>
      <SC.Grid>
        <SC.Group16>
          <SC.Text7>My information</SC.Text7>
          <hr/>
        </SC.Group16>
        <SC.Group19>
          <SC.Text8>Other informaton</SC.Text8>
          <hr/>
        </SC.Group19>
        <SC.Group18>
          <SC.Text9>My Profile</SC.Text9>
          <SC.Text10>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.{" "}
          </SC.Text10>
          <SC.Ellipse4 />
          <SC.Text12>Welcome Back {userContext?.userData?.username}</SC.Text12>
          <SC.Text11>We are happy to see you back here</SC.Text11>
        </SC.Group18>
      </SC.Grid>
    </SC.FirstGradient>
  );
}

export default Account;
