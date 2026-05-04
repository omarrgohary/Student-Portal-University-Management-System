import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";

function EditCourse() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        creditHours: "",
        instructorId: ""
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const response = await API.get(`/Courses/${id}`);

                setFormData({
                    title: response.data.title || response.data.name || response.data.courseName || "",
                    description: response.data.description || "",
                    creditHours: response.data.creditHours || "",
                    instructorId: response.data.instructorId || ""
                });

                setError("");
            } catch {
                setError("Failed to load course.");
            } finally {
                setLoading(false);
            }
        };

        fetchCourse();
    }, [id]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await API.put(`/Courses/${id}`, {
                title: formData.title,
                description: formData.description,
                creditHours: Number(formData.creditHours),
                instructorId: Number(formData.instructorId)
            });

            setSuccess("Course updated successfully.");
            setError("");

            setTimeout(() => {
                navigate("/courses");
            }, 1000);
        } catch {
            setError("Failed to update course. Make sure Instructor ID exists.");
            setSuccess("");
        }
    };

    if (loading) return <p>Loading course...</p>;

    return (
        <section className="card">
            <h1>Edit Course</h1>

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
                    Update Course
                </button>
            </form>
        </section>
    );
}

export default EditCourse;