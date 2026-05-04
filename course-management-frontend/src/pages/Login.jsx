import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Login() {
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

            await API.post(
                "/Auth/login",
                {
                    email: formData.email,
                    password: formData.password
                },
                {
                    withCredentials: true // important for cookies
                }
            );

            // ? Set admin role correctly
            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("userType", "admin");

            window.dispatchEvent(new Event("authChanged"));

            setSuccess("Admin login successful.");
            setError("");

            setTimeout(() => {
                navigate("/dashboard");
            }, 700);
        } catch (err) {
            console.error(err);

            localStorage.removeItem("isLoggedIn");
            localStorage.removeItem("userType");

            window.dispatchEvent(new Event("authChanged"));

            setError("Invalid admin email or password.");
            setSuccess("");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="card login-card">
            <h1>Admin Login</h1>

            <p className="muted">
                Use your admin account to access the management dashboard.
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
                    placeholder="admin@test.com"
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

export default Login;