# TaskForge — Team Task Manager

A full-stack web application for managing team projects, assigning tasks, and tracking progress with role-based access control (Admin/Member).

---

## Live Demo

🔗 **Live URL:** `https://your-app.up.railway.app`
📁 **GitHub Repo:** ``https://github.com/bharatdasari0528/-TaskForge--Team-Task-Manager.git`

---

## Features

### Authentication
- Signup & Login with JWT-based authentication
- Secure password hashing with bcrypt
- Role assignment at registration (Admin / Member)

### Role-Based Access Control
| Feature | Admin | Member |
|---|---|---|
| View all tasks | ✅ | ❌ (own only) |
| Create tasks | ✅ | ✅ |
| Assign tasks to others | ✅ | ❌ |
| Delete tasks | ✅ | ❌ |
| Manage team members | ✅ | ❌ |
| View projects | ✅ | ✅ |

### Project & Task Management
- Create and manage multiple projects
- Create tasks with title, assignee, due date, and project
- Task status tracking: **To Do → In Progress → Done / Overdue**
- Dashboard with stats (my tasks, overdue, in progress, projects)

### Dashboard
- Personal task overview
- Overdue task alerts
- Project progress bars
- Recent activity feed

---

## Tech Stack

### Frontend
- React.js
- React Router (client-side routing)
- Axios (API calls)
- CSS Modules / Tailwind CSS

### Backend
- Node.js + Express.js
- REST API with proper validation
- JWT authentication middleware
- Role-based route protection

### Database
- PostgreSQL
- Sequelize ORM
- Relational schema: Users → Projects → Tasks

---

## Getting Started

### Prerequisites
- Node.js v18+
- PostgreSQL 14+
- npm or yarn

### 1. Clone the repository

```bash
git gh repo clone bharatdasari0528/-TaskForge--Team-Task-Manager
cd taskforge
```

### 2. Install dependencies

```bash
# Backend
cd server
npm install

# Frontend
cd ../client
npm install
```

### 3. Set up environment variables

Create a `.env` file in the `/server` directory:

```env
PORT=5000
DATABASE_URL=postgresql://user:password@localhost:5432/taskforge
JWT_SECRET=your_super_secret_key
NODE_ENV=development
```

### 4. Set up the database

```bash
cd server
npx sequelize-cli db:create
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all   # optional demo data
```

### 5. Run the application

```bash
# Start backend (from /server)
npm run dev

# Start frontend (from /client)
npm start
```

App runs at `http://localhost:3000`

---

## API Endpoints

### Auth
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/signup` | Register new user |
| POST | `/api/auth/login` | Login and receive JWT |

### Tasks
| Method | Endpoint | Description | Access |
|---|---|---|---|
| GET | `/api/tasks` | Get tasks (own or all) | Member/Admin |
| POST | `/api/tasks` | Create new task | Member/Admin |
| PUT | `/api/tasks/:id` | Update task status | Member/Admin |
| DELETE | `/api/tasks/:id` | Delete task | Admin only |

### Projects
| Method | Endpoint | Description | Access |
|---|---|---|---|
| GET | `/api/projects` | List all projects | Member/Admin |
| POST | `/api/projects` | Create project | Admin only |

### Users (Admin only)
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/users` | List all team members |

---

## Database Schema

```
Users
├── id (PK)
├── name
├── email (unique)
├── password (hashed)
├── role (Admin / Member)
└── createdAt

Projects
├── id (PK)
├── name
├── createdBy (FK → Users)
└── createdAt

Tasks
├── id (PK)
├── title
├── status (To Do / In Progress / Done / Overdue)
├── dueDate
├── projectId (FK → Projects)
├── assigneeId (FK → Users)
├── createdBy (FK → Users)
└── createdAt
```

---

## Deployment (Railway)

### Steps

1. Push your code to GitHub
2. Go to [railway.app](https://railway.app) and create a new project
3. Click **"Deploy from GitHub repo"** and select your repository
4. Add a **PostgreSQL** plugin from the Railway dashboard
5. Set environment variables in Railway:
   ```
   DATABASE_URL  → (auto-set by Railway PostgreSQL plugin)
   JWT_SECRET    → your_secret_key
   NODE_ENV      → production
   PORT          → 5000
   ```
6. Set the start command: `npm start`
7. Railway will auto-deploy on every push to `main`

---

## Demo Credentials

| Role | Email | Password |
|---|---|---|
| Admin | admin@demo.com | password |
| Member | member@demo.com | password |

---

## Project Structure

```
taskforge/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/        # Auth context
│   │   └── api/            # Axios config
│   └── package.json
├── server/                 # Express backend
│   ├── controllers/
│   ├── middleware/         # Auth & role guards
│   ├── models/             # Sequelize models
│   ├── routes/
│   ├── migrations/
│   └── package.json
└── README.md
```

---

## Demo Video

📹 [Watch the 2–5 min walkthrough here](#)

The demo covers:
- Signing up as Admin and Member
- Creating a project and tasks
- Assigning tasks to team members
- Changing task statuses
- Admin-only features (team view, delete)

---

## License

MIT License — free to use and modify.
