🎓 University Management System (Full-Stack)

A full-stack web application designed to manage students, instructors, courses, and enrollments with a role-based workflow for grading and approval.

🚀 Overview

This system simulates a real-world academic environment where:

👨‍🏫 Instructors assign grades
🧑‍💼 Admins review and confirm final grades
🎓 Students view their results (with controlled visibility)

The application ensures data integrity, secure workflows, and clear separation of responsibilities.

🏗️ Tech Stack
Backend
ASP.NET Core Web API
Entity Framework Core
MySQL
JWT Authentication
Role-Based Authorization
Frontend
React.js (Vite)
Axios API integration
Modern component-based UI
👥 User Roles & Features
🔐 Admin
Manage students, instructors, courses, enrollments
View all enrollments grouped by course
Confirm final grades (course-level confirmation)
Delete enrollments
👨‍🏫 Instructor
View assigned courses
View enrolled students
Assign:
7th grade
12th grade
Prefinal
Final exam mark
Final letter grade
Updating grades resets admin confirmation
🎓 Student
View enrolled courses
See:
7th, 12th, Prefinal, Final marks (always visible)
Final grade (only after admin confirmation)
🔄 Grading Workflow
Instructor assigns grades
        ↓
Student sees marks (NOT final grade)
        ↓
Admin reviews grades
        ↓
Admin confirms course
        ↓
Student sees final grade

If instructor updates any grade:

Grade changes → Confirmation reset → Student sees "Pending"
🔒 Security Features
JWT-based authentication
Role-based authorization (Admin / Instructor / Student)
Protected endpoints
Prevention of IDOR (Indirect Object Reference) by:
Using course-level confirmation instead of direct record manipulation
Server-side validation
📁 Project Structure
Backend/
 ├── Controllers/
 ├── Services/
 ├── Models/
 ├── DTOs/
 ├── Data/

Frontend/
 ├── pages/
 ├── components/
 ├── services/
⚙️ Setup Instructions
🔧 Backend
cd Backend
dotnet restore
dotnet ef database update
dotnet run
💻 Frontend
cd Frontend
npm install
npm run dev
🔑 Authentication Endpoints
POST /api/Auth/login            → Admin login
POST /api/Auth/student-login    → Student login
POST /api/Auth/instructor-login → Instructor login
📌 Key API Endpoints
Enrollments
GET    /api/Enrollments
GET    /api/Enrollments/my-courses
PUT    /api/Enrollments/update-grades
PUT    /api/Enrollments/confirm-course
DELETE /api/Enrollments/{studentId}/{courseId}
✨ Highlights
Clean separation of roles
Real-world grading workflow
Dynamic UI updates
Data consistency across roles
Scalable architecture
📷 Screenshots (Optional)

Add screenshots here before submission:

Admin Dashboard
Instructor Grading Page
Student Results Page
📌 Future Improvements
GPA calculation
Transcript export (PDF)
Notifications system
Audit logs for grade changes
Pagination & filtering
👩‍💻 Author

Omar El Gohary

📄 License

This project is for educational purposes.
