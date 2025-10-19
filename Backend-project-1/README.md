# Task Management API

A RESTful API for a Task Management System built with Node.js and Express.js. This API provides complete CRUD operations for managing tasks with filtering, sorting, and validation capabilities.

## 🚀 Features

- **Complete CRUD Operations**: Create, read, update, and delete tasks
- **Advanced Filtering**: Filter tasks by status, priority, and other attributes
- **Sorting**: Sort tasks by due date, creation date, or priority
- **Input Validation**: Comprehensive validation for all input fields
- **Error Handling**: Proper HTTP status codes and error messages
- **Morgan Logging**: Request logging for debugging and monitoring
- **UUID Generation**: Unique identifiers for all tasks
- **In-Memory Storage**: Fast, simple data storage for development

## 📋 Prerequisites

- Node.js 18 or higher
- npm or yarn package manager
- Postman (for API testing) - optional but recommended

## 🛠️ Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/task-management-api.git
cd task-management-api
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the server**
```bash
npm start
```

The API will be available at `http://localhost:3000`

For development with auto-reload:
```bash
npm run dev
```

## 📚 API Documentation

### Base URL
```
http://localhost:3000/api/tasks
```

### 1. Get All Tasks

**Endpoint**: `GET /api/tasks`

**Query Parameters**:
- `status` (optional): Filter by status - `pending`, `in-progress`, `completed`
- `priority` (optional): Filter by priority - `low`, `medium`, `high`
- `sortBy` (optional): Sort by - `dueDate`, `createdAt`, `priority`

**Example**:
```bash
GET /api/tasks?status=pending&priority=high&sortBy=dueDate
```

**Response** (200 OK):
```json
{
  "success": true,
  "count": 5,
  "data": [
    {
      "taskId": "550e8400-e29b-41d4-a716-446655440001",
      "title": "Design database schema",
      "description": "Create comprehensive database schema",
      "status": "completed",
      "priority": "high",
      "dueDate": "2025-10-15T18:00:00.000Z",
      "tags": ["database", "design"],
      "createdAt": "2025-10-01T10:00:00.000Z",
      "updatedAt": "2025-10-15T14:30:00.000Z"
    }
  ]
}
```

### 2. Get Single Task

**Endpoint**: `GET /api/tasks/:taskId`

**Parameters**:
- `taskId` (required): The UUID of the task

**Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "taskId": "550e8400-e29b-41d4-a716-446655440001",
    "title": "Design database schema",
    "description": "Create comprehensive database schema",
    "status": "completed",
    "priority": "high",
    "dueDate": "2025-10-15T18:00:00.000Z",
    "tags": ["database", "design"],
    "createdAt": "2025-10-01T10:00:00.000Z",
    "updatedAt": "2025-10-15T14:30:00.000Z"
  }
}
```

**Error** (404 Not Found):
```json
{
  "success": false,
  "message": "Task with ID <taskId> not found"
}
```

### 3. Create New Task

**Endpoint**: `POST /api/tasks`

**Request Body**:
```json
{
  "title": "Implement authentication",
  "description": "Set up JWT-based authentication",
  "status": "pending",
  "priority": "high",
  "dueDate": "2025-10-20T23:59:59.000Z",
  "tags": ["authentication", "security"]
}
```

**Field Validation**:
- `title` (required): String, 1-100 characters
- `description` (optional): String, max 500 characters
- `status` (optional): `pending`, `in-progress`, `completed` (default: `pending`)
- `priority` (optional): `low`, `medium`, `high` (default: `medium`)
- `dueDate` (optional): ISO 8601 datetime format
- `tags` (optional): Array of strings

**Response** (201 Created):
```json
{
  "success": true,
  "message": "Task created successfully",
  "data": {
    "taskId": "550e8400-e29b-41d4-a716-446655440017",
    "title": "Implement authentication",
    "description": "Set up JWT-based authentication",
    "status": "pending",
    "priority": "high",
    "dueDate": "2025-10-20T23:59:59.000Z",
    "tags": ["authentication", "security"],
    "createdAt": "2025-10-18T12:00:00.000Z",
    "updatedAt": "2025-10-18T12:00:00.000Z"
  }
}
```

**Error** (400 Bad Request):
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": {
    "title": "Title is required and must be a string",
    "priority": "Priority must be one of: low, medium, high"
  }
}
```

### 4. Update Task (Full)

**Endpoint**: `PUT /api/tasks/:taskId`

Replaces the entire task. All required fields must be provided.

**Request Body**:
```json
{
  "title": "Updated title",
  "description": "Updated description",
  "status": "in-progress",
  "priority": "medium",
  "dueDate": "2025-10-25T18:00:00.000Z",
  "tags": ["updated", "important"]
}
```

**Response** (200 OK):
```json
{
  "success": true,
  "message": "Task updated successfully",
  "data": { /* updated task object */ }
}
```

### 5. Update Task (Partial)

**Endpoint**: `PATCH /api/tasks/:taskId`

Updates only the provided fields.

**Request Body** (any combination of fields):
```json
{
  "status": "in-progress",
  "priority": "high"
}
```

**Response** (200 OK):
```json
{
  "success": true,
  "message": "Task updated successfully",
  "data": { /* updated task object */ }
}
```

### 6. Delete Task

**Endpoint**: `DELETE /api/tasks/:taskId`

