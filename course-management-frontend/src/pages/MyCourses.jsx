import { useEffect, useState } from "react";
import API from "../services/api";

function MyCourses() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchMyCourses = async () => {
            try {
                setLoading(true);
                const response = await API.get("/Enrollments/my-courses");
                setCourses(response.data);
                setError("");
            } catch (err) {
                console.error(err);
                setError("Failed to load your courses.");
            } finally {
                setLoading(false);
            }
        };

        fetchMyCourses();
    }, []);

    const displayValue = (value) => {
        return value === null || value === undefined || value === "" ? "-" : value;
    };

    const getGradeStyle = (grade) => {
        if (!grade || grade === "U") {
            return { color: "gray", fontWeight: "bold" };
        }

        if (grade.startsWith("A")) {
            return { color: "green", fontWeight: "bold" };
        }

        if (grade === "F") {
            return { color: "red", fontWeight: "bold" };
        }

        return { color: "#555", fontWeight: "bold" };
    };

    const getFinalGradeDisplay = (course) => {
        if (!course.grade || course.grade === "U") {
            return { text: "-", style: { color: "gray" } };
        }

        if (!course.isGradeConfirmed) {
            return {
                text: "U",
                style: { color: "black", fontWeight: "bold" }
            };
        }

        return {
            text: course.grade,
            style: getGradeStyle(course.grade)
        };
    };

    if (loading) return <p>Loading your results...</p>;

    return (
        <section className="card">
            <h1>Results</h1>
            <p>Courses you are currently enrolled in.</p>

            {error && <p className="error">{error}</p>}

            {courses.length === 0 ? (
                <p>You are not enrolled in any courses yet.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Course</th>
                            <th>7th</th>
                            <th>12th</th>
                            <th>Prefinal</th>
                            <th>Final</th>
                            <th>Final Grade</th>
                        </tr>
                    </thead>

                    <tbody>
                        {courses.map((course) => {
                            const finalGrade = getFinalGradeDisplay(course);

                            return (
                                <tr key={`${course.studentId}-${course.courseId}`}>
                                    <td>{course.courseTitle}</td>

                                    {/* Always visible */}
                                    <td>{displayValue(course.seventh)}</td>
                                    <td>{displayValue(course.twelfth)}</td>
                                    <td>{displayValue(course.prefinal)}</td>
                                    <td>{displayValue(course.final)}</td>

                                    {/* Controlled by admin confirmation */}
                                    <td style={finalGrade.style}>{finalGrade.text}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            )}
        </section>
    );
}

export default MyCourses;