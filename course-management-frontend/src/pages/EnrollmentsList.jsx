import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

function EnrollmentsList() {
    const [enrollments, setEnrollments] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        const fetchEnrollments = async () => {
            try {
                setLoading(true);
                const response = await API.get("/Enrollments");
                setEnrollments(response.data);
                setError("");
            } catch {
                setError("Failed to load enrollments.");
            } finally {
                setLoading(false);
            }
        };

        fetchEnrollments();
    }, []);

    const filteredEnrollments = enrollments.filter((enrollment) =>
        enrollment.studentName?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const deleteEnrollment = async (studentId, courseId) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this enrollment?"
        );

        if (!confirmDelete) return;

        try {
            await API.delete(`/Enrollments/${studentId}/${courseId}`);

            setEnrollments(
                enrollments.filter(
                    (e) => !(e.studentId === studentId && e.courseId === courseId)
                )
            );

            setSuccess("Enrollment deleted successfully.");
            setError("");
        } catch {
            setError("Failed to delete enrollment.");
            setSuccess("");
        }
    };

    if (loading) return <p>Loading enrollments...</p>;

    return (
        <section className="card">
            <div className="page-header">
                <h1>Enrollments</h1>

                <Link className="btn" to="/enrollments/new">
                    Add Enrollment
                </Link>
            </div>

            <div className="search-box">
                <input
                    type="text"
                    placeholder="Search by student name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}

            {filteredEnrollments.length === 0 ? (
                <p>No enrollments found.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Student</th>
                            <th>Course</th>
                            <th>Enrolled At</th>
                            <th>Grade</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filteredEnrollments.map((e) => (
                            <tr key={`${e.studentId}-${e.courseId}`}>
                                <td>{e.studentName}</td>
                                <td>{e.courseTitle}</td>
                                <td>{new Date(e.enrolledAt).toLocaleString()}</td>
                                <td>{e.grade || "U"}</td>

                                <td>
                                    <button
                                        className="btn danger small"
                                        onClick={() => deleteEnrollment(e.studentId, e.courseId)}
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

export default EnrollmentsList;