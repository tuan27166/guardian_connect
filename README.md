
# Guardian Connect

Guardian Connect is a community-focused web application designed to bridge the gap between first responders like police officers, firefighters, nurses, medical professionals, and citizens. It allows users to sign up, submit help requests, and view assistance needs in real time.

## Features

- User Signup – Citizens can create a secure account.
- Help Request Form – Submit a request with a title, description, and VIP status checkbox.
- Help Request Viewer – Browse all submitted requests from the community.
- Comment Section – Add comments to each help request for better communication.
- Clear Requests – Admin feature to delete all help requests.
- Simple Navigation – Toggle between Signup, Submit Request, and View Requests.

## Technologies Used

- Frontend: React.js
- Backend: Flask (Python)
- Database: SQLite
- API Handling: Fetch API
- CORS Support: Flask-CORS

## Setup Instructions

### Backend

1. Open Command Prompt and navigate to the backend folder:  
   cd Desktop\guardian_connect\backend

2. Activate your virtual environment:  
   venv\Scripts\activate

3. Run the Flask server:  
   python app.py  
   You should see:  
   Running on http://127.0.0.1:5000

### Frontend

1. Open a second terminal and navigate to the frontend folder:  
   cd Desktop\guardian_connect\frontend

2. Start the React frontend:  
   npm start

## How to Use

1. Go to http://localhost:3000  
2. Click Signup to register a new account  
3. Navigate to Submit Help Request and fill in the form  
4. Go to View Help Requests to see others' requests  
5. Leave a comment or clear all requests (admin use)

## Folder Structure

guardian_connect/  
│  
├── assets/  
│   └── images/  
│       ├── dunk tank.jpeg  
│       ├── fire support.jpeg  
│       ├── Fire truck.jpeg  
│       ├── High School interns.jpeg  
│       ├── hoop1.jpeg  
│       ├── hoop2.jpeg  
│       ├── Humble FD.jpeg  
│       ├── Mall staff.jpeg  
│       ├── NE Herman.jpeg  
│       └── toy drive.jpeg  
│  
├── backend/  
│   ├── app.py  
│   ├── models.py  
│   ├── instance/  
│   ├── venv/  
│   └── __pycache__/  
│  
├── frontend/  
│   ├── public/  
│   ├── src/  
│   │   ├── App.css  
│   │   ├── App.js  
│   │   ├── CommentSection.js  
│   │   ├── HelpRequestForm.js  
│   │   ├── HelpRequestList.js  
│   │   ├── index.js  
│   │   ├── Login.js  
│   │   ├── Signup.js  
│   │   └── ...other React boilerplate files  
│   ├── package.json  
│   ├── package-lock.json  
│   └── .gitignore  
│  
└── README.md

## 📁 Assets & Images

All media used for the project is stored in the `/assets/images` folder. These images showcase real-life community engagement events to enhance the UI and demo.

### Included Files:
- `dunk tank.jpeg` – Community dunk tank event  
- `fire support.jpeg` – Support from local fire department  
- `Fire truck.jpeg` – Group photo in front of a fire truck  
- `High School interns.jpeg` – Training session with student interns  
- `hoop1.jpeg` / `hoop2.jpeg` – Officer playing basketball with local youth  
- `Humble FD.jpeg` – Hanging out with Humble Fire Department  
- `Mall staff.jpeg` – Collaboration with mall security and staff  
- `NE Herman.jpeg` – Patrol/community interaction  
- `toy drive.jpeg` – Toy donations from Target & Jurassic Park fans  

These images are intended to visually reinforce Guardian Connect’s mission of service, visibility, and unity.

## Future Features

- Authentication tokens (JWT) for secure login and user sessions  
- Role-based access (admin vs regular users)  
- Comment deletion or editing  
- Profile page for users  
- Notification system for new requests/comments  
- Live chat or real-time updates using WebSockets  
- Responsive design for mobile devices  
- Map integration for location-based requests

---

Created by: **Tuan Hoang**
