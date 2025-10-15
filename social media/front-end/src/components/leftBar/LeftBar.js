import { useContext } from "react";
import "./LeftBar.scss";
import { User } from "../../context/UserContext";
import axios from "axios";
import Cookies from "universal-cookie";

export default function LeftBar() {
  const user = useContext(User);
  const cookie = new Cookies();
  const token = cookie.get("Bearer");

  async function handleLogOut() {
    await axios.post("http://127.0.0.1:8000/api/logout", null, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    cookie.remove("Bearer");
    window.location.pathname = "/login";
  }

  return (
    <div className="leftBar">
      <div className="container">
        <div className="menu">
          <div className="user">
            <img
              src={user.auth.userDetails.profilePic}
              alt=""
              className="profilePic"
            />
            <span className="name">{user.auth.userDetails.name}</span>
          </div>
          <div className="item">
            <span>Friends</span>
          </div>
          <div className="item">
            <span>Groups</span>
          </div>
          <div className="item">
            <span>Marketplace</span>
          </div>
          <div className="item">
            <span>Watch</span>
          </div>
          <div className="item">
            <span>Memories</span>
          </div>
        </div>
        <hr />
        <div className="menu">
          <span>Your shortcuts</span>
          <div className="item">
            <span>Events</span>
          </div>
          <div className="item">
            <span>Gaming</span>
          </div>
          <div className="item">
            <span>Gallery</span>
          </div>
          <div className="item">
            <span>Videos</span>
          </div>
          <div className="item">
            <span>Messages</span>
          </div>
        </div>
        <hr />
        <div className="menu">
          <span>Others</span>
          <div className="item">
            <span>Fundraiser</span>
          </div>
          <div className="item">
            <span>Tutorials</span>
          </div>
          <div className="item">
            <span>Courses</span>
          </div>
        </div>
        <hr />
        <div className="menu">
          <span>Others</span>
          <div className="item">
            <span>Fundraiser</span>
          </div>
          <div className="item">
            <span>Tutorials</span>
          </div>
          <div className="item">
            <span onClick={handleLogOut}>Log Out</span>
          </div>
        </div>
      </div>
    </div>
  );
}
