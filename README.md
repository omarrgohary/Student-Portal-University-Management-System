# University Management System (Full-Stack)

## Description
A full-stack web application designed to manage students, instructors, courses, and enrollments with a role-based workflow for grading and approval.

---

## Overview
This system simulates a real-world academic environment where:

- Instructors assign grades  
- Admins review and confirm final grades  
- Students view their results with controlled visibility  

The application ensures data integrity, secure workflows, and clear separation of responsibilities.

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
- Confirm final grades  
- Delete enrollments  

### Instructor
- View assigned courses  
- View enrolled students  
- Assign grades (7th, 12th, Prefinal, Final, Final Grade)  
- Updating grades resets admin confirmation  

### Student
- View enrolled courses  
- View marks at all times  
- View final grade only after admin confirmation  

---

## Grading Workflow


Instructor assigns grades → Student sees marks → Admin reviews → Admin confirms → Student sees final grade


If grades are updated:

Grades updated → Confirmation reset → Student sees "Pending"


---

## Security Features

- JWT-based authentication  
- Role-based authorization  
- Protected API endpoints  
- Server-side validation  

---

## Project Structure


Backend/
Controllers/
Services/
Models/
DTOs/
Data/

Frontend/
pages/
components/
services/


---

## Setup Instructions

### Backend
Run:

cd Backend
dotnet restore
dotnet ef database update
dotnet run


### Frontend
Run:

cd Frontend
npm install
npm run dev


---

## API Endpoints

### Authentication
- POST /api/Auth/login  
- POST /api/Auth/student-login  
- POST /api/Auth/instructor-login  

### Enrollments
- GET /api/Enrollments  
- GET /api/Enrollments/my-courses  
- PUT /api/Enrollments/update-grades  
- PUT /api/Enrollments/confirm-course  
- DELETE /api/Enrollments/{studentId}/{courseId}  

---

## Screenshots

### Home Page
![Home](screenshots/home.png)

### List Page
![List](screenshots/list.png)

### Create Page
![Create](screenshots/create.png)

### Details Page
![Details](screenshots/details.png)

---

## Author
Omar El Gohary

---

## License
This project is for educational purposes.
