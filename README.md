
# Excel Analytics

Excel Analytics is a modern web application for uploading, analyzing, and visualizing Excel data.  
It features secure authentication, interactive charts (including 3D), and a user-friendly dashboard.

## Features

- **User Authentication** (Signup/Login/Logout)
- **Excel File Upload** with drag-and-drop
- **Upload History** with preview and delete options
- **Data Visualization**: Bar, Line, Pie, Scatter, and 3D Bar Charts
- **Responsive Dashboard** with Material UI and Tailwind CSS
- **Backend**: Node.js, Express, MongoDB
- **Frontend**: React, Zustand, Recharts, Three.js

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- MongoDB database (local or Atlas)

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/yourusername/excel-analytics.git
   cd "excel-analytics"
   ```

2. **Install dependencies:**

   - For backend:
     ```sh
     cd Backend
     npm install
     ```

   - For frontend:
     ```sh
     cd ../Frontend
     npm install
     ```

3. **Set up environment variables:**

   - In `Backend/.env`:
     ```
     PORT=5000
     MONGODB_URL=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     ```

4. **Start the servers:**

   - Backend:
     ```sh
     cd Backend
     npm start
     ```
   - Frontend:
     ```sh
     cd ../Frontend
     npm start
     ```

5. **Open your browser:**  
   Visit [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal).

## Folder Structure

```
Excel Analytics/
├── Backend/
│   ├── controllers/
│   ├── model/
│   ├── routes/
│   ├── config/
│   ├── uploads/
│   ├── .env
│   └── ...
├── Frontend/
│   ├── src/
│   ├── public/
│   ├── .gitignore
│   └── ...
└── README.md
```

## Running in GitHub Codespaces

### Installation & Startup

1. **Open Codespace**  
   Go to your GitHub repo → Code → Open with Codespaces → New codespace.

2. **Install backend dependencies**
   ```sh
   cd Backend
   npm install
   ```

3. **Install frontend dependencies**
   ```sh
   cd ../Frontend
   npm install
   ```

4. **Set up environment variables** in `Backend/.env`:
   ```env
   PORT=5000
   MONGODB_URL=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

5. **Run backend and frontend in two terminals**:

   **Terminal 1 (Backend):**
   ```sh
   cd Backend
   npm start
   ```

   **Terminal 2 (Frontend):**
   ```sh
   cd Frontend
   npm start
   ```

6. **Preview in browser**  
   Click the PORTS tab → Open ports like `5173` or `5000` in browser.


**Made with ❤️ for data enthusiasts!**
