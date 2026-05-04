import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, allowedUserType }) {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const userType = localStorage.getItem("userType");

    if (!isLoggedIn) {
        return <Navigate to="/student-login" replace />;
    }

    if (allowedUserType && userType !== allowedUserType) {
        if (userType === "student") {
            return <Navigate to="/student-dashboard" replace />;
        }

        if (userType === "admin") {
            return <Navigate to="/dashboard" replace />;
        }

        return <Navigate to="/" replace />;
    }

    return children;
}

export default ProtectedRoute;