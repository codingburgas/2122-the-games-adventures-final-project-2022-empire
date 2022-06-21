import { useCallback, useContext, useState } from "react";
import { UserContext } from "../App";
import { debounce } from "lodash";

const USERNAME_REGEX =
  /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/;

const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]{8,}$/;

function Login() {
  const userContext = useContext(UserContext);

  const [isUsernameEntered, setIsUsernameEntered] = useState(false);
  const [isUsernameValid, setIsUsernameValid] = useState(false);

  const [isPasswordEntered, setIsPasswordEntered] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setsuccessMsg] = useState("");

  const fieldHandler = debounce(
    (
      regex: RegExp,
      validField: React.Dispatch<React.SetStateAction<boolean>>,
      enterField: React.Dispatch<React.SetStateAction<boolean>>,
      e: any
    ) => {
      e.preventDefault();

      enterField(true);

      let value = e.target.value;

      if (regex === USERNAME_REGEX) {
        value = value.toLowerCase();
      }

      if (value.match(regex)) {
        validField(true);
      } else if (e.target.value.length === 0) {
        enterField(false);
        validField(false);
      } else {
        validField(false);
      }
    },
    500
  );

  const handleSubmit = useCallback(
    (e: any) => {
      e.preventDefault();

      if (!e.target.username.value.match(USERNAME_REGEX)) {
        setErrMsg("The username is invalid");
        return;
      }

      if (!e.target.pass.value.match(PASSWORD_REGEX)) {
        setErrMsg("The password is invalid");
        return;
      }

      let data = {
        username: e.target.username.value,
        password: e.target.pass.value,
      };

      if (!userContext?.registerUser) return;

      userContext.registerUser(data).then(
        () => {
          setErrMsg("");
          setsuccessMsg("Successfully register in. Redirecting...");
          window.location.href = "/login";
          return;
        },
        (err: string) => {
          setErrMsg(err.toString());
        }
      );
    },
    [userContext]
  );

  return (
    <>
      <h1>Register</h1>
      <br />
      <form method="POST" onSubmit={handleSubmit}>
        <label>Username:</label>
        <br />
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Username"
          onChange={(e) => {
            fieldHandler(
              USERNAME_REGEX,
              setIsUsernameValid,
              setIsUsernameEntered,
              e
            );
          }}
        />
        <br />
        <label>Password:</label>
        <br />
        <input
          type="password"
          id="pass"
          name="pass"
          placeholder="*******"
          onChange={(e) => {
            fieldHandler(
              PASSWORD_REGEX,
              setIsPasswordValid,
              setIsPasswordEntered,
              e
            );
          }}
        />
        <br />
        <br />
        <input type="submit" value="Submit" />
        <p>Is username valid: {isUsernameValid ? "true" : "false"}</p>
        <p>Is password valid: {isPasswordValid ? "true" : "false"}</p>
        <p>{successMsg}</p>
        <p>{errMsg}</p>
      </form>
    </>
  );
}

export default Login;
