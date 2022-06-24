import { useCallback, useContext, useState } from "react";
import { UserContext } from "../App";
import Failback from "./Fallback";
import { Form, Hr, Label, Input, InputContainer, Emoji, Container, Button } from '../components/RegisterAndLogin';

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
        // <>
        //     <h1>Login</h1>
        //     <br />
        //     <form method="POST" onSubmit={handleSubmit}>
        //         <label>Username:</label>
        //         <br />
        //         <input
        //             type="text"
        //             id="username"
        //             name="username"
        //             placeholder="Username"
        //         />
        //         <br />
        //         <label>Password:</label>
        //         <br />
        //         <input type="password" id="pass" name="pass" placeholder="*******" />
        //         <br />
        //         <br />
        //         <input type="submit" value="Submit" />
        //         <p>{successMsg}</p>
        //         <p>{errMsg}</p>
        //     </form>
        // </>
        <Form>
            <div>
                <img src = '../../assets/images/register/registration-image.jpg' alt = 'Mountains'/>
            </div>

            <InputContainer>
                <Container>
                    <h1> Login </h1>
                    <Hr/>
                    <br/>
                    <br/>

                    <Label htmlFor='username'>
                        <b> Username </b>
                        <Emoji src='../../assets/images/register/username.png' alt='Username Icon'/>
                    </Label>
                    <br/>

                    <Input type="text" placeholder="Enter your username here" name='username' required/>

                    <br/>

                    <Label htmlFor='password'>
                        <b> Password </b>
                        <Emoji src='../../assets/images/register/password.png' alt='Password'/>
                    </Label>
                    <br/>
                    <div>
                        <Input type='password' placeholder='Enter your password' name='password' required/>
                        <Input type='radio' value = 'Remember me' name='remember'/>
                        <Label htmlFor='remember'/>
                    </div>
                    <br/>

                    <Button type='submit'>
                        <Emoji src='../../assets/images/register/button-image-login.png' alt='Login Button'/>
                        Button
                    </Button>
                    <br/>

                </Container>
            </InputContainer>
        </Form>

    );
}

export default Login;
