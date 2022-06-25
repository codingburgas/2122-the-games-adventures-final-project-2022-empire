import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import { deleteStorage, writeStorage, readStorage } from "../localstorage";
import mainLogo from "../../assets/Mainlogo.svg?url";
import * as SC from "./indexStyles";

import Register from "./Register";
import Login from "./Login";

function Index() {
  const [hasUserRegistered, setHasUserRegistered] = useState<boolean>(false);

  useEffect(() => {
    setHasUserRegistered(Boolean(readStorage("hasUserRegistered")));
  }, []);

  const userContext = useContext(UserContext);
  const navigate = useNavigate();
  // Better to go in separate component
  const handleLogOut = () => {
    deleteStorage("auth");
    window.location.reload();
  };

  const showForm = (id: string) => {
    document.getElementById(id)!.style.display = "block";
    document.body.classList.add("stop-scrolling");
  };

  return (
    <>
      <Login/>
      <Register />
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
          <SC.Group4>
            {!userContext?.authenticated ? (
              <>
                {hasUserRegistered ? (
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
                <br />
                <br />
                <Link to="/account">
                  <button>Go to account</button>
                </Link>
                <br />
                <br />
                <button onClick={handleLogOut}>Log out</button>
              </>
            )}
          </SC.Group4>
        </SC.NavBar>
        <SC.HeroText>
          <SC.Group42></SC.Group42>
          <SC.Text8>Brewing the time</SC.Text8>
          <SC.Text9>
            Website description will stay here. This is just referance text to
            put
          </SC.Text9>
          <SC.Rectangle30 onClick={() => navigate("game", { replace: false })}>
            <SC.Text7>PLAY</SC.Text7>
          </SC.Rectangle30>
        </SC.HeroText>
      </SC.FirstGradient>
      <SC.SecondGradient>
        <SC.Frame9>
          <SC.Text10>Make it yours with me</SC.Text10>
          <SC.Group6>
            <SC.Text11>4K</SC.Text11>
            <SC.Text12>There is 4k most popular websites</SC.Text12>
          </SC.Group6>
          <SC.Group7>
            <SC.Text14>21+</SC.Text14>
            <SC.Text13>There is 4k most popular websites</SC.Text13>
          </SC.Group7>
          <SC.Group8>
            <SC.Text16>200</SC.Text16>
            <SC.Text15>There is 4k most popular websites</SC.Text15>
          </SC.Group8>
        </SC.Frame9>
        <SC.Rectangle32>
          <SC.NaskoiSasho>
            <SC.Text17>Nasko i Sasho</SC.Text17>
            <SC.Frame10>
              <SC.Group10>
                <SC.Rectangle33 />
                <SC.Text19>Online classes</SC.Text19>
                <SC.Text18>Make it happen this is very cool</SC.Text18>
              </SC.Group10>
              <SC.Group13>
                <SC.Rectangle33 />
                <SC.Text21>Online classes</SC.Text21>
                <SC.Text20>Make it happen this is very cool</SC.Text20>
              </SC.Group13>
              <SC.Group11>
                <SC.Rectangle33 />
                <SC.Text23>Online classes</SC.Text23>
                <SC.Text22>Make it happen this is very cool</SC.Text22>
              </SC.Group11>
              <SC.Group12>
                <SC.Rectangle33 />
                <SC.Text25>Online classes</SC.Text25>
                <SC.Text24>Make it happen this is very cool</SC.Text24>
              </SC.Group12>
            </SC.Frame10>
          </SC.NaskoiSasho>
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
