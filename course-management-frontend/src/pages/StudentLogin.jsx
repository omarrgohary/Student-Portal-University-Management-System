import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function StudentLogin() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            const response = await API.post(
                "/Auth/student-login",
                {
                    email: formData.email,
                    password: formData.password
                },
                {
                    withCredentials: true // ? IMPORTANT (cookies)
                }
            );

            console.log(response.data); // debug if needed

            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("userType", "student");

            window.dispatchEvent(new Event("authChanged"));

            setSuccess("Student login successful.");
            setError("");

            setTimeout(() => {
                navigate("/student-dashboard");
            }, 700);
        } catch (err) {
            console.error(err); // ?? important for debugging

            localStorage.removeItem("isLoggedIn");
            localStorage.removeItem("userType");

            window.dispatchEvent(new Event("authChanged"));

            setError("Invalid student email or password.");
            setSuccess("");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="card login-card">
            <h1>Student Login</h1>

            <p className="muted">
                Access your student portal to view your profile and enrolled courses.
            </p>

            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}

            <form onSubmit={handleSubmit}>
                <label>Email</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="student@email.com"
                    required
                />

                <label>Password</label>
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    required
                />

                <button className="btn" type="submit" disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>
        </section>
    );
}

export default StudentLogin;