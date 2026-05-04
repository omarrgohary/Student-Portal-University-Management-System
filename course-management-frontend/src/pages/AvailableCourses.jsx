import { useEffect, useState } from "react";
import API from "../services/api";

function AvailableCourses() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                setLoading(true);

                const response = await API.get("/Courses");

                setCourses(response.data);
                setError("");
            } catch {
                setError("Failed to load available courses.");
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);

    if (loading) return <p>Loading available courses...</p>;

    return (
        <section className="card">
            <h1>Available Courses</h1>
            <p>Browse all available courses and view their instructor names.</p>

            {error && <p className="error">{error}</p>}

            <table>
                <thead>
                    <tr>
                        <th>Course Title</th>
                        <th>Description</th>
                        <th>Credit Hours</th>
                        <th>Instructor</th>
                    </tr>
                </thead>

                <tbody>
                    {courses.map((course) => (
                        <tr key={course.id}>
                            <td>{course.title}</td>
                            <td>{course.description}</td>
                            <td>{course.creditHours}</td>
                            <td>{course.instructorName}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    );
}

export default AvailableCourses;