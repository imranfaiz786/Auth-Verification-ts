# User Authentication and Verification System

A complete user authentication and email verification system built with Node.js, Express, MongoDB, and bcrypt for password hashing. This project provides sign-up, sign-in, email verification, and logout functionalities.

## Features

- **Sign Up**: Allows new users to register with email, phone, and password.
- **Sign In**: Users can sign in with their email and password.
- **Email Verification**: Sends a 6-digit verification code to the user's email for account activation.
- **Logout**: Allows users to log out and clear the authentication token.

## Technologies Used

- **TypeScript**: Provides type-safe development.
- **Node.js**: Backend JavaScript runtime.
- **Express**: Web framework for Node.js.
- **MongoDB**: NoSQL database to store user and verification data.
- **bcryptjs**: For hashing and comparing passwords.
- **nodemailer**: For sending verification emails.
- **crypto**: For generating secure hashes.

## Prerequisites

Before setting up the project, ensure you have the following installed:

- **Node.js**: [Download Node.js](https://nodejs.org/)
- **MongoDB**: Running locally or remotely (e.g., MongoDB Atlas for a cloud-based solution).

## Installation

### Steps to Set Up the Project

1. **Clone the repository**:

   ```bash
   git clone https://github.com/imranfaiz786/Auth-Verification-ts.git
   ```

2. **Navigate to the project folder**:

   ```bash
   cd Auth-Verification-ts
   ```

3. **Install dependencies**:

   ```bash
   yarn install
   ```

4. **Create a `.env` file in the root directory** and add the following environment variables:

   ```env
   MONGODB_URI=mongodb://localhost:27017/my-db
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-email-password
   PORT=5002
   NODE_ENV=development
   ```

   Replace `your-email@gmail.com` and `your-email-password` with your actual Gmail credentials.

5. **Start the server in development mode**:

   ```bash
   yarn dev
   ```

   The application will be running at [http://localhost:5002](http://localhost:5002).

## API Endpoints

### **POST /signup**
Create a new user.

- **Request Body**:

  ```json
  {
    "type": "userType",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "phone": "1234567890",
    "password": "securepassword",
    "cPassword": "securepassword"
  }
  ```

### **POST /signin**
Sign in an existing user.

- **Request Body**:

  ```json
  {
    "type": "userType",
    "email": "john.doe@example.com",
    "password": "securepassword"
  }
  ```

### **POST /verification/send**
Send a verification code to the user's email.

- **Request Body**:

  ```json
  {
    "email": "john.doe@example.com",
    "phone": "1234567890"
  }
  ```

### **POST /verification/verify**
Verify the verification code.

- **Request Body**:

  ```json
  {
    "code": "123456",
    "hash": "hashedValueHere"
  }
  ```

### **POST /logout**
Logout the user and clear the authentication token.

## License

This project is open-source and available under the [MIT License](LICENSE).
