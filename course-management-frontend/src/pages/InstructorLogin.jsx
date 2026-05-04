import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function InstructorLogin() {
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

            await API.post("/Auth/instructor-login", {
                email: formData.email,
                password: formData.password
            });

            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("userType", "instructor");

            window.dispatchEvent(new Event("authChanged"));

            setSuccess("Instructor login successful.");
            setError("");

            setTimeout(() => {
                navigate("/instructor-dashboard");
            }, 700);
        } catch (err) {
            console.error(err);

            localStorage.removeItem("isLoggedIn");
            localStorage.removeItem("userType");

            window.dispatchEvent(new Event("authChanged"));

            setError("Invalid instructor email or password.");
            setSuccess("");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="card login-card">
            <h1>Instructor Login</h1>

            <p className="muted">
                Use your instructor account to access your teaching dashboard.
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
                    placeholder="instructor@email.com"
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

export default InstructorLogin;