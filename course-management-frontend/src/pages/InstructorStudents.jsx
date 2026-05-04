import { useEffect, useState } from "react";
import API from "../services/api";

function InstructorStudents() {
    const [groupedStudents, setGroupedStudents] = useState({});
    const [loading, setLoading] = useState(true);
    const [savingKey, setSavingKey] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const gradeOptions = ["U", "A", "B", "C", "D", "F"];

    const groupByCourse = (data) => {
        return data.reduce((acc, enrollment) => {
            const courseTitle = enrollment.courseTitle || "Unknown Course";

            if (!acc[courseTitle]) {
                acc[courseTitle] = [];
            }

            acc[courseTitle].push({
                ...enrollment,
                seventh: enrollment.seventh ?? "",
                twelfth: enrollment.twelfth ?? "",
                prefinal: enrollment.prefinal ?? "",
                final: enrollment.final ?? "",
                grade: enrollment.grade || "U"
            });

            return acc;
        }, {});
    };

    useEffect(() => {
        const fetchMyStudents = async () => {
            try {
                setLoading(true);

                const response = await API.get("/Instructors/my-students");
                setGroupedStudents(groupByCourse(response.data));

                setError("");
            } catch {
                setError("Failed to load your students.");
            } finally {
                setLoading(false);
            }
        };

        fetchMyStudents();
    }, []);

    const handleGradeInputChange = (courseTitle, studentId, courseId, field, value) => {
        setGroupedStudents((prev) => ({
            ...prev,
            [courseTitle]: prev[courseTitle].map((student) =>
                student.studentId === studentId && student.courseId === courseId
                    ? { ...student, [field]: value }
                    : student
            )
        }));
    };

    const saveGrades = async (courseTitle, student) => {
        const rowKey = `${student.studentId}-${student.courseId}`;

        try {
            setSavingKey(rowKey);

            await API.put("/Enrollments/update-grades", {
                studentId: student.studentId,
                courseId: student.courseId,
                seventh: student.seventh === "" ? null : Number(student.seventh),
                twelfth: student.twelfth === "" ? null : Number(student.twelfth),
                prefinal: student.prefinal === "" ? null : Number(student.prefinal),
                final: student.final === "" ? null : Number(student.final),
                grade: student.grade || "U"

            });



            setSuccess("Grades updated successfully.");
            setError("");
        } catch {
            setError("Failed to update grades.");
            setSuccess("");
        } finally {
            setSavingKey("");
        }
    };

    if (loading) return <p>Loading your students...</p>;

    return (
        <section className="card">
            <h1>My Students</h1>
            <p>Students enrolled in your assigned courses.</p>

            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}

            {Object.keys(groupedStudents).length === 0 ? (
                <p>No students enrolled in your courses yet.</p>
            ) : (
                Object.entries(groupedStudents).map(([courseTitle, students]) => (
                    <div className="info-card" key={courseTitle}>
                        <h2>{courseTitle}</h2>

                        <table>
                            <thead>
                                <tr>
                                    <th>Student Name</th>
                                    <th>7th</th>
                                    <th>12th</th>
                                    <th>Prefinal</th>
                                    <th>Final</th>
                                    <th>Grade</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {students.map((student) => {
                                    const rowKey = `${student.studentId}-${student.courseId}`;

                                    return (
                                        <tr key={rowKey}>
                                            <td>{student.studentName}</td>

                                            <td>
                                                <input
                                                    type="number"
                                                    min="0"
                                                    max="100"
                                                    value={student.seventh}
                                                    onChange={(e) =>
                                                        handleGradeInputChange(
                                                            courseTitle,
                                                            student.studentId,
                                                            student.courseId,
                                                            "seventh",
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </td>

                                            <td>
                                                <input
                                                    type="number"
                                                    min="0"
                                                    max="100"
                                                    value={student.twelfth}
                                                    onChange={(e) =>
                                                        handleGradeInputChange(
                                                            courseTitle,
                                                            student.studentId,
                                                            student.courseId,
                                                            "twelfth",
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </td>

                                            <td>
                                                <input
                                                    type="number"
                                                    min="0"
                                                    max="100"
                                                    value={student.prefinal}
                                                    onChange={(e) =>
                                                        handleGradeInputChange(
                                                            courseTitle,
                                                            student.studentId,
                                                            student.courseId,
                                                            "prefinal",
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </td>

                                            <td>
                                                <input
                                                    type="number"
                                                    min="0"
                                                    max="100"
                                                    value={student.final}
                                                    onChange={(e) =>
                                                        handleGradeInputChange(
                                                            courseTitle,
                                                            student.studentId,
                                                            student.courseId,
                                                            "final",
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </td>

                                            <td>
                                                <select
                                                    value={student.grade}
                                                    onChange={(e) =>
                                                        handleGradeInputChange(
                                                            courseTitle,
                                                            student.studentId,
                                                            student.courseId,
                                                            "grade",
                                                            e.target.value
                                                        )
                                                    }
                                                >
                                                    {gradeOptions.map((grade) => (
                                                        <option key={grade} value={grade}>
                                                            {grade}
                                                        </option>
                                                    ))}
                                                </select>
                                            </td>

                                            <td>
                                                <button
                                                    className="btn small"
                                                    onClick={() => saveGrades(courseTitle, student)}
                                                    disabled={savingKey === rowKey}
                                                >
                                                    {savingKey === rowKey ? "Saving..." : "Save"}
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                ))
            )}
        </section>
    );
}

export default InstructorStudents;