import { useEffect, useState } from "react";
import "./VisiteProfile.scss";
import axios from "axios";
import Cookies from "universal-cookie";
import { Link, useNavigate } from "react-router-dom";

export default function Profile() {
  // const [friends, setFriends] = useState([]);
  const [profile, setProfile] = useState([]);
  const [runUseEffect, setRun] = useState(0);

  const id = window.location.pathname.split("/").slice(-1)[0];

  //Cookie
  const cookie = new Cookies();
  const getToken = cookie.get("Bearer");

  const nav = useNavigate();

  useEffect(() => {
    const getProfile = async () => {
      try {
        const res = await axios.get(
          `http://127.0.0.1:8000/api/getUserById/${id}`,
          {
            headers: {
              Accept: "application/json",
              Authorization: "Bearer " + getToken,
            },
          }
        );
        setProfile(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    getProfile();
  }, [runUseEffect, nav]);

  return (
    <div className="profile">
      <div className="pic-container">
        <img 
          src={profile.coverPic === "https://tokystorage.s3.amazonaws.com/images/default-cover.png" ? profile.coverPic : `http://127.0.0.1:8000/storage/${profile.coverPic}`}
          alt="" 
          className="cover-pic" 
        />
        <div className="profile-pic-name">
          <img 
            src={profile.profilePic === "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" ? profile.profilePic : `http://127.0.0.1:8000/storage/${profile.profilePic}`} 
            alt="" 
            className="profile-pic" 
          />

          <span>{profile.name}</span>
        </div>
      </div>

      <div className="page-info">
        <div className="numbers">
          <Link className="section">
            <span className="number">15</span>
            <span className="title">Posts</span>
          </Link>
          <Link to={`/followers/${profile.id}`} className="section">
            <span className="number">100</span>
            <span className="title">Followers</span>
          </Link>
          <Link className="section">
            <span className="number">140</span>
            <span className="title">Following</span>
          </Link>
        </div>
        <div className="comunication">
          <Link to={`/chat/${id}`} className="message">Message</Link>
          <button className="follow">
            <i className="fa-regular fa-plus fa-fw"></i>
            <i className="fa-regular fa-user fa-fw"></i>
          </button>
          <button className="more">
            <i className="fas fa-caret-down fa-fw"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
