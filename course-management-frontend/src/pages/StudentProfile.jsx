import { useEffect, useState } from "react";
import API from "../services/api";

function StudentProfile() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        age: ""
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await API.get("/Students/me");

                setFormData({
                    name: response.data.name || "",
                    email: response.data.email || "",
                    age: response.data.age || ""
                });

                setError("");
            } catch {
                setError("Failed to load profile.");
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setSaving(true);

            await API.put("/Students/me", {
                name: formData.name,
                email: formData.email,
                age: Number(formData.age)
            });

            setSuccess("Profile updated successfully.");
            setError("");
        } catch {
            setError("Failed to update profile.");
            setSuccess("");
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <p>Loading profile...</p>;

    return (
        <section className="card">
            <h1>My Profile</h1>
            <p>View and update your authenticated student information.</p>

            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}

            <form onSubmit={handleSubmit}>
                <label>Name</label>
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

                <button className="btn" type="submit" disabled={saving}>
                    {saving ? "Saving..." : "Update Profile"}
                </button>
            </form>
        </section>
    );
}

export default StudentProfile;