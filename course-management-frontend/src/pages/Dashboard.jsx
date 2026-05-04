import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

function Dashboard() {
    const [studentsCount, setStudentsCount] = useState(0);
    const [coursesCount, setCoursesCount] = useState(0);
    const [enrollmentsCount, setEnrollmentsCount] = useState(0);
    const [instructorsCount, setInstructorsCount] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const studentsRes = await API.get("/Students");
                const coursesRes = await API.get("/Courses");
                const enrollmentsRes = await API.get("/Enrollments");
                const instructorsRes = await API.get("/Instructors");

                setStudentsCount(studentsRes.data.length);
                setCoursesCount(coursesRes.data.length);
                setEnrollmentsCount(enrollmentsRes.data.length);
                setInstructorsCount(instructorsRes.data.length);
            } catch (err) {
                console.error("Failed to load admin stats", err);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    if (loading) return <p>Loading dashboard...</p>;

    return (
        <div className="home-page">
            <section className="hero-card">
                <div>
                    <p className="eyebrow">Admin Dashboard</p>
                    <h1>Welcome Back, Admin</h1>
                    <p className="hero-text">
                        Manage students, instructors, courses, and enrollments from one secure dashboard.
                    </p>
                </div>

                <div className="hero-stats">
                    <div>
                        <h3>{studentsCount}</h3>
                        <p>Students</p>
                    </div>

                    <div>
                        <h3>{coursesCount}</h3>
                        <p>Courses</p>
                    </div>

                    <div>
                        <h3>{enrollmentsCount}</h3>
                        <p>Enrollments</p>
                    </div>

                    <div>
                        <h3>{instructorsCount}</h3>
                        <p>Instructors</p>
                    </div>
                </div>
            </section>

            <section className="dashboard-grid">
                <div className="info-card">
                    <h2>Students</h2>
                    <p>View, add, edit, and delete students.</p>
                    <Link className="link-action" to="/students">
                        Manage Students →
                    </Link>
                </div>

                <div className="info-card">
                    <h2>Instructors</h2>
                    <p>Manage instructor accounts and profiles.</p>
                    <Link className="link-action" to="/instructors">
                        Manage Instructors →
                    </Link>
                </div>

                <div className="info-card">
                    <h2>Courses</h2>
                    <p>Manage courses and assigned instructors.</p>
                    <Link className="link-action" to="/courses">
                        Manage Courses →
                    </Link>
                </div>

                <div className="info-card">
                    <h2>Enrollments</h2>
                    <p>Assign students to courses.</p>
                    <Link className="link-action" to="/enrollments">
                        Manage Enrollments →
                    </Link>
                </div>
            </section>
        </div>
    );
}

export default Dashboard;