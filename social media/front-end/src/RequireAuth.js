import { useContext } from "react";
import { User } from "./context/UserContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";

// هذه الصفحة تستخدم لكي نستطيع العودة من الصفحة التي نحن بها الى صفحة اللوغ ان

export default function RequireAuth(){
    const user = useContext(User);
    const location = useLocation();

    return user.auth.userDetails ? <Outlet /> : <Navigate state={{ from: location }} replace to="/login" />;
}