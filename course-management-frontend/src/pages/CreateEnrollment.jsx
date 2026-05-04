import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function CreateEnrollment() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        studentId: "",
        courseId: ""
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
            await API.post("/Enrollments", {
                studentId: Number(formData.studentId),
                courseId: Number(formData.courseId)
            });

            setSuccess("Enrollment created successfully.");
            setError("");

            setTimeout(() => {
                navigate("/enrollments");
            }, 1000);
        } catch {
            setError("Failed to create enrollment. Check IDs.");
            setSuccess("");
        }
    };

    return (
        <section className="card">
            <h1>Add New Enrollment</h1>

            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}

            <form onSubmit={handleSubmit}>
                <label>Student ID</label>
                <input
                    type="number"
                    name="studentId"
                    value={formData.studentId}
                    onChange={handleChange}
                    required
                />

                <label>Course ID</label>
                <input
                    type="number"
                    name="courseId"
                    value={formData.courseId}
                    onChange={handleChange}
                    required
                />

                <button className="btn" type="submit">
                    Create Enrollment
                </button>
            </form>
        </section>
    );
}

export default CreateEnrollment;