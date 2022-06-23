import { useCallback, useContext, useState } from "react";
import { UserContext } from "../App";
import { Hr, Container, InputContainer, Label, Emoji, Input, Button, Form } from '../components/RegisterComponents'

export default function Login() {
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
        <Form>
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
                    <Input type="text" placeholder="Enter your username here." name="username" required />
                    <br/>
                    <Label htmlFor="email">
                        <b>Email</b>
                        <Emoji src="../../assets/images/register/email.png" alt="Email icon"/>
                    </Label>
                    <br/>
                    <Input type="text" placeholder="Enter your email here." name="email" required/>
                    <br/>
                    <Label htmlFor="psw">
                        <b>Password</b>
                        <Emoji src="../../assets/images/register/password.png" alt="Password icon"/>
                    </Label>
                    <br/>
                    <Input type="password" placeholder="Enter your password here." name="psw" required/>
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
                </Container>
            </InputContainer>
        </Form>
    );
};
