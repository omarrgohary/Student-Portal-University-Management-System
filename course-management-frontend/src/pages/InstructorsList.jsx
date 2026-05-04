import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

function InstructorsList() {
    const [instructors, setInstructors] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchInstructors = async () => {
            try {
                setLoading(true);
                const response = await API.get("/Instructors");
                setInstructors(response.data);
                setError("");
            } catch {
                setError("Failed to load instructors.");
            } finally {
                setLoading(false);
            }
        };

        fetchInstructors();
    }, []);

    const filteredInstructors = instructors.filter((instructor) =>
        instructor.fullName
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase())
    );

    const deleteInstructor = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this instructor?"
        );

        if (!confirmDelete) return;

        try {
            await API.delete(`/Instructors/${id}`);
            setInstructors(instructors.filter((instructor) => instructor.id !== id));
        } catch {
            setError("Failed to delete instructor.");
        }
    };

    if (loading) return <p>Loading instructors...</p>;

    return (
        <section className="card">
            <div className="page-header">
                <h1>Instructors</h1>

                <Link className="btn" to="/instructors/new">
                    Add Instructor
                </Link>
            </div>

            <div className="search-box">
                <input
                    type="text"
                    placeholder="Search by instructor name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {error && <p className="error">{error}</p>}

            {filteredInstructors.length === 0 ? (
                <p>No instructors found.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Full Name</th>
                            <th>Email</th>
                            <th>Office Location</th>
                            <th>Bio</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filteredInstructors.map((instructor) => (
                            <tr key={instructor.id}>
                                <td>{instructor.fullName}</td>
                                <td>{instructor.email}</td>
                                <td>{instructor.officeLocation}</td>
                                <td>{instructor.bio}</td>
                                <td>
                                    <Link
                                        className="btn small"
                                        to={`/instructors/edit/${instructor.id}`}
                                    >
                                        Edit
                                    </Link>

                                    <button
                                        className="btn danger small"
                                        onClick={() => deleteInstructor(instructor.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </section>
    );
}

export default InstructorsList;