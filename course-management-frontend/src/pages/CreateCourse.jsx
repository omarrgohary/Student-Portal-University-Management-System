import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function CreateCourse() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        creditHours: "",
        instructorId: ""
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
            await API.post("/Courses", {
                title: formData.title,
                description: formData.description,
                creditHours: Number(formData.creditHours),
                instructorId: Number(formData.instructorId)
            });

            setSuccess("Course created successfully.");
            setError("");

            setTimeout(() => {
                navigate("/courses");
            }, 1000);
        } catch {
            setError("Failed to create course. Make sure Instructor ID exists.");
            setSuccess("");
        }
    };

    return (
        <section className="card">
            <h1>Add New Course</h1>

            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}

            <form onSubmit={handleSubmit}>
                <label>Course Title</label>
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                />

                <label>Description</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                />

                <label>Credit Hours</label>
                <input
                    type="number"
                    name="creditHours"
                    value={formData.creditHours}
                    onChange={handleChange}
                    min="1"
                    max="6"
                    required
                />

                <label>Instructor ID</label>
                <input
                    type="number"
                    name="instructorId"
                    value={formData.instructorId}
                    onChange={handleChange}
                    required
                />

                <button className="btn" type="submit">
                    Create Course
                </button>
            </form>
        </section>
    );
}

export default CreateCourse;