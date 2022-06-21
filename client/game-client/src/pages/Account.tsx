import { useContext } from "react";
import { UserContext } from "../App";

function Account() {
  const userContext = useContext(UserContext);

  return (
    <>
      <h1>Account info:</h1>
      <h2>
        {JSON.stringify(userContext?.userData)
          .split(",")
          .join(",\n ")
          .replace(/:/g, ": ")
          .replace(/["{}]/g, "")}
      </h2>
    </>
  );
}

export default Account;
