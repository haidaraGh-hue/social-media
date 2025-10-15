import "./Register.scss";
import axios from "axios";
import { useContext, useState } from "react";
import { User } from "../../context/UserContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordR, setPasswordR] = useState("");
    const [accept, setAccept] = useState(false);
    const [emailError, setEmailError] = useState(false);

    const nav = useNavigate();

    // Cookie
    const cookie = new Cookies();

    // Get User
    const user = useContext(User);


    async function Submit(e) {
        e.preventDefault();
        setAccept(true);
        try {
            // send data
            let res = await axios.post("http://127.0.0.1:8000/api/register", {
                name: name,
                email: email,
                password: password,
                password_confirmation: passwordR,
            });
            const token = res.data.data.token;
            cookie.set("Bearer", token);
            const userDetails = res.data.data.user;
            user.setAuth({ token, userDetails });
            nav("/home");
        } catch (err) {
            if(err.response.status === 422){
                setEmailError(true);
            }
            setAccept(true);
        }
    }


    return (
        <div className="page">
            <div className="parent">
                <div className="box">
                    <div className="left-side-register">
                        <div className="left-content-register">
                            <h1>Welcome Back!</h1>
                            <p>To keep connected with us please login with your personal info</p>
                            <Link to="/login" className="switch-pages">SIGN IN</Link>
                        </div>
                    </div>
                    <div className="right-side-register">
                        <div className="right-content-register">
                            <h1>Create Account</h1>
                            <div className="icons">
                                <i className="fab fa-facebook-f"></i>
                                <i className="fab fa-google"></i>
                                <i className="fab fa-linkedin-in"></i>
                            </div>
                            <p>or use your email for registration</p>
                            <form onSubmit={Submit}>
                                <input
                                    type="text"
                                    placeholder="Name..."
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                                {name.length < 2 && accept && <p className="error">Name must be more than 2 char</p>}
                                <input
                                    type="email"
                                    placeholder="Email..."
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                {emailError && accept && <p className="error">Email Is already been taken</p>}
                                <input
                                    type="password"
                                    placeholder="Password..."
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                {password.length < 8 && accept && <p className="error">Password must be more than 8 Char</p>}
                                <input
                                    type="password"
                                    placeholder="Repeat Password..."
                                    value={passwordR}
                                    onChange={(e) => setPasswordR(e.target.value)}
                                />
                                {passwordR !== password && accept && <p className="error">Password does not match</p>}
                                <button className="submit" type="submit">SIGN UP</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}