import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";

function EditStudent() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        age: ""
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        const fetchStudent = async () => {
            try {
                const response = await API.get(`/Students/${id}`);

                setFormData({
                    name: response.data.name || "",
                    email: response.data.email || "",
                    age: response.data.age || ""
                });

                setError("");
            } catch {
                setError("Failed to load student.");
            } finally {
                setLoading(false);
            }
        };

        fetchStudent();
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
            await API.put(`/Students/${id}`, {
                name: formData.name,
                email: formData.email,
                age: Number(formData.age)
            });

            setSuccess("Student updated successfully.");
            setError("");

            setTimeout(() => {
                navigate("/students");
            }, 1000);
        } catch {
            setError("Failed to update student.");
            setSuccess("");
        }
    };

    if (loading) return <p>Loading student...</p>;

    return (
        <section className="card">
            <h1>Edit Student</h1>

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

                <button className="btn" type="submit">
                    Update Student
                </button>
            </form>
        </section>
    );
}

export default EditStudent;