import "./Followers.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";

export default function Followers() {
  const [followers, setFollowers] = useState([]);
  const [runUseEffect, setRun] = useState(0);

  const id = window.location.pathname.split("/").slice(-1)[0];

  // Cookie
  const cookie = new Cookies();
  const getToken = cookie.get("Bearer");

  const nav = useNavigate();

  useEffect(() => {
    const fetchFollowers = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/getUsersFollowMe/${id}`,
          {
            headers: {
              Accept: "application/json",
              Authorization: "Bearer " + getToken,
            },
          }
        );
        setFollowers(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchFollowers();
  }, [runUseEffect]);

  function visitProfile($id) {
    nav(`/visiteProfile/${$id}`);
    setRun((prev) => prev + 1);
  }

  return(
     <div className="followers">
      <span className="title">Followers</span>
        <ul>
          {followers.map((follower, index) => (
            <li key={index} onClick={visitProfile.bind(this, follower.id)}>
              <img src={follower.profilePic} alt="" />
              <span>{follower.name}</span>
            </li>
          ))}
        </ul>
      </div> 
  );
}
