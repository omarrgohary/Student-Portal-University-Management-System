import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

function StudentsList() {
    const [students, setStudents] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                setLoading(true);
                const response = await API.get("/Students");
                setStudents(response.data);
                setError("");
            } catch {
                setError("Failed to load students.");
            } finally {
                setLoading(false);
            }
        };

        fetchStudents();
    }, []);

    const filteredStudents = students.filter((student) =>
        student.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const deleteStudent = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this student?"
        );
        if (!confirmDelete) return;

        try {
            await API.delete(`/Students/${id}`);
            setStudents(students.filter((student) => student.id !== id));
        } catch {
            setError("Failed to delete student.");
        }
    };

    if (loading) return <p>Loading students...</p>;

    return (
        <section className="card">
            <div className="page-header">
                <h1>Students</h1>

                <Link className="btn" to="/students/new">
                    Add Student
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

            {filteredStudents.length === 0 ? (
                <p>No students found.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Student Name</th>
                            <th>Email</th>
                            <th>Age</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filteredStudents.map((student) => (
                            <tr key={student.id}>
                                <td>{student.name}</td>
                                <td>{student.email}</td>
                                <td>{student.age}</td>

                                <td>
                                    <Link
                                        className="btn small"
                                        to={`/students/edit/${student.id}`}
                                    >
                                        Edit
                                    </Link>

                                    <button
                                        className="btn danger small"
                                        onClick={() => deleteStudent(student.id)}
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

export default StudentsList;