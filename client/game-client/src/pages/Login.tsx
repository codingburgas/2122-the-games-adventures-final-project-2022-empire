import { useCallback, useContext, useState } from "react";
import { UserContext } from "../App";
import Failback from "./Fallback";
import {
  Form,
  Hr,
  Label,
  Input,
  InputContainer,
  Emoji,
  Container,
  Button,
  FormClose,
  FormPopup,
} from "../components/RegisterAndLogin";
import { FormField } from "../components/FormField";
import formArt from "../../assets/formArt.svg?url";

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
          window.location.reload();
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
    <FormClose
      onClick={(event: any) => {
        if (event.target != event.currentTarget) return;

        document.getElementById("login")!.style.display = "none";
        document.body.classList.remove("stop-scrolling");
      }}
      id="login"
    >
      <FormPopup>
        <Form onSubmit={handleSubmit}>
          <img
            src={formArt}
            alt="Mountains"
          />

          <InputContainer>
            <Container>
              <h1> Login </h1>
              <br />
              <Hr />
              <br />
              <br />
              <FormField
                label="Username"
                name="username"
                type="text"
                inputType="text"
                placeholder="Username"
                iconUrl="../../assets/images/register/username.png"
                iconAltText="Username"
              />
              <br />
              <FormField
                label="Password"
                name="pass"
                type="password"
                inputType="password"
                placeholder="Password"
                iconUrl="../../assets/images/register/password.png"
                iconAltText="Password"
              />

              <br />
              <Button type="submit">
                <Emoji
                  src="../../assets/images/register/button-image.png"
                  alt="Login Button"
                />
                LOGIN
              </Button>

              <Button
                type="button"
                onClick={() => {
                  document.getElementById("login")!.style.display = "none";
                  document.getElementById("register")!.style.display = "block";
                }}
              >
                <Emoji
                  src="../../assets/images/register/button-image.png"
                  alt="Mountains"
                ></Emoji>
                REGISTER
              </Button>

              <p>{successMsg}</p>
              <p>{errMsg}</p>
            </Container>
          </InputContainer>
        </Form>
      </FormPopup>
    </FormClose>
  );
}

export default Login;
