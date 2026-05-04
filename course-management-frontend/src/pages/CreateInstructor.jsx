import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function CreateInstructor() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        officeLocation: "",
        bio: ""
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await API.post("/Instructors", {
                fullName: formData.fullName,
                email: formData.email,
                password: formData.password,
                officeLocation: formData.officeLocation,
                bio: formData.bio
            });

            setSuccess("Instructor created successfully.");
            setError("");

            setTimeout(() => {
                navigate("/instructors");
            }, 1000);
        } catch {
            setError("Failed to create instructor.");
            setSuccess("");
        }
    };

    return (
        <section className="card">
            <h1>Add New Instructor</h1>

            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}

            <form onSubmit={handleSubmit}>
                <label>Full Name</label>
                <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
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

                <label>Password</label>
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    minLength="6"
                    required
                />

                <label>Office Location</label>
                <input
                    type="text"
                    name="officeLocation"
                    value={formData.officeLocation}
                    onChange={handleChange}
                    required
                />

                <label>Bio</label>
                <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                />

                <button className="btn" type="submit">
                    Create Instructor
                </button>
            </form>
        </section>
    );
}

export default CreateInstructor;