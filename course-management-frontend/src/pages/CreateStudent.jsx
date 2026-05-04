import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function CreateStudent() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        age: "",
        password: "" // ? added
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

            await API.post("/Students", {
                name: formData.name,
                email: formData.email,
                age: Number(formData.age),
                password: formData.password // ? required by backend
            });

            setSuccess("Student created successfully.");
            setError("");

            setTimeout(() => {
                navigate("/students");
            }, 800);
        } catch (err) {
            console.error(err);
            setError("Failed to create student. Make sure you are logged in as admin.");
            setSuccess("");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="card">
            <h1>Add New Student</h1>

            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}

            <form onSubmit={handleSubmit}>
                <label>Student Name</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    minLength="3"
                    required
                />

                <label>Email</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />

                <label>Age</label>
                <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    min="16"
                    max="100"
                    required
                />

                <label>Password</label>
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    minLength="6"
                    required
                />

                <button className="btn" type="submit" disabled={loading}>
                    {loading ? "Creating..." : "Create Student"}
                </button>
            </form>
        </section>
    );
}

export default CreateStudent;