import { useContext } from "react";
import "./Profile.scss";
import { User } from "../../context/UserContext";
import { Link } from "react-router-dom";
import ProfilePosts from "../../components/profilePosts/ProfilePosts";

export default function Profile() {
  const user = useContext(User);


  return (
    <div className="profile">
      <div className="pic-container">
        <img
          src={user.auth.userDetails.coverPic === "https://tokystorage.s3.amazonaws.com/images/default-cover.png" ? user.auth.userDetails.coverPic : `http://127.0.0.1:8000/storage/${user.auth.userDetails.coverPic}`}
          alt=""
          className="cover-pic"
        />
        <div className="profile-pic-name">
          <img
            src={user.auth.userDetails.profilePic === "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" ? user.auth.userDetails.profilePic : `http://127.0.0.1:8000/storage/${user.auth.userDetails.profilePic}`}
            alt=""
            className="profile-pic"
          />

          <span className="name">{user.auth.userDetails.name}</span>
        </div>
      </div>

      <div className="page-info">
        <div className="numbers">
          <Link className="section">
            <span className="number">15</span>
            <span className="title">Posts</span>
          </Link>
          <Link to={`/followers/${user.auth.userDetails.id}`} className="section">
            <span className="number">100</span>
            <span className="title">Followers</span>
          </Link>
          <Link className="section">
            <span className="number">140</span>
            <span className="title">Following</span>
          </Link>
        </div>
        <div className="update-profile-icon">
          <Link to={`/updateProfile/${user.auth.userDetails.id}`} className="update">
            <i className="fa-regular fa-edit fa-fw nav-icon"></i>
          </Link>
        </div>
      </div>

      <div className="posts">
        <ProfilePosts />
      </div>
    </div>
  );
}
