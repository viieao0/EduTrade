🎓 EduTrade – University Talent Exchange Platform

📌 Project Overview
EduTrade is a full-stack CRUD web application designed for university students to exchange skills and talents.
Students can offer their talents, request help from others, match with peers, and complete transactions in a structured and user-friendly way.
The app focuses on collaboration, learning, and peer-to-peer support within a university environment.

🎯 Problem Statement
Many university students have valuable skills (coding, tutoring, design, etc.) but lack a simple platform to exchange these talents fairly and securely.
EduTrade solves this by providing a centralized system where students can connect, request help, and track agreements transparently.

💡 Solution
EduTrade allows students to:

Register using a university email

Create and manage talents

Send and receive requests

Automatically generate matches

Complete matches and generate transactions

Track activity through a dashboard

🧩 Features (MVP)
User authentication (register, login, logout)

University email validation

CRUD operations for:

Talents

Requests

Matches

Transactions

Role-based views (requester vs talent owner)

Match status flow: Pending → Accepted → Completed

Automatic transaction creation after match completion

Styled UI with a modern, app-like design

🛠️ Technologies Used
Frontend

EJS (Embedded JavaScript Templates)

CSS (Custom responsive styling)

Backend

Node.js

Express.js

MongoDB

Mongoose

Authentication & Utilities

express-session

bcrypt

dotenv

🗂️ Project Structure
edutrade/
│
├── controllers/
│   ├── auth.js
│   ├── talents.js
│   ├── requests.js
│   ├── matches.js
│   └── transactions.js
│
├── models/
│   ├── user.js
│   ├── talent.js
│   ├── request.js
│   ├── match.js
│   └── transaction.js
│
├── views/
│   ├── auth/
│   ├── talents/
│   ├── requests/
│   ├── matches/
│   ├── transactions/
│   └── dashboard.ejs
│
├── public/
│   └── styles.css
│
├── middleware/
│   └── is-signed-in.js
│
├── server.js
├── .env
├── package.json
└── README.md
🔄 User Flow
User registers with a university email

User logs in and accesses the dashboard

User creates a talent OR browses talents

Another user sends a request

A match is created automatically

Talent owner accepts the match

Match is completed

Transaction is generated for both users

⚙️ Getting Started
Deployed App: [Add your deployed link here]
Planning Materials: [Add your planning docs link here]

Clone the repository and install dependencies:

bash
git clone https://github.com/your-username/edutrade.git
cd edutrade
npm install
Create a .env file with:

MONGO_URI=your_mongodb_connection_string
SESSION_SECRET=your_secret_key
Run the server:

bash
npm start
🚀 Usage
Visit http://localhost:3000 in your browser

Register with a university email

Explore talents, send requests, and manage matches

📎 Attributions
No external assets requiring attribution were used.
https://drive.google.com/file/d/1_5h1onsX2KZ7rkFxddlRyaqn3PgoNEPx/view?usp=sharing
🔮 Next Steps
Add rating and feedback system for completed matches

Implement notifications for new requests and matches

Enhance UI with a modern frontend framework (React or Vue)

Add admin dashboard for monitoring activity