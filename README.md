# University Management System (Full-Stack)

## Description
A full-stack web application designed to manage students, instructors, courses, and enrollments with a role-based workflow for grading and approval.

---

<img width="1902" height="895" alt="image" src="https://github.com/user-attachments/assets/c4df2498-f1b4-4061-a204-0d7839c9a42a" />

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
- POST /api/Auth/logout

### Enrollments
- GET /api/Enrollments  
- GET /api/Enrollments/my-courses  
- PUT /api/Enrollments/update-grades  
- PUT /api/Enrollments/confirm-course  
- DELETE /api/Enrollments/{studentId}/{courseId}

### Instructors
- GET /api/Instructors/me  
- GET /api/Instructors/my-courses  
- GET /api/Instructors/my-students  
- POST /api/Instructors

### Courses
- GET /api/Courses 
- POST /api/Courses 
- GET /api/Courses/{id}  
- PUT  /api/Courses/{id}
- DELETE /api/Courses/{id}

### Students
- GET /api/Students/me 
- PUT /api/Students/me 
- GET /api/Students  
- POST /api/Students
- GET /api/Students/{id}
- PUT /api/Students/{id}
- DELETE /api/Students/{id}

---

## Screenshots

<img width="1912" height="842" alt="image" src="https://github.com/user-attachments/assets/fc5c4c68-141f-49a8-9d21-701fa4d554c2" />
<img width="1917" height="730" alt="image" src="https://github.com/user-attachments/assets/e1f08de1-1ba5-43f3-bc7f-234de8ad6646" />
<img width="1918" height="695" alt="image" src="https://github.com/user-attachments/assets/05a5ed64-e219-4b63-820d-9c872f221f06" />




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