**Response** (204 No Content):
No response body - just HTTP 204 status code

**Error** (404 Not Found):
```json
{
  "success": false,
  "message": "Task with ID <taskId> not found"
}
```

### 7. Health Check

**Endpoint**: `GET /health`

**Response** (200 OK):
```json
{
  "success": true,
  "message": "Task Management API is running",
  "timestamp": "2025-10-18T12:30:45.123Z"
}
```

## 📁 Project Structure

```
Backend-project/
├── src/
│   ├── server.js                 # Main Express application
│   ├── middleware/
│   │   └── validation.js         # Input validation functions
│   ├── controllers/
│   │   └── taskController.js     # CRUD operation handlers
│   ├── routes/
│   │   └── taskRoutes.js         # API route definitions
│   └── data/
│       └── sampleTasks.json      # Sample task data (16 tasks)
├── package.json                  # Dependencies and scripts
├── .gitignore                    # Git ignore rules
├── README.md                     # This file
└── Postman_Collection.json       # Postman collection for testing
```

## 🧪 Testing with Postman

1. **Import Postman Collection**:
   - Open Postman
   - Click "Import" and select `Postman_Collection.json`

2. **Sample Requests**:
   - Get All Tasks
   - Get Task by ID
   - Create New Task
   - Update Task (PUT)
   - Partial Update (PATCH)
   - Delete Task
   - Filter and Sort Examples

## 📊 Data Schema

### Task Object

```javascript
{
  "taskId": "uuid-v4",              // Unique identifier
  "title": "string",                // Task title (required, 1-100 chars)
  "description": "string",          // Task description (optional, max 500 chars)
  "status": "enum",                 // pending, in-progress, completed
  "priority": "enum",               // low, medium, high
  "dueDate": "ISO 8601",            // Optional due date
  "tags": ["string"],               // Array of tags/labels
  "createdAt": "timestamp",         // Creation timestamp
  "updatedAt": "timestamp"          // Last update timestamp
}
```

## ✅ HTTP Status Codes

| Code | Meaning      | Usage                               |
| ---- | ------------ | ----------------------------------- |
| 200  | OK           | Successful GET, PUT, PATCH requests |
| 201  | Created      | Successful POST request             |
| 204  | No Content   | Successful DELETE request           |
| 400  | Bad Request  | Invalid input or validation error   |
| 404  | Not Found    | Task or endpoint not found          |
| 500  | Server Error | Unexpected server error             |

## 🔧 Error Handling

All errors return a consistent JSON structure:

```json
{
  "success": false,
  "message": "Error description",
  "errors": { /* optional: detailed field errors */ }
}
```

## 📝 Environment Variables

Create a `.env` file in the project root:

```bash
PORT=3000
NODE_ENV=development
```

## 🚢 Deployment

1. **Build**: Project is ready to deploy as-is
2. **Environment**: Set `NODE_ENV=production` in production
3. **Port**: Configure via `PORT` environment variable
4. **Database**: Replace in-memory storage with a real database for production

## 📖 Example Usage

### Creating a Task

```bash
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Build user dashboard",
    "description": "Create responsive dashboard",
    "status": "pending",
    "priority": "high",
    "dueDate": "2025-11-01T18:00:00.000Z",
    "tags": ["frontend", "ui"]
  }'
```

### Filtering Tasks

```bash
# Get high priority pending tasks
curl "http://localhost:3000/api/tasks?status=pending&priority=high"

# Sort by due date
curl "http://localhost:3000/api/tasks?sortBy=dueDate"
```

### Updating a Task

```bash
# Partial update (PATCH)
curl -X PATCH http://localhost:3000/api/tasks/550e8400-e29b-41d4-a716-446655440001 \
  -H "Content-Type: application/json" \
  -d '{"status": "in-progress"}'

# Full update (PUT)
curl -X PUT http://localhost:3000/api/tasks/550e8400-e29b-41d4-a716-446655440001 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated title",
    "description": "Updated description",
    "status": "completed",
    "priority": "high",
    "dueDate": "2025-10-25T18:00:00.000Z",
    "tags": ["updated"]
  }'
```

## 🤝 Git Workflow

1. **Initialize Repository**:
```bash
git init
git add .
git commit -m "Initial commit: Task Management API"
```

2. **Push to GitHub**:
```bash
git remote add origin https://github.com/yourusername/task-management-api.git
git branch -M main
git push -u origin main
```

## 🎓 Learning Outcomes

This project demonstrates:
- ✅ REST API architecture and HTTP protocol
- ✅ CRUD operations with Express.js
- ✅ Request validation and error handling
- ✅ Middleware implementation
- ✅ UUID generation
- ✅ Filtering and sorting
- ✅ Git version control
- ✅ Postman API testing

## 📄 License

ISC License - feel free to use this project for learning and development

## 🤔 Troubleshooting

**Port already in use**:
```bash
# Use a different port
PORT=3001 npm start
```

**Module not found**:
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

**Server crashes on start**:
- Check that `src/server.js` exists
- Verify all dependencies are installed
- Check the console error message

## 📞 Support

For issues or questions:
1. Check the API documentation above
2. Review the Postman Collection examples
3. Check the project structure and file organization
4. Verify sample data in `src/data/sampleTasks.json`

---

**Created**: October 18, 2025  
**Version**: 1.0.0  
**Technology**: Node.js 18+, Express.js 4.x
