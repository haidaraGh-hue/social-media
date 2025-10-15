import "./NavBar.scss";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { User } from "../../context/UserContext";
import { DarkModeContext } from "../../context/darkModeContext";

export default function NavBar() {
  const { toggle, darkMode } = useContext(DarkModeContext);
  const user = useContext(User);
  const nav = useNavigate();

  function Story(){
    nav("stories");
  }

  function Chat(){
    nav("chat");
  }

  return (
    <div className="navbar">
      <div className="left">
        <span className="title">Gold Social</span>

        <Link to="/home" className="nav-icon">
          <i className="fas fa-home"></i>
        </Link>

        {darkMode ? (
          <i className="fas fa-sun nav-icon" onClick={toggle}></i>
        ) : (
          <i className="fas fa-moon nav-icon" onClick={toggle}></i>
        )}

        <i className="fas fa-video nav-icon" onClick={Story}></i>

        <div className="search">
          <i className="fas fa-search icon-search" ></i>
          <input type="text" placeholder="Search..." className="input-search"/>
        </div>
      </div>

      <div className="right">
        <Link to={"/profile/" + user.auth.userDetails.id}>
          <i className="fa-regular fa-user fa-fw nav-icon"></i>
        </Link>

        <i className="far fa-comments fa-fw nav-icon" onClick={Chat}></i>
        <i className="fa-regular fa-bell fa-lg nav-icon"></i>

        <div className="user">
          <img 
            src={user.auth.userDetails.profilePic === "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" ? user.auth.userDetails.profilePic : `http://127.0.0.1:8000/storage/${user.auth.userDetails.profilePic}`} 
            className="profilePic" 
            alt="" 
          />
          <span className="name">{user.auth.userDetails.name}</span>
        </div>
      </div>
    </div>
  );
}
