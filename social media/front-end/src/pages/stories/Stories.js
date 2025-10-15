import "./Stories.scss";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { Link, useNavigate } from "react-router-dom";
import { User } from "../../context/UserContext";

export default function Stories() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [runUseEffect, setRun] = useState(0); //TO0 Many Requests من اجل حل مشكلة
  const [file, setFile] = useState(null);

  //Cookie
  const cookie = new Cookies();
  const getToken = cookie.get("Bearer");

  const nav = useNavigate();
  const user = useContext(User);

  async function add_story(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await axios.post('http://127.0.0.1:8000/api/store', formData ,{
            headers: {
              'Content-Type': 'multipart/form-data',
                Authorization: "Bearer " + getToken,
            },
        });
        if (res.status === 200){
          setRun(prev => prev + 1);
          setFile(null);
        }
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/getStories",
          {
            headers: {
              Accept: "application/json",
              Authorization: "Bearer " + getToken,
            },
          }
        );
        setStories(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, [runUseEffect]);

  if (loading) return <div className="stories">Loading...</div>;
  if (error) return <div className="stories">Error: {error}</div>;

  console.log(stories);

  return (
    <div className="stories">
      <form onSubmit={add_story}>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button type="submit">Add Story</button>
      </form>
      <ul>
        {stories.map((story, index) => (
          <Link to={`${story.id}`} key={index}>
            <li>
              <div className="profile-pic">
                <img 
                  src={story.user.profilePic === "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" ? story.user.profilePic : `http://127.0.0.1:8000/storage/${story.user.profilePic}`} 
                  alt="" 
                />
              </div>
              {story.file_type === "image" ? (
                <img src={`http://127.0.0.1:8000/storage/${story.file_path}`} alt="" className="story-container" />
              ) : (
                <video
                  src={`http://127.0.0.1:8000/storage/${story.file_path}`}
                  controls
                  className="story-container"
                />
              )}
              <div className="name">
                <span>{story.user.name}</span>
              </div>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}
