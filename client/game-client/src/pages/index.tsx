import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import { deleteStorage, writeStorage, readStorage } from "../localstorage";
import loginIcon from "../../assets/loginIcon.svg?url";
import pfpIcon from "../../assets/pfpIcon.svg?url";
import engineIcon from "../../assets/engineIcon.svg?url";
import playerIcon from "../../assets/playerIcon.svg?url";
import * as SC from "./indexStyles";

import Register from "./Register";
import Login from "./Login";
import { NavBar } from "../components/NavBar";

function Index() {
  const userContext = useContext(UserContext);
  const [hasUserRegistered, setHasUserRegistered] = useState<boolean>(false);

  useEffect(() => {
    setHasUserRegistered(Boolean(readStorage("hasUserRegistered")));
  }, []);

  const navigate = useNavigate();

  return (
    <>
      <SC.FirstGradient>
        {!userContext?.authenticated ? (
          <>
            <Login />
            <Register />
          </>
        ) : null}
        <NavBar hasUserRegistered={hasUserRegistered} />
        <SC.HeroText>
          <SC.Group42></SC.Group42>
          <SC.Text8>Brewing the time</SC.Text8>
          <SC.Text9>
            Website for our adventure game project. Sign in and start playing!
          </SC.Text9>
          {userContext?.authenticated ? (
            <>
              <SC.Rectangle30
                onClick={() => navigate("game", { replace: false })}
              >
                <SC.Text7>PLAY</SC.Text7>
              </SC.Rectangle30>
            </>
          ) : null}
        </SC.HeroText>
      </SC.FirstGradient>
      <SC.SecondGradient>
        <SC.Frame9>
          <SC.Text10>We've reached</SC.Text10>
          <SC.Group6>
            <SC.Text11>150+</SC.Text11>
            <SC.Text12>Commits on github.</SC.Text12>
          </SC.Group6>
          <SC.Group7>
            <SC.Text14>8+</SC.Text14>
            <SC.Text13>Tools and languages used.</SC.Text13>
          </SC.Group7>
          <SC.Group8>
            <SC.Text16>5K+</SC.Text16>
            <SC.Text15>Written lines of code.</SC.Text15>
          </SC.Group8>
        </SC.Frame9>
        <SC.Rectangle32>
          <SC.DebugSymbol1>
            <SC.Text17>Features of the Project</SC.Text17>
            <SC.Frame10>
              <SC.Group10>
                <SC.Rectangle33>
                  <img src={playerIcon}></img>
                </SC.Rectangle33>
                <SC.Text19>Login & Register</SC.Text19>
                <SC.Text18>Working login and register system</SC.Text18>
              </SC.Group10>
              <SC.Group13>
                <SC.Rectangle33>
                  <img src={loginIcon}></img>
                </SC.Rectangle33>
                <SC.Text21>PFP Generation</SC.Text21>
                <SC.Text20>Random pfp generator</SC.Text20>
              </SC.Group13>
              <SC.Group11>
                <SC.Rectangle33>
                  <img src={engineIcon}></img>
                </SC.Rectangle33>
                <SC.Text23>Custom Engine</SC.Text23>
                <SC.Text22>Our own custom engine</SC.Text22>
              </SC.Group11>
              <SC.Group12>
                <SC.Rectangle33>
                  <img src={pfpIcon}></img>
                </SC.Rectangle33>
                <SC.Text25>Multiplayer Server</SC.Text25>
                <SC.Text24>Multiplayer server for the game</SC.Text24>
              </SC.Group12>
            </SC.Frame10>
          </SC.DebugSymbol1>
        </SC.Rectangle32>
      </SC.SecondGradient>
      <SC.ThirdGradient>
        <SC.Text26>Game Preview</SC.Text26>
        <SC.Group14>
          <SC.Rectangle34 />
          <SC.Rectangle35 />
          <SC.Rectangle36 />
        </SC.Group14>
      </SC.ThirdGradient>
    </>
  );
}

export default Index;
