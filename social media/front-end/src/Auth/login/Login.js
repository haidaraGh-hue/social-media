import { useContext, useState } from "react";
import "./Login.scss";
import axios from "axios";
import { User } from "../../context/UserContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [accept, setAccept] = useState(false);
    const [error, setError] = useState(false);

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
            let res = await axios.post("http://127.0.0.1:8000/api/login", {
                email: email,
                password: password,
            });
            const token = res.data.data.token;
            cookie.set("Bearer", token);
            const userDetails = res.data.data.user;
            user.setAuth({ token, userDetails });
            nav("/home");
        } catch (err) {
            if(err.response.status === 401){
                setError(true);
            }
            setAccept(true);
        }
    }

    return (
        <div className="page">
            <div className="parent">
                <div className="box">
                    <div className="left-side-login">
                        <div className="left-content-login">
                            <h1>Sign in</h1>
                            <div className="icons">
                                <i className="fab fa-facebook-f"></i>
                                <i className="fab fa-google"></i>
                                <i className="fab fa-linkedin-in"></i>
                            </div>
                            <p>or use your account</p>
                            <form onSubmit={Submit}>
                                <input
                                    type="email"
                                    placeholder="Email..."
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                
                                <input
                                    type="password"
                                    placeholder="Password..."
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                {password.length < 8 && accept && <p className="error">Password must be more than 8 Char</p>}
                                <Link>Forgot your password?</Link>
                                <button className="submit" type="submit">SIGN IN</button>
                                {error && accept && <p className="error">Wrong Email Or Password</p>}
                            </form>
                        </div>
                    </div>
                    <div className="right-side-login">
                        <div className="right-content-login">
                            <h1>Hello, Friend!</h1>
                            <p>Enter your personal details and start journey with us</p>
                            <Link to="/register" className="switch-pages">SIGN UP</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}