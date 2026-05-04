import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";

function EditInstructor() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        officeLocation: "",
        bio: ""
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        const fetchInstructor = async () => {
            try {
                const response = await API.get(`/Instructors/${id}`);

                setFormData({
                    fullName: response.data.fullName || "",
                    email: response.data.email || "",
                    officeLocation: response.data.officeLocation || "",
                    bio: response.data.bio || ""
                });

                setError("");
            } catch {
                setError("Failed to load instructor.");
            } finally {
                setLoading(false);
            }
        };

        fetchInstructor();
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
            await API.put(`/Instructors/${id}`, {
                fullName: formData.fullName,
                email: formData.email,
                officeLocation: formData.officeLocation,
                bio: formData.bio
            });

            setSuccess("Instructor updated successfully.");
            setError("");

            setTimeout(() => {
                navigate("/instructors");
            }, 1000);
        } catch {
            setError("Failed to update instructor.");
            setSuccess("");
        }
    };

    if (loading) return <p>Loading instructor...</p>;

    return (
        <section className="card">
            <h1>Edit Instructor</h1>

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
                    Update Instructor
                </button>
            </form>
        </section>
    );
}

export default EditInstructor;