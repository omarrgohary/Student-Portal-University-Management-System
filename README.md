# University Management System (Full-Stack)

---

## Description

A full-stack web application designed to manage students, instructors, courses, and enrollments. The system implements a role-based workflow for grading, review, and approval.

---

<img width="1902" height="895" alt="image" src="https://github.com/user-attachments/assets/c4df2498-f1b4-4061-a204-0d7839c9a42a" />

---

## Overview

This system simulates a real-world academic environment where:

- Instructors assign grades
- Admins review and confirm final grades
- Students view their results with controlled visibility

The application ensures data integrity, secure workflows, and clear separation of responsibilities.

## Tech Stack

### Backend

- ASP.NET Core Web API
- Entity Framework Core
- MySQL
- JWT Authentication
- Role-Based Authorization

### Frontend

- React.js with Vite
- Axios for API integration
- Component-based UI architecture

## User Roles and Features

### Admin

- Manage students, instructors, courses, and enrollments
- View all enrollments grouped by course
- Confirm final grades
- Delete enrollments

### Instructor

- View assigned courses
- View enrolled students
- Assign grades: 7th, 12th, Prefinal, Final, and Final Grade
- Updating grades resets admin confirmation

### Student

- View enrolled courses
- View marks at all times
- View final grade only after admin confirmation

## Grading Workflow

Instructor assigns grades  
↓  
Student views marks  
↓  
Admin reviews grades  
↓  
Admin confirms grades  
↓  
Student views final grade  

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

```text
Backend/
├── Controllers/
├── Services/
├── Models/
├── DTOs/
└── Data/

Frontend/
├── pages/
├── components/
└── services/


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

Login 

<img width="1912" height="842" alt="image" src="https://github.com/user-attachments/assets/fc5c4c68-141f-49a8-9d21-701fa4d554c2" />
<img width="1917" height="730" alt="image" src="https://github.com/user-attachments/assets/e1f08de1-1ba5-43f3-bc7f-234de8ad6646" />
<img width="1918" height="695" alt="image" src="https://github.com/user-attachments/assets/05a5ed64-e219-4b63-820d-9c872f221f06" />

---

Dashboards
<img width="1892" height="903" alt="image" src="https://github.com/user-attachments/assets/4e14b680-a386-4cfe-b6b3-381d46120ce8" />
<img width="1896" height="898" alt="image" src="https://github.com/user-attachments/assets/6c6f6311-04b0-48db-b070-10566ccebc87" />
<img width="1897" height="897" alt="image" src="https://github.com/user-attachments/assets/78e5aa8c-a939-463d-8ecf-990fc22723b3" />

---

Student Results
<img width="1907" height="742" alt="image" src="https://github.com/user-attachments/assets/18128ce6-0b91-4530-9881-366ca44ac9fc" />

---

Available Courses for students
<img width="1893" height="880" alt="image" src="https://github.com/user-attachments/assets/52bf0170-212c-401c-9385-bcbb542e6e1c" />

---

Student Profile
<img width="1913" height="813" alt="image" src="https://github.com/user-attachments/assets/1850b8fa-2e1f-4e6e-8371-1def6e8f6f70" />

---

Instructor's Courses
<img width="1918" height="787" alt="image" src="https://github.com/user-attachments/assets/ffda3bc5-145d-47ab-9171-b23d40834fb9" />

---

Students enrolled in assigned courses
<img width="1898" height="897" alt="image" src="https://github.com/user-attachments/assets/550a8144-b64e-469e-ba85-3df3f47716e1" />

---

Display all students for admin
<img width="1908" height="873" alt="image" src="https://github.com/user-attachments/assets/57203170-4781-4951-b472-fb6b01854025" />

---

Display all instructors for admin
<img width="1903" height="877" alt="image" src="https://github.com/user-attachments/assets/9fae0742-bcae-40d9-9b9a-2c4750916356" />

---

Display all courses for admin with admin confirmation for the final grades
<img width="1882" height="895" alt="image" src="https://github.com/user-attachments/assets/139ff878-d362-4608-b359-c4d09230252f" />

---

Enrollments
<img width="1900" height="880" alt="image" src="https://github.com/user-attachments/assets/9f9a051e-4616-4a3f-9bc0-6fad79f99953" />

---

## Author  
Omar EL Gohary
- **LinkedIn:** [linkedin.com/in/omarelgohary2003](https://www.linkedin.com/in/omarelgohary2003/)
* **Email:** [omarrmgohary@gmail.com](mailto:omarrmgohary@gmail.com)

---

## License
This project is for educational purposes.
