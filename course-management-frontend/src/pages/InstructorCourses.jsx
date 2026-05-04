import { useEffect, useState } from "react";
import API from "../services/api";

function InstructorCourses() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchMyCourses = async () => {
            try {
                setLoading(true);

                const response = await API.get("/Instructors/my-courses");

                setCourses(response.data);
                setError("");
            } catch {
                setError("Failed to load your courses.");
            } finally {
                setLoading(false);
            }
        };

        fetchMyCourses();
    }, []);

    if (loading) return <p>Loading your courses...</p>;

    return (
        <section className="card">
            <h1>My Courses</h1>
            <p>Courses assigned to you as an instructor.</p>

            {error && <p className="error">{error}</p>}

            {courses.length === 0 ? (
                <p>No courses assigned to you yet.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Course Title</th>
                            <th>Description</th>
                            <th>Credit Hours</th>
                        </tr>
                    </thead>

                    <tbody>
                        {courses.map((course) => (
                            <tr key={course.id}>
                                <td>{course.title}</td>
                                <td>{course.description}</td>
                                <td>{course.creditHours}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </section>
    );
}

export default InstructorCourses;