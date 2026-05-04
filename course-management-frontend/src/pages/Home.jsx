import { Link } from "react-router-dom";

function Home() {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

    return (
        <div className="home-page">
            <section className="hero-card">
                <div>
                    <p className="eyebrow">University System</p>
                    <h1>Student Portal</h1>
                    <p className="hero-text">
                        Welcome to the student portal. Explore available courses, view instructors,
                        and manage your academic journey through a simple and modern interface.
                    </p>

                    <div className="hero-actions">
                        <Link className="btn" to={isLoggedIn ? "/courses" : "/student-login"}>
                            Browse Courses
                        </Link>

                        <Link className="btn secondary" to={isLoggedIn ? "/instructors" : "/student-login"}>
                            View Instructors
                        </Link>
                    </div>
                </div>

                <div className="hero-stats">
                    <div>
                        <h3>Courses</h3>
                        <p>Explore available subjects and programs</p>
                    </div>
                    <div>
                        <h3>Instructors</h3>
                        <p>Meet your professors and teaching staff</p>
                    </div>
                    <div>
                        <h3>Students</h3>
                        <p>Manage student information and records</p>
                    </div>
                </div>
            </section>

            <section className="dashboard-grid">
                <div className="info-card">
                    <h2>Courses</h2>
                    <p>Browse and explore available courses.</p>
                    <Link className="link-action" to={isLoggedIn ? "/courses" : "/student-login"}>
                        View Courses →
                    </Link>
                </div>

                <div className="info-card">
                    <h2>Instructors</h2>
                    <p>Learn more about course instructors.</p>
                    <Link className="link-action" to={isLoggedIn ? "/instructors" : "/student-login"}>
                        View Instructors →
                    </Link>
                </div>

                <div className="info-card">
                    <h2>Students</h2>
                    <p>Access student-related information and records.</p>
                    <Link className="link-action" to={isLoggedIn ? "/students" : "/student-login"}>
                        View Students →
                    </Link>
                </div>
            </section>

            <section className="features-section">
                <h2>Portal Features</h2>

                <div className="features-list">
                    <div>Course browsing</div>
                    <div>Instructor directory</div>
                    <div>Student management</div>
                    <div>Enrollment system</div>
                    <div>Secure access</div>
                    <div>Modern interface</div>
                </div>
            </section>
        </div>
    );
}

export default Home;