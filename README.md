# 🍿 Snack Feedback - Backend

This is the backend server for the **Snack Feedback** web application.  
It handles authentication, customer feedback submission, and data management using **Node.js**, **Express**, and **MongoDB**.

## 🚀 Features

- User authentication (Register & Login)
- Feedback form API (customer details, rating, comments)
- Secure routes using JWT authentication
- RESTful API design
- MongoDB for database storage


## 🛠️ Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB (Mongoose)**
- **JWT (JSON Web Token)**
- **dotenv**

---

## ⚙️ Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/Dindokar-Prajakta12/snack-feedback-backend.git
   cd snack-feedback-backend


Install dependencies

npm install


Create a .env file in the root directory and add:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key


= Run the server

npm start

= or in development mode:

npm run dev

= Server will start at:
👉 http://localhost:5000
