import { useCallback, useContext, useState } from "react";
import { UserContext } from "../App";
import { Hr, Container } from '../components/RegisterComponents'
import styles from'./Login.module.css';
import './Login.module.css';

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
        <form className= {styles["form-class"]}>
            <div>
                <img src="../../assets/images/register/registration-image.jpg" alt="Mountains"/>
            </div>

            <div className= {styles["registration-col"]}>
                <Container>
                    <h1> Register </h1>
                    <br/>
                    <br/>
                    <Hr/>
                    <br/>
                    <br/>
                    <label className= {styles["text-registration"]} htmlFor="username">
                        <b>Username</b>
                        <img className= {styles["registration-images"]} src="../../assets/images/register/username.png" alt="Username icon"/>
                    </label>
                    <br/>
                    <input className={styles["register-box"]} type="text" placeholder="Enter your username here." name="username" id="username" required />
                    <br/>
                    <label className= {styles["text-registration"]} htmlFor="email">
                        <b>Email</b>
                        <img className={styles["registration-images"]} src="../../assets/images/register/email.png" alt="Email icon"/>
                    </label>
                    <br/>
                    <input type="text" placeholder="Enter your email here." name="email" id="email" required/>
                    <br/>
                    <label className={styles["text-registration"]} htmlFor="psw">
                        <b>Password</b>
                        <img className={styles["registration-images"]} src="../../assets/images/register/password.png" alt="Password icon"/>
                    </label>
                    <br/>
                    <input type="password" placeholder="Enter your password here." name="psw" id="psw" required/>
                    <br/>
                    <label className={styles["text-registration"]} htmlFor="psw-repeat">
                        <b>Repeat Password</b>
                        <img className={styles["registration-images"]} src="../../assets/images/register/psw-repeat.png" alt="Password-repeat icon"/>
                    </label>
                    <br/>
                    <input type="password" placeholder="Repeat your password here." name="psw-repeat" id="psw-repeat" required />
                    <br/>
                    <button type="submit" className={styles["registerbtn"]}>
                        <img className={styles["button-image"]} src="../../assets/images/register/button-image.png" alt="Mountains"/>
                        REGISTER
                    </button>
                </Container>
            </div>
        </form>
    );
};
