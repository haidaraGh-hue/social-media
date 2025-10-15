import { useContext, useEffect, useState } from "react";
import "./Right.scss";
import axios from "axios";
import Cookies from "universal-cookie";
import { User } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

export default function RightBar() {
  const user = useContext(User);
  const [suggestions, setSuggestions] = useState([]);
  const [runUseEffect, setRun] = useState(0);

  const id = user.auth.userDetails.id;

  //Cookie
  const cookie = new Cookies();
  const getToken = cookie.get("Bearer");

  const nav = useNavigate();

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/getFriendshipSuggestions/${id}`,
          {
            headers: {
              Accept: "application/json",
              Authorization: "Bearer " + getToken,
            },
          }
        );
        setSuggestions(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchSuggestions();
  }, [runUseEffect]);

  async function addFollow($followedId){
    try{
      await axios.post(
        `http://127.0.0.1:8000/api/addFollow/${id}/${$followedId}`, null,
          {
            headers: {
              Accept: "application/json",
              Authorization: "Bearer " + getToken,
            },
          }
      );
    } catch(err) {
      console.log(err);
    }
  }

  function visitProfile($id){
    nav(`/visiteProfile/${$id}`);
    setRun((prev) => prev + 1);
  }

  return (
    <div className="rightBar">
      <div className="container">
        <div className="item">
          <span>Suggestions For You</span>
          <ul className="suggestions">
            {suggestions.map((suggestion, index) => (
              <li key={index} className="suggestion">
                <div className="info" onClick={visitProfile.bind(this, suggestion.id)}>
                  <img 
                    src={suggestion.profilePic === "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" ? suggestion.profilePic : `http://127.0.0.1:8000/storage/${suggestion.profilePic}`} 
                    alt="" 
                  />
                  <span>{suggestion.name}</span>
                </div>
                <div className="buttons">
                  <button className="follow" onClick={addFollow.bind(this, suggestion.id)}>Follow</button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="item">
          <span>Online Friends</span>
          <div className="user">
            <div className="userInfo">
              <span>Jane Doe</span>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <span>Jane Doe</span>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <span>aya</span>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <span>Eman</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
