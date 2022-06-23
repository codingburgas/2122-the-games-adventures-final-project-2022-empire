import { useCallback, useContext, useState } from "react";
import { UserContext } from "../App";
import { debounce } from "lodash";
import { Emoji, Label, Button, Input, InputContainer, Form, Container, Hr } from '../components/RegisterComponents'

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

      console.log(data);

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
        <Form onSubmit={handleSubmit}>
            <div>
                <img src="../../assets/images/register/registration-image.jpg" alt="Mountains"/>
            </div>

            <InputContainer>
                <Container>
                    <h1> Register </h1>
                    <br/>
                    <br/>
                    <Hr/>
                    <br/>
                    <br/>
                    <Label htmlFor="username">
                        <b>Username</b>
                        <Emoji src="../../assets/images/register/username.png" alt="Username icon"/>
                    </Label>
                    <br/>
                    <Input type="text" placeholder="Enter your username here." name="username" required
                        onChange={(e) => {
                        fieldHandler(
                            USERNAME_REGEX,
                            setIsUsernameValid,
                            setIsUsernameEntered,
                            e
                        );
                        }}
                    />
                    <br/>
                    <Label htmlFor="email">
                        <b>Email</b>
                        <Emoji src="../../assets/images/register/email.png" alt="Email icon"/>
                    </Label>
                    <br/>
                    <Input type="text" placeholder="Enter your email here." name="email" required/>
                    <br/>
                    <Label htmlFor="password">
                        <b>Password</b>
                        <Emoji src="../../assets/images/register/password.png" alt="Password icon"/>
                    </Label>
                    <br/>
                    <Input type="password" placeholder="Enter your password here." name="password" required
                       onChange={(e) => {
                           fieldHandler(
                               PASSWORD_REGEX,
                               setIsPasswordValid,
                               setIsPasswordEntered,
                               e
                           );
                       }}
                    />
                    <br/>
                    <Label htmlFor="psw-repeat">
                        <b>Repeat Password</b>
                        <Emoji src="../../assets/images/register/psw-repeat.png" alt="Password-repeat icon"/>
                    </Label>
                    <br/>
                    <Input type="password" placeholder="Repeat your password here." name="psw-repeat" required />
                    <br/>
                    <Button type="submit" >
                        <Emoji src="../../assets/images/register/button-image.png" alt="Mountains"/>
                        REGISTER
                    </Button>
                    <p>Is username valid: {isUsernameValid ? "true" : "false"}</p>
                    <p>Is password valid: {isPasswordValid ? "true" : "false"}</p>
                    <p>{successMsg}</p>
                    <p>{errMsg}</p>
                </Container>
            </InputContainer>
        </Form>
    );
}

export default Register;
