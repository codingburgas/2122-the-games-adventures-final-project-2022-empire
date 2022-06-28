import { useContext, useState } from "react";
import { UserContext } from "../App";
import * as SC from "../components/AccountComponents";
import { NavBar } from "../components/NavBar";
import { FirstGradient } from "./indexStyles";
import { Link, useNavigate } from "react-router-dom";
import mainLogo from "../../assets/mainlogo.svg?url";
import OneHour from "../../assets/achievements/1Hour.svg?url";
import TenHour from "../../assets/achievements/10Hours.svg?url";
import FHour from "../../assets/achievements/50Hours.svg?url";
import THour from "../../assets/achievements/100Hours.svg?url";
import TWHour from "../../assets/achievements/200Hours.svg?url";
import BoxAchiev from "../../assets/achievements/BoxAchiev.svg?url";
import KeyAchiev from "../../assets/achievements/KeyAchiev.svg?url";
import LockAchiev from "../../assets/achievements/LockAchiev.svg?url";
import MapAchiev from "../../assets/achievements/MapAchiev.svg?url";

function Account() {
  const userContext = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <SC.FirstGradient>
      <SC.NavBar>
        <SC.MainLogo src={mainLogo} />
        <SC.Text3  onClick={() => navigate("/", { replace: false })}>Home</SC.Text3>
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
          <SC.Line2 />
          <SC.Text20>Username: {userContext?.userData?.username}</SC.Text20>
          <SC.Text20>ID: {userContext?.userData?.id}</SC.Text20>
          <SC.Delete>
            <SC.DeleteText>Delete</SC.DeleteText>
          </SC.Delete>
        </SC.Group16>
        <SC.Group19>
          <SC.Text8>Achievements</SC.Text8>
          <SC.Line2 />
          <SC.Achievements>
            <SC.Achievement src={OneHour} alt="One hour" />
            <SC.Achievement src={TenHour} alt="Ten hours" />
            <SC.Achievement src={FHour} alt="Fifty hours" />
            <SC.Achievement src={THour} height="grayscale(100%)" alt="One hundred hours" />
            <SC.Achievement src={TWHour} height="grayscale(100%)" alt="Two hundred hours" />
            <SC.Achievement src={BoxAchiev}  alt="Box achievement" />
            <SC.Achievement src={KeyAchiev} alt="Key achievement" />
            <SC.Achievement src={LockAchiev} alt="Lock achievement" />
            <SC.Achievement src={MapAchiev} height="grayscale(100%)" alt="Map achievement" />
          </SC.Achievements>
        </SC.Group19>
        <SC.Group18>
          <SC.Text9>My Profile</SC.Text9>
          <SC.Text10>
            Personal information that cannot be viewed by others.{" "}
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
