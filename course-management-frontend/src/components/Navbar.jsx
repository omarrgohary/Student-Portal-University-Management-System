import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";

function Navbar() {
    const navigate = useNavigate();

    const [isLoggedIn, setIsLoggedIn] = useState(
        localStorage.getItem("isLoggedIn") === "true"
    );

    const [userType, setUserType] = useState(
        localStorage.getItem("userType") || ""
    );

    useEffect(() => {
        const handleAuthChange = () => {
            setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
            setUserType(localStorage.getItem("userType") || "");
        };

        window.addEventListener("authChanged", handleAuthChange);

        return () => {
            window.removeEventListener("authChanged", handleAuthChange);
        };
    }, []);

    const handleLogout = async () => {
        try {
            await API.post("/Auth/logout");

            localStorage.removeItem("isLoggedIn");
            localStorage.removeItem("userType");
            window.dispatchEvent(new Event("authChanged"));

            setIsLoggedIn(false);
            setUserType("");

            navigate("/");
        } catch {
            alert("Logout failed.");
        }
    };

    return (
        <nav className="navbar">
            <div className="nav-brand">Student Portal</div>

            <div className="nav-links">
                {!isLoggedIn && (
                    <>
                        <Link to="/">Home</Link>
                        <Link to="/student-login">Login</Link>
                    </>
                )}

                {isLoggedIn && userType === "admin" && (
                    <>
                        <Link to="/dashboard">Admin Dashboard</Link>
                        <Link to="/students">Students</Link>
                        <Link to="/instructors">Instructors</Link>
                        <Link to="/courses">Courses</Link>
                        <Link to="/enrollments">Enrollments</Link>
                        <button onClick={handleLogout}>Logout</button>
                    </>
                )}

                {isLoggedIn && userType === "student" && (
                    <>
                        <Link to="/student-dashboard">Dashboard</Link>
                        <Link to="/available-courses">Available Courses</Link>
                        <Link to="/my-courses">Results</Link>
                        <Link to="/student-profile">Profile</Link>
                        <button onClick={handleLogout}>Logout</button>
                    </>
                )}
                {isLoggedIn && userType === "instructor" && (
                    <>
                        <Link to="/instructor-dashboard">Dashboard</Link>
                        <Link to="/instructor-courses">My Courses</Link>
                        <Link to="/instructor-students">My Students</Link>
                        <Link to="/instructor-profile">Profile</Link>
                        <button onClick={handleLogout}>Logout</button>
                    </>
                )}
            </div>
        </nav>
    );
}

export default Navbar;