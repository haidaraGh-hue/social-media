import { useContext, useEffect, useState } from "react";
import "./HomePosts.scss";
import axios from "axios";
import Cookies from "universal-cookie";
import { User } from "../../context/UserContext";

export default function HomePosts() {
  const [homePosts, setHomePosts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [runUseEffect, setRun] = useState(0);

  //Cookie
  const cookie = new Cookies();
  const getToken = cookie.get("Bearer");

  const user = useContext(User);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/getHomePosts",
          {
            headers: {
              Accept: "application/json",
              Authorization: "Bearer " + getToken,
            },
          }
        );
        setHomePosts(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [runUseEffect]);

  if (loading) return <div className="posts">Loading...</div>;
  if (error) return <div className="posts">Error: {error}</div>;

  return (
    <ul className="home-posts">
      {homePosts.map((post, index) => (
        <li key={index} className="home-post">
          <div className="nav-post">
            <div className="user-info">
              <img src={post.user.profilePic} alt="" />
              <span>{post.user.name}</span>
            </div>
            <div className="details">
              <i className="fa-regular fa-plus fa-fw"></i>
            </div>
          </div>
          {post.img === null ? (
            <div className="content-text">
              <p>{post.content}</p>
            </div>
          ) : (
            <div className="content-with-img">
              <img src={post.img} alt="" />
              <div className="content-text-with-img">
                <p>{post.content}</p>
              </div>
            </div>
          )}
          <div className="bottom-nav-post">
            <div className="reactions">
              <i className="fa-regular fa-heart fa-fw reaction"></i>
              <i className="fa-regular fa-comment fa-fw reaction"></i>
              <i className="fa-regular fa-paper-plane fa-fw reaction"></i>
            </div>
            <div className="save-post">
              <i className="fa-regular fa-bookmark fa-fw reaction"></i>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
