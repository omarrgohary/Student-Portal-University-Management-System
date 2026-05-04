import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

function InstructorDashboard() {
    const [instructorName, setInstructorName] = useState("Instructor");
    const [coursesCount, setCoursesCount] = useState(0);
    const [studentsCount, setStudentsCount] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchInstructorData = async () => {
            try {
                const profileRes = await API.get("/Instructors/me");
                const coursesRes = await API.get("/Instructors/my-courses");
                const studentsRes = await API.get("/Instructors/my-students");

                setInstructorName(profileRes.data.fullName || "Instructor");
                setCoursesCount(coursesRes.data.length);
                setStudentsCount(studentsRes.data.length);
            } catch (error) {
                console.log(error);
                setInstructorName("Instructor");
                setCoursesCount(0);
                setStudentsCount(0);
            } finally {
                setLoading(false);
            }
        };

        fetchInstructorData();
    }, []);

    if (loading) return <p>Loading instructor dashboard...</p>;

    return (
        <div className="home-page">
            <section className="hero-card">
                <div>
                    <p className="eyebrow">Instructor Dashboard</p>
                    <h1>Welcome, {instructorName}</h1>
                    <p className="hero-text">
                        Manage your teaching activities, view your assigned courses, check enrolled students,
                        and assign grades for your courses.
                    </p>
                </div>

                <div className="hero-stats">
                    <div>
                        <h3>{coursesCount}</h3>
                        <p>My Courses</p>
                    </div>

                    <div>
                        <h3>{studentsCount}</h3>
                        <p>My Students</p>
                    </div>

                    <div>
                        <h3>Grades</h3>
                        <p>Assign course grades</p>
                    </div>
                </div>
            </section>

            <section className="dashboard-grid">
                <div className="info-card">
                    <h2>My Courses</h2>
                    <p>View only the courses assigned to you.</p>
                    <Link className="link-action" to="/instructor-courses">
                        View My Courses →
                    </Link>
                </div>

                <div className="info-card">
                    <h2>My Students</h2>
                    <p>View students enrolled in your courses.</p>
                    <Link className="link-action" to="/instructor-students">
                        View My Students →
                    </Link>
                </div>


                <div className="info-card">
                    <h2>My Profile</h2>
                    <p>View your instructor profile information.</p>
                    <Link className="link-action" to="/instructor-profile">
                        View Profile →
                    </Link>
                </div>
            </section>
        </div>
    );
}

export default InstructorDashboard;