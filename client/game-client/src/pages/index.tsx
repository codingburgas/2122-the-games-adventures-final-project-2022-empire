import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../App";
import { deleteStorage } from "../localstorage";

function Index() {
  const userContext = useContext(UserContext);

  // Better to go in separate component
  const handleLogOut = () => {
    deleteStorage("auth");
    window.location.reload();
  }

  return (
    <>
      <h1>Qsha World</h1>
      <Link to="/game">
        <button>Go to game</button>
      </Link>
      <br />
      <br />
      {!userContext?.authenticated ? (
        <>
          <Link to="/login">
            <button>Go to login</button>
          </Link>
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
