import { Outlet, Route, Routes } from "react-router-dom";
import Register from "./Auth/register/Register";
import Home from "./pages/home/Home";
import Login from "./Auth/login/Login";
import { DarkModeContext } from "./context/darkModeContext";
import { useContext } from "react";
import RefreshPage from "./RefreshPage";
import RequireAuth from "./RequireAuth";
import NavBar from "./components/navBar/NavBar";
import LeftBar from "./components/leftBar/LeftBar";
import RightBar from "./components/rightBar/RightBar";
import Stories from "./pages/stories/Stories";
import Story from "./pages/story/Story";
import Profile from "./pages/profile/Profile";
import VisiteProfile from "./pages/visiteProfile/VisiteProfile";
import Followers from "./pages/followers/Followers";
import Chat from "./pages/chat/Chat";
import UpdateProfile from "./pages/updateProfile/UpdateProfile";
import ChatWindow from "./pages/chatWindow/ChatWindow";

export default function App() {
  const { darkMode } = useContext(DarkModeContext);

  const Layout = () => {
    return (
      <div>
        <NavBar />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <LeftBar />
          <Outlet />
          <RightBar />
        </div>
      </div>
    );
  };

  return (
    <div className={`theme-${darkMode ? "dark" : "light"}`}>
      <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      
        <Route element={<RefreshPage />}>
          <Route element={<RequireAuth />}>
            <Route path="/" element={<Layout />}>
              <Route path="/home" element={<Home />} />
              <Route path="/stories" element={<Stories />} />
              <Route path="/profile/:id" element={<Profile />}/>
              <Route path="/visiteProfile/:id" element={<VisiteProfile />}/>
              <Route path="/followers/:id" element={<Followers />}/>
              <Route path="/updateProfile/:id" element={<UpdateProfile />}/>
              <Route path="/chat" element={<Chat />}/>
              <Route path="/chat/:id" element={<ChatWindow />}/>
            </Route>
            <Route path="stories/:id" element={<Story />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}
