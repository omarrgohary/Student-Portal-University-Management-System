import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

function StudentDashboard() {
    const [studentName, setStudentName] = useState("");
    const [availableCoursesCount, setAvailableCoursesCount] = useState(0);
    const [myCoursesCount, setMyCoursesCount] = useState(0);
    const [profileStatus, setProfileStatus] = useState("Incomplete");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const profileResponse = await API.get("/Students/me");
                const coursesResponse = await API.get("/Courses");
                const myCoursesResponse = await API.get("/Enrollments/my-courses");

                const student = profileResponse.data;

                setStudentName(student.name || "Student");
                setAvailableCoursesCount(coursesResponse.data.length);
                setMyCoursesCount(myCoursesResponse.data.length);

                if (student.name && student.email && student.age) {
                    setProfileStatus("Complete");
                } else {
                    setProfileStatus("Incomplete");
                }
            } catch {
                setStudentName("Student");
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    if (loading) return <p>Loading dashboard...</p>;

    return (
        <div className="home-page">
            <section className="hero-card">
                <div>
                    <p className="eyebrow">Student Dashboard</p>

                    <h1>Welcome, {studentName}</h1>

                    <p className="hero-text">
                        Access your courses, check your enrollments, and manage your student profile.
                    </p>
                </div>

                <div className="hero-stats">
                    <div>
                        <h3>{availableCoursesCount}</h3>
                        <p>Available Courses</p>
                    </div>

                    <div>
                        <h3>{myCoursesCount}</h3>
                        <p>My Enrolled Courses</p>
                    </div>

                    <div>
                        <h3>{profileStatus}</h3>
                        <p>Profile Status</p>
                    </div>
                </div>
            </section>

            <section className="dashboard-grid">
                <div className="info-card">
                    <h2>Available Courses</h2>
                    <p>Browse all courses currently available in the system.</p>
                    <Link className="link-action" to="/available-courses">
                        View Courses →
                    </Link>
                </div>

                <div className="info-card">
                    <h2>My Courses</h2>
                    <p>View the courses you are currently enrolled in.</p>
                    <Link className="link-action" to="/my-courses">
                        View My Courses →
                    </Link>
                </div>

                <div className="info-card">
                    <h2>Profile</h2>
                    <p>View and update your personal student information.</p>
                    <Link className="link-action" to="/student-profile">
                        View Profile →
                    </Link>
                </div>
            </section>
        </div>
    );
}

export default StudentDashboard;