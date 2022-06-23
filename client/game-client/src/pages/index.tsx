import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import { deleteStorage } from "../localstorage";
import mainLogo from "../../assets/Mainlogo.svg?url";
import * as SC from "./indexStyles";

function Index() {
  const userContext = useContext(UserContext);
  const navigate = useNavigate();
  // Better to go in separate component
  const handleLogOut = () => {
    deleteStorage("auth");
    window.location.reload();
  };

  return (
    <>
      <SC.FirstGradient>
        <SC.NavBar>
          <img src={mainLogo} />
          <SC.Text3>Home</SC.Text3>
          <SC.Text4>Stats</SC.Text4>
          <SC.Text5>Preview</SC.Text5>
          <SC.Group4>
            <SC.Rectangle30
              onClick={() => navigate("login", { replace: false })}
            >
              <SC.Text6>Login</SC.Text6>
            </SC.Rectangle30>
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
      <SC.ThirdGradient></SC.ThirdGradient>
      {/*
        <SC.Text26>Game Preview</SC.Text26>
        <SC.Group14>
          <SC.Rectangle34 />
          <SC.Rectangle35 />
          <SC.Rectangle36 />
        </SC.Group14>
        <SC.Footer>
          <SC.Rectangle3 />
          <SC.Group2>
            <SC.Text27>HOME</SC.Text27>
            <SC.Text28>STATS</SC.Text28>
            <SC.Text29>CONTACT</SC.Text29>
          </SC.Group2>
          <SC.Rectangle4 />
          <SC.Text30>Type here....</SC.Text30>
          <SC.Rectangle5 />
          <SC.Text31>SUBMIT</SC.Text31>
          <SC.Text32>TEXT US HERE</SC.Text32>
          <SC.Line1 />
          <SC.Text33>2022 © Empire | All rights reserved</SC.Text33>
          <SC.Mainlogo>
            <SC.Group3>
              <SC.Text34>EMP</SC.Text34>
              <SC.Text35>IRE</SC.Text35>
              <SC.Rectangle28 />
              <SC.Rectangle29 />
            </SC.Group3>
          </SC.Mainlogo>
        </SC.Footer>
        <SC.Switch>
          <SC.Rectangle4 />
          <SC.Rectangle2 />
        </SC.Switch> */}
      {!userContext?.authenticated ? (
        <>
          <br />
          <br />
          <Link to="/register">
            <button>Go to register</button>
          </Link>
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
    </>
  );
}

export default Index;
