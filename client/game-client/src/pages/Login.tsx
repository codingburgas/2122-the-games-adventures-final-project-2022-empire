import { useCallback, useContext, useState } from "react";
import { UserContext } from "../App";

function Login() {
  const userContext = useContext(UserContext);

  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setsuccessMsg] = useState("");

  const handleSubmit = useCallback(
    (e: any) => {
      e.preventDefault();

      let data = {
        username: e.target.username.value,
        password: e.target.pass.value,
      };

      if (!userContext?.loginUser) return;

      userContext.loginUser(data).then(
        () => {
          setErrMsg("");
          setsuccessMsg("Successfully logged in. Redirecting...");
          //window.location.href = "/account";
          return;
        },
        (err: string) => {
          setErrMsg(err);
        }
      );
    },
    [userContext]
  );

  return (
    <>
      <h1>Login</h1>
      <br />
      <form method="POST" onSubmit={handleSubmit}>
        <label>Username:</label>
        <br />
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Username"
        />
        <br />
        <label>Password:</label>
        <br />
        <input type="password" id="pass" name="pass" placeholder="*******" />
        <br />
        <br />
        <input type="submit" value="Submit" />
        <p>{successMsg}</p>
        <p>{errMsg}</p>
      </form>
    </>
  );
}

export default Login;
