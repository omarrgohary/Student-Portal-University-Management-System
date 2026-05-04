import { useEffect, useState } from "react";
import API from "../services/api";

function InstructorProfile() {
    const [instructor, setInstructor] = useState(null);
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        officeLocation: "",
        bio: ""
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await API.get("/Instructors/me");

                setInstructor(res.data);
                setFormData({
                    fullName: res.data.fullName || "",
                    email: res.data.email || "",
                    officeLocation: res.data.officeLocation || "",
                    bio: res.data.bio || ""
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

            await API.put(`/Instructors/${instructor.id}`, {
                fullName: formData.fullName,
                email: formData.email,
                officeLocation: formData.officeLocation,
                bio: formData.bio
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
            <p>View and update your instructor information.</p>

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
                />

                <label>Bio</label>
                <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    rows="4"
                />

                <button className="btn" type="submit" disabled={saving}>
                    {saving ? "Saving..." : "Update Profile"}
                </button>
            </form>
        </section>
    );
}

export default InstructorProfile;