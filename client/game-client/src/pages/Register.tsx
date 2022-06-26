import { useCallback, useContext, useState } from "react";
import { UserContext } from "../App";
import { debounce } from "lodash";
import {
  Emoji,
  Button,
  InputContainer,
  Form,
  Container,
  Hr,
  FormPopup,
  FormClose,
} from "../components/RegisterAndLogin";
import { FormField } from "../components/FormField";
import { writeStorage } from "../localstorage";
import formArt from "../../assets/formArt.svg?url";

const USERNAME_REGEX =
  /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/;

const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]{8,}$/;

function Register() {
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

      if (!e.target.password.value.match(PASSWORD_REGEX)) {
        setErrMsg("The password is invalid");
        return;
      }

      let data = {
        username: e.target.username.value,
        password: e.target.password.value,
      };

      if (!userContext?.registerUser) return;

      userContext.registerUser(data).then(
        () => {
          setErrMsg("");
          setsuccessMsg("Successfully register in. Redirecting...");
          writeStorage("hasUserRegistered", { isUserEntered: true });

          document.getElementById("register")!.style.display = "none";
          document.getElementById("login")!.style.display = "block";
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

        document.getElementById("register")!.style.display = "none";
        document.body.classList.remove("stop-scrolling");
      }}
      id="register"
    >
      <FormPopup>
        <Form onSubmit={handleSubmit}>
          <img
            src={formArt}
            alt="Mountains"
            style={{ borderEndStartRadius: 15, borderStartStartRadius: 15 }}
          />

          <InputContainer>
            <Container>
              <h1> Register </h1>
              <br />
              <Hr />
              <br />
              <br />
              <FormField
                label="Username"
                name="username"
                inputType="text"
                placeholder="Enter your username"
                iconUrl="../../assets/images/register/username.png"
                iconAltText="Username"
                isDataEntered={isUsernameEntered}
                isDataValid={isUsernameValid}
                helperText="Username must be at least 8 characters long"
                onChange={(e: any) => {
                  fieldHandler(
                    USERNAME_REGEX,
                    setIsUsernameValid,
                    setIsUsernameEntered,
                    e
                  );
                }}
              />
              <br />
              <FormField
                label="Password"
                iconUrl="../../assets/images/register/password.png"
                iconAltText="Password icon"
                inputType="password"
                placeholder="Enter your password here."
                name="password"
                isDataEntered={isPasswordEntered}
                isDataValid={isPasswordValid}
                helperText="Password must be at least 8 characters long and contain at least one uppercase, one lowercase, and one number"
                onChange={(e: any) => {
                  fieldHandler(
                    PASSWORD_REGEX,
                    setIsPasswordValid,
                    setIsPasswordEntered,
                    e
                  );
                }}
              />
              <br />
              <FormField
                label="Confirm Password"
                iconUrl="../../assets/images/register/password.png"
                iconAltText="Password icon"
                inputType="password"
                placeholder="Confirm your password here."
                name="confirmPassword"
                onChange={(e: any) => {
                  if (e.target.value === e.target.form.password.value) {
                    setIsPasswordValid(true);
                  } else {
                    setIsPasswordValid(false);
                  }
                }}
              />

              <br />
              <Button type="submit">
                <Emoji
                  src="../../assets/images/register/button-image.png"
                  alt="Mountains"
                />
                REGISTER
              </Button>

              <Button
                type="button"
                onClick={() => {
                  document.getElementById("register")!.style.display = "none";
                  document.getElementById("login")!.style.display = "block";
                }}
              >
                <Emoji
                  src="../../assets/images/register/button-image.png"
                  alt="Mountains"
                ></Emoji>
                LOGIN
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

export default Register;
