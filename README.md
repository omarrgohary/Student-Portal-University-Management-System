# University Management System (Full-Stack)

A full-stack web application designed to manage students, instructors, courses, and enrollments with a role-based workflow for grading and approval.

---

## Overview

This system simulates a real-world academic environment where:

- Instructors assign grades  
- Admins review and confirm final grades  
- Students view their results with controlled visibility  

The application ensures data integrity, secure workflows, and a clear separation of responsibilities.

---

## Tech Stack

### Backend
- ASP.NET Core Web API  
- Entity Framework Core  
- MySQL  
- JWT Authentication  
- Role-Based Authorization  

### Frontend
- React.js (Vite)  
- Axios for API integration  
- Component-based UI architecture  

---

## User Roles and Features

### Admin
- Manage students, instructors, courses, and enrollments  
- View all enrollments grouped by course  
- Confirm final grades at the course level  
- Delete enrollments  

### Instructor
- View assigned courses  
- View enrolled students  
- Assign grades including:
  - 7th grade  
  - 12th grade  
  - Prefinal  
  - Final exam mark  
  - Final letter grade  
- Updating grades resets admin confirmation  

### Student
- View enrolled courses  
- View marks (7th, 12th, Prefinal, Final) at all times  
- View final grade only after admin confirmation  

---

## Grading Workflow


Instructor assigns grades
↓
Student sees marks (without final grade)
↓
Admin reviews grades
↓
Admin confirms course
↓
Student sees final grade


If the instructor updates any grade:


Grade updated → Confirmation reset → Student sees "Pending"


---

## Security Features

- JWT-based authentication  
- Role-based authorization (Admin, Instructor, Student)  
- Protected API endpoints  
- Prevention of insecure direct object reference (IDOR):
  - Course-level confirmation  
  - Server-side validation  

---

## Project Structure


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


---

## Setup Instructions

### Backend
```bash
cd Backend
dotnet restore
dotnet ef database update
dotnet run

--

Frontend
cd Frontend
npm install
npm run dev

--

API Endpoints

--

Authentication
Method	Endpoint	Description
POST	/api/Auth/login	Admin login
POST	/api/Auth/student-login	Student login
POST	/api/Auth/instructor-login	Instructor login

--

Enrollments
Method	Endpoint	Description
GET	/api/Enrollments	Get all enrollments
GET	/api/Enrollments/my-courses	Get user courses
PUT	/api/Enrollments/update-grades	Update grades
PUT	/api/Enrollments/confirm-course	Confirm course grades
DELETE	/api/Enrollments/{studentId}/{courseId}	Delete enrollment

--

Key Features
Role-based access control
Structured grading workflow
Dynamic data updates across roles
Scalable architecture
Future Enhancements
GPA calculation
Transcript export (PDF)
Notification system
Audit logging
Pagination and filtering
Author

Omar El Gohary

License

This project is intended for educational purposes.
