# Coaching Program Management System

## Overview

This application is designed to manage coaching programs, users, and their enrollments. It provides an admin interface for managing coaching programs, users, and companies, as well as a user interface for coaches and employees to interact with the system.

## Features

- **User Management**: Admins can create, update, and delete users, assigning roles such as admin, coach, and employee.
- **Coaching Program Management**: Admins can create, update, and delete coaching programs.
- **Enrollment Management**: Employees can enroll in coaching programs, and coaches can manage their programs.
- **Responsive Design**: The application is built with a responsive design to ensure usability across devices.

## Technologies Used

- **Backend**: Ruby on Rails
- **Frontend**: React.js, TailwindCSS
- **Database**: PostgreSQL
- **Authentication**: Devise for user authentication
- **State Management**: React hooks for managing component state
- **API Communication**: Fetch API for making requests to the backend

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/coaching-program-management.git
   cd coaching-program-management
   ```

2. Install dependencies:
   ```bash
   bundle install
   yarn install
   ```

3. Set up the database:
   ```bash
   rails db:create
   rails db:migrate
   rails db:seed
   ```

4. Start the Rails server:
   ```bash
   rails server
   ```

5. Start the ROR + React application:
   ```bash
   bin/dev
   ```

## API Endpoints

### Users

- **GET /admin/users**: List all users
- **POST /admin/users**: Create a new user
- **GET /admin/users/:id**: Show a specific user
- **PATCH /admin/users/:id**: Update a specific user
- **DELETE /admin/users/:id**: Delete a specific user

### Coaching Programs

- **GET /admin/coaching_programs**: List all coaching programs
- **POST /admin/coaching_programs**: Create a new coaching program
- **GET /admin/coaching_programs/:id**: Show a specific coaching program
- **PATCH /admin/coaching_programs/:id**: Update a specific coaching program
- **DELETE /admin/coaching_programs/:id**: Delete a specific coaching program

### Enrollments

- **GET /admin/coaching_program_enrollments**: List all enrollments
- **POST /admin/coaching_program_enrollments**: Create a new enrollment
- **GET /admin/coaching_program_enrollments/:id**: Show a specific enrollment
- **PATCH /admin/coaching_program_enrollments/:id**: Update a specific enrollment
- **DELETE /admin/coaching_program_enrollments/:id**: Delete a specific enrollment

## Usage

- **Admin Dashboard**: Accessible to users with the admin role to manage users and coaching programs.
- **Coach Dashboard**: Coaches can view and manage their coaching programs.
- **Employee Dashboard**: Employees can view available coaching programs and enroll in them.

## Testing

To run the test suite, use the following command:

```bash
# Add your test command here, e.g., RSpec or 
bin/rails test test/controllers #for controller tests

bin/rails test test #for all test cases
```
