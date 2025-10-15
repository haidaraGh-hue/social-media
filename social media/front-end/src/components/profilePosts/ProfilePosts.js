import { useContext, useEffect, useState } from "react";
import "./ProfilePosts.scss";
import axios from "axios";
import Cookies from "universal-cookie";
import { User } from "../../context/UserContext";
import AddImage from "../../assets/img.png";
import AddPlace from "../../assets/map.png";
import TagFriends from "../../assets/friend.png";

export default function ProfilePosts() {
  const [profilePosts, setProfilePosts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [runUseEffect, setRun] = useState(0);
  const [contentPost, setContentPost] = useState("");
  const [imgPost, setImgPost] = useState("");

  //Cookie
  const cookie = new Cookies();
  const getToken = cookie.get("Bearer");

  const user = useContext(User);

  async function set_post(e) {
    e.preventDefault();
    try {
      const res = await axios
        .post(
          "http://127.0.0.1:8000/api/setPost",
          {
            content: contentPost,
            img: imgPost,
          },
          {
            headers: {
              Authorization: "Bearer " + getToken,
            },
          }
        );
        if (res.status === 200) {
          setRun((prev) => prev + 1);
          setContentPost("");
          setImgPost("");
      }
    } catch (err) {}
  }

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/getProfilePosts",
          {
            headers: {
              Accept: "application/json",
              Authorization: "Bearer " + getToken,
            },
          }
        );
        setProfilePosts(response.data);
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
    <>
      <div className="add-post">
        <form onSubmit={set_post}>
          <div className="add-text">
            <img
              className="profile-pic"
              src={user.auth.userDetails.profilePic}
              alt=""
            />
            <input
              className="text"
              type="text"
              placeholder={`What's on your mind ${user.auth.userDetails.name}?`}
              value={contentPost}
              onChange={(e) => setContentPost(e.target.value)}
            />
          </div>
          <div className="submit">
            <div className="options">
              <div className="add-img">
                <img className="option" src={AddImage} alt="" />
                <label htmlFor="img">Add Image</label>
                <input
                  className="input-img"
                  type="image"
                  id="img"
                  value={imgPost}
                  onChange={(e) => setImgPost(e.target.value)}
                />
              </div>
              <div className="add-place">
                <img className="option" src={AddPlace} alt="" />
                <span>Add Place</span>
              </div>
              <div className="tag-friends">
                <img className="option" src={TagFriends} alt="" />
                <span>Tag Friends</span>
              </div>
            </div>
            <button type="submit">Share</button>
          </div>
        </form>
      </div>

      <ul className="profile-posts">
        {profilePosts.map((post, index) => (
          <li key={index} className="profile-post">
            <div className="nav-post">
              <div className="user-info">
                <img src={user.auth.userDetails.profilePic} alt="" />
                <span>{user.auth.userDetails.name}</span>
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
    </>
  );
}
