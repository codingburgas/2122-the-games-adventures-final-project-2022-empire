import { useCallback, useContext, useState } from "react";
import { UserContext } from "../App";


function Login() {
  const userContext = useContext(UserContext);

  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setsuccessMsg] = useState("");

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      let data = {
        username: e.target.username.value,
        password: e.target.pass.value,
      };

      userContext!.loginUser(data).then(
        () => {
          setErrMsg("");
          setsuccessMsg("Successfully logged in. Redirecting...");
          //window.location.href = "/account";
          return;
        },
        (err: Array) => {
          setErrMsg(err.fields.join(", "));
        }
      );
    },
    [userContext]
  );

  return (
    <>
      <h1>Login</h1>
      <br />
      <form method="POST">
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
      </form>
    </>
  );
}

export default Login;
