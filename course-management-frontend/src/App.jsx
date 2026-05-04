import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import StudentLogin from "./pages/StudentLogin";

import Dashboard from "./pages/Dashboard";
import StudentDashboard from "./pages/StudentDashboard";

import CoursesList from "./pages/CoursesList";
import CreateCourse from "./pages/CreateCourse";
import EditCourse from "./pages/EditCourse";

import InstructorsList from "./pages/InstructorsList";
import CreateInstructor from "./pages/CreateInstructor";
import EditInstructor from "./pages/EditInstructor";

import StudentsList from "./pages/StudentsList";
import CreateStudent from "./pages/CreateStudent";
import EditStudent from "./pages/EditStudent";

import EnrollmentsList from "./pages/EnrollmentsList";
import CreateEnrollment from "./pages/CreateEnrollment";

import StudentProfile from "./pages/StudentProfile";

import AvailableCourses from "./pages/AvailableCourses";

import MyCourses from "./pages/MyCourses";

import InstructorLogin from "./pages/InstructorLogin";
import InstructorDashboard from "./pages/InstructorDashboard";
import InstructorCourses from "./pages/InstructorCourses";
import InstructorProfile from "./pages/InstructorProfile";
import InstructorStudents from "./pages/InstructorStudents";

function App() {
    return (
        <>
            <Navbar />

            <main className="container">
                <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<Home />} />
                    <Route path="/admin-login" element={<Login />} />
                    <Route path="/student-login" element={<StudentLogin />} />
                    <Route path="/instructor-login" element={<InstructorLogin />} />

                    {/* Admin Routes */}
                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute allowedUserType="admin">
                                <Dashboard />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/courses"
                        element={
                            <ProtectedRoute allowedUserType="admin">
                                <CoursesList />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/courses/new"
                        element={
                            <ProtectedRoute allowedUserType="admin">
                                <CreateCourse />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/courses/edit/:id"
                        element={
                            <ProtectedRoute allowedUserType="admin">
                                <EditCourse />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/instructors"
                        element={
                            <ProtectedRoute allowedUserType="admin">
                                <InstructorsList />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/instructors/new"
                        element={
                            <ProtectedRoute allowedUserType="admin">
                                <CreateInstructor />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/instructors/edit/:id"
                        element={
                            <ProtectedRoute allowedUserType="admin">
                                <EditInstructor />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/students"
                        element={
                            <ProtectedRoute allowedUserType="admin">
                                <StudentsList />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/students/new"
                        element={
                            <ProtectedRoute allowedUserType="admin">
                                <CreateStudent />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/students/edit/:id"
                        element={
                            <ProtectedRoute allowedUserType="admin">
                                <EditStudent />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/enrollments"
                        element={
                            <ProtectedRoute allowedUserType="admin">
                                <EnrollmentsList />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/enrollments/new"
                        element={
                            <ProtectedRoute allowedUserType="admin">
                                <CreateEnrollment />
                            </ProtectedRoute>
                        }
                    />

                    {/* Student Routes */}
                    <Route
                        path="/student-dashboard"
                        element={
                            <ProtectedRoute allowedUserType="student">
                                <StudentDashboard />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/student-profile"
                        element={
                            <ProtectedRoute allowedUserType="student">
                                <StudentProfile />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/available-courses"
                        element={
                            <ProtectedRoute allowedUserType="student">
                                <AvailableCourses />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/my-courses"
                        element={
                            <ProtectedRoute allowedUserType="student">
                                <MyCourses />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/instructor-dashboard"
                        element={
                            <ProtectedRoute allowedUserType="instructor">
                                <InstructorDashboard />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/instructor-courses"
                        element={
                            <ProtectedRoute allowedUserType="instructor">
                                <InstructorCourses />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/instructor-profile"
                        element={
                            <ProtectedRoute allowedUserType="instructor">
                                <InstructorProfile />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/instructor-students"
                        element={
                            <ProtectedRoute allowedUserType="instructor">
                                <InstructorStudents />
                            </ProtectedRoute>
                        }
                    />


                </Routes>
            </main>
        </>
    );
}

export default App;