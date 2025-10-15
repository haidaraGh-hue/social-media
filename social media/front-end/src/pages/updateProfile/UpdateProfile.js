import { useContext, useState } from "react";
import "./UpdateProfile.scss";
import Cookies from "universal-cookie";
import { User } from "../../context/UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function UpdateProfile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordR, setPasswordR] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [coverPic, setCoverPic] = useState(null);
  const [city, setCity] = useState("");
  const [study, setStudy] = useState("");
  const [universityOrSchoolName, setUniversityOrSchoolName] = useState("");
  const [work, setWork] = useState("");
  const [accept, setAccept] = useState(false);

  // Cookie
  const cookie = new Cookies();
  const getToken = cookie.get("Bearer");

  const user = useContext(User);

  const id = window.location.pathname.split("/").slice(-1)[0];

  const nav = useNavigate();

  async function Submit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("password_confirmation", passwordR);
    formData.append("profilePic", profilePic);
    formData.append("coverPic", coverPic);
    formData.append("city", city);
    formData.append("study", study);
    formData.append("university_or_school_name", universityOrSchoolName);
    formData.append("work", work);

    setAccept(true);
    try {
      const res = await axios.post(
        `http://127.0.0.1:8000/api/updateUser/${id}`, formData ,{
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: "Bearer " + getToken,
          },
        }
      );
      const userDetails = res.data.data.user;
      user.setAuth({ userDetails });
      nav(`/profile/${user.auth.userDetails.id}`);
    } catch (err) {
      setAccept(true);
      console.log(err);
    }
  }

  return (
    <div className="update-profile">
      <span className="title">Update Profile</span>
      <form>
        <div className="update-img">
          <img
            src={coverPic !== null ? URL.createObjectURL(coverPic) : (user.auth.userDetails.coverPic === "https://tokystorage.s3.amazonaws.com/images/default-cover.png") ? user.auth.userDetails.coverPic : `http://127.0.0.1:8000/storage/${user.auth.userDetails.coverPic}`}
            alt=""
            className="update-cover-pic"
          />
          <input
            type="file"
            name="coverPic"
            id="coverPic"
            onChange={(e) => setCoverPic(e.target.files[0])}
            className="input-cover-pic"
          />
          <label htmlFor="coverPic" className="label-cover-pic">
            <i className="fa-regular fa-plus fa-fw icon-update-cover-pic"></i>
          </label>
          <div className="update-profile-pic-name">
            <img
              src={profilePic !== null ? URL.createObjectURL(profilePic) : (user.auth.userDetails.profilePic === "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png") ? user.auth.userDetails.profilePic : `http://127.0.0.1:8000/storage/${user.auth.userDetails.profilePic}`}
              alt=""
              className="update-profile-pic"
            />
            <input
              type="file"
              name="profilePic"
              id="profilePic"
              onChange={(e) => setProfilePic(e.target.files[0])}
              className="input-profile-pic"
            />
            <label htmlFor="profilePic" className="label-profile-pic">
              <i className="fa-regular fa-plus fa-fw icon-update-profile-pic"></i>
            </label>
            <span className="update-name">{user.auth.userDetails.name}</span>
          </div>
        </div>
        <div className="update-info">
          <div className="field">
            <input
              type="text"
              id="name"
              placeholder="Update Name..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input-update-info"
            />
            <label htmlFor="name" className="label-update-info">
              Enter Your New Name
            </label>
          </div>
          {name.length < 2 && accept && (
            <p className="error-update">Name must be more than 2 char</p>
          )}
          <div className="field">
            <input
              type="email"
              id="email"
              placeholder="Update Email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-update-info"
            />
            <label htmlFor="email" className="label-update-info">
              Enter Your New Email
            </label>
          </div>
          <div className="field">
            <input
              type="password"
              id="password"
              placeholder="Update Password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-update-info"
            />
            <label htmlFor="password" className="label-update-info">
              Enter Your New Password
            </label>
          </div>
          {password.length < 8 && accept && (
            <p className="error-update">Password must be more than 8 Char</p>
          )}
          <div className="field">
            <input
              type="password"
              id="passwordR"
              placeholder="Repeat Password..."
              value={passwordR}
              onChange={(e) => setPasswordR(e.target.value)}
              className="input-update-info"
            />
            <label htmlFor="passwordR" className="label-update-info">
              Enter Your New Password Again
            </label>
          </div>
          {passwordR !== password && accept && (
            <p className="error-update">Password does not match</p>
          )}
          <div className="field">
            <input
              type="text"
              id="city"
              placeholder="City..."
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="input-update-info"
            />
            <label htmlFor="city" className="label-update-info">
              Enter Your City
            </label>
          </div>
          <div className="field">
            <input
              type="text"
              id="study"
              placeholder="Study..."
              value={study}
              onChange={(e) => setStudy(e.target.value)}
              className="input-update-info"
            />
            <label htmlFor="study" className="label-update-info">
              Enter Your Study
            </label>
          </div>
          <div className="field">
            <input
              type="text"
              id="universityOrSchoolName"
              placeholder="University Or School Name..."
              value={universityOrSchoolName}
              onChange={(e) => setUniversityOrSchoolName(e.target.value)}
              className="input-update-info"
            />
            <label
              htmlFor="universityOrSchoolName"
              className="label-update-info"
            >
              Enter Your University Or School Name
            </label>
          </div>
          <div className="field">
            <input
              type="text"
              id="work"
              placeholder="Work..."
              value={work}
              onChange={(e) => setWork(e.target.value)}
              className="input-update-info"
            />
            <label htmlFor="work" className="label-update-info">
              Enter Your Work
            </label>
          </div>
        </div>
        <button type="submit" onClick={Submit} className="update">
          Update
        </button>
      </form>
    </div>
  );
}
