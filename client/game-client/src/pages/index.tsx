import { Link } from "react-router-dom";

function Index() {
  return (
    <>
      <h1>Qsha World</h1>
      <Link to="/game">
        <button>Go to game</button>
      </Link>
    </>
  );
}

export default Index;
