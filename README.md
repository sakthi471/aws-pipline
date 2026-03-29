# Todo App (Full Stack)

A full-stack Todo application using:

- Frontend: React + Vite
- Backend: Node.js + Express
- Database: MongoDB + Mongoose

## Monorepo Structure

```text
todo-app/
  client/
    src/
      components/
        TodoInput.jsx
        TodoList.jsx
        TodoItem.jsx
      App.jsx
      App.css
      index.css
    .env
    .env.example
    package.json
  server/
    config/
      db.js
    controllers/
      todoController.js
    middleware/
      errorHandler.js
    models/
      Todo.js
    routes/
      todoRoutes.js
    .env
    .env.example
    server.js
    package.json
  README.md
```

## Backend API

Base URL: `http://localhost:5000/api`

- `GET /todos` - Fetch all todos
- `POST /todos` - Create todo
- `PUT /todos/:id` - Update todo (title/completed)
- `DELETE /todos/:id` - Delete todo

### Todo Schema

- `title`: String (required)
- `completed`: Boolean (default: `false`)
- `createdAt`: Date (default: `Date.now`)

## Environment Variables

### Server (`server/.env`)

```env
PORT=5000
MONGO_URI=<your_mongodb_connection_string>
```

### Client (`client/.env`)

```env
VITE_API_URL=http://localhost:5000/api
```

## Local Development

### 1. Start backend

```bash
cd server
npm install
npm run dev
```

You should see: `Server running on port 5000`

### 2. Start frontend (new terminal)

```bash
cd client
npm install
npm run dev
```

Open the frontend URL shown by Vite (usually `http://localhost:5173` or `http://localhost:5174`).

## Notes

- Backend uses MVC architecture (`models`, `controllers`, `routes`).
- Error handling is centralized in custom middleware.
- Frontend includes loading and error states.
- Double-click a todo title to edit quickly.
