import { useEffect, useState } from "react";
import API from "../services/api";

function MyCourses() {
    const [enrollments, setEnrollments] = useState([]);
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

    const groupedCourses = enrollments.reduce((acc, enrollment) => {
        const courseKey = `${enrollment.courseId}-${enrollment.courseTitle}`;

        if (!acc[courseKey]) {
            acc[courseKey] = {
                courseId: enrollment.courseId,
                courseTitle: enrollment.courseTitle || "Unknown Course",
                students: []
            };
        }

        acc[courseKey].students.push(enrollment);
        return acc;
    }, {});

    const getGradeStyle = (grade) => {
        if (!grade || grade === "U") {
            return { color: "gray", fontWeight: "bold" };
        }

        if (grade === "A" || grade === "A+" || grade === "A-") {
            return { color: "green", fontWeight: "bold" };
        }

        if (grade === "F") {
            return { color: "red", fontWeight: "bold" };
        }

        return { color: "#555", fontWeight: "bold" };
    };

    const getStudentStatus = (student) => {
        if (!student.grade || student.grade === "U") {
            return "Waiting for Assignment";
        }

        if (!student.isGradeConfirmed) {
            return "Pending Confirmation";
        }

        return "Confirmed";
    };

    const getCourseStatus = (students) => {
        const hasMissingGrades = students.some(
            (student) => !student.grade || student.grade === "U"
        );

        if (hasMissingGrades) {
            return "Waiting for Assignment";
        }

        const allConfirmed = students.every((student) => student.isGradeConfirmed);

        if (allConfirmed) {
            return "Confirmed";
        }

        return "Pending Confirmation";
    };

    const confirmCourseGrades = async (courseId, courseTitle) => {
        const confirmAction = window.confirm(
            `Confirm all assigned final grades for ${courseTitle}?`
        );

        if (!confirmAction) return;

        try {
            await API.put("/Enrollments/confirm-course", {
                courseId: courseId
            });

            setEnrollments((prev) =>
                prev.map((enrollment) =>
                    enrollment.courseId === courseId &&
                        enrollment.grade &&
                        enrollment.grade !== "U"
                        ? { ...enrollment, isGradeConfirmed: true }
                        : enrollment
                )
            );

            setSuccess(`Final grades confirmed successfully for ${courseTitle}.`);
            setError("");
        } catch {
            setError("Failed to confirm course grades.");
            setSuccess("");
        }
    };

    if (loading) return <p>Loading results...</p>;

    return (
        <section className="card">
            <h1>Grade Confirmation</h1>
            <p>Review final grades grouped by course and confirm them.</p>

            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}

            {Object.keys(groupedCourses).length === 0 ? (
                <p>No enrollments found.</p>
            ) : (
                Object.values(groupedCourses).map((courseGroup) => {
                    const courseStatus = getCourseStatus(courseGroup.students);
                    const canConfirmCourse = courseStatus === "Pending Confirmation";

                    return (
                        <div className="info-card" key={courseGroup.courseId}>
                            <div className="page-header">
                                <div>
                                    <h2>{courseGroup.courseTitle}</h2>
                                    <p>
                                        Status: <strong>{courseStatus}</strong>
                                    </p>
                                </div>

                                {canConfirmCourse && (
                                    <button
                                        className="btn small"
                                        onClick={() =>
                                            confirmCourseGrades(
                                                courseGroup.courseId,
                                                courseGroup.courseTitle
                                            )
                                        }
                                    >
                                        Confirm Course Results
                                    </button>
                                )}
                            </div>

                            <table>
                                <thead>
                                    <tr>
                                        <th>Student</th>
                                        <th>Final Grade</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {courseGroup.students.map((student) => {
                                        const grade = student.grade || "U";
                                        const studentStatus = getStudentStatus(student);

                                        return (
                                            <tr key={`${student.studentId}-${student.courseId}`}>
                                                <td>{student.studentName}</td>
                                                <td style={getGradeStyle(grade)}>
                                                    {grade === "U" ? "-" : grade}
                                                </td>
                                                <td>{studentStatus}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    );
                })
            )}
        </section>
    );
}

export default MyCourses;