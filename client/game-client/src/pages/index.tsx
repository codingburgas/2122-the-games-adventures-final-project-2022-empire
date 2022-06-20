import { Link } from "react-router-dom";

function Index() {
  return (
    <>
      <h1>Qsha World</h1>
      <Link to="/game">
        <button>Go to game</button>
      </Link>
      <br/><br/>
      <Link to="/login">
        <button>Go to login</button>
      </Link>
      <br/><br/>
      <Link to="/register">
        <button>Go to register</button>
      </Link>
      <br/><br/>
      <Link to="/account">
        <button>Go to account</button>
      </Link>
    </>
  );
}

export default Index;
