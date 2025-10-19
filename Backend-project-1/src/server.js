// Main server file
const express = require('express');
const morgan = require('morgan');
const taskRoutes = require('./routes/taskRoutes');
const { seedTasks } = require('./controllers/taskController');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(morgan('combined'));
app.use(express.json());

// API Routes
app.use('/api/tasks', taskRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Task Management API is running',
        timestamp: new Date().toISOString()
    });
});

// Root endpoint
app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Task Management API',
        version: '1.0.0',
        endpoints: {
            tasks: '/api/tasks',
            health: '/health'
        }
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Endpoint not found'
    });
});

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// Seed initial data (optional)
const initialTasks = require('./data/sampleTasks.json');
seedTasks(initialTasks);

// Start server
const server = app.listen(PORT, () => {
    console.log(`Task Management API running on http://localhost:${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = app;
