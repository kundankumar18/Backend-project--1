// Task controller with CRUD operations
const { v4: uuidv4 } = require('uuid');

// In-memory data storage
let tasks = [];

// GET all tasks with optional filtering and sorting
const getAllTasks = (req, res) => {
    let filteredTasks = [...tasks];

    // Filter by status
    if (req.query.status) {
        filteredTasks = filteredTasks.filter(task => task.status === req.query.status);
    }

    // Filter by priority
    if (req.query.priority) {
        filteredTasks = filteredTasks.filter(task => task.priority === req.query.priority);
    }

    // Sort by field
    if (req.query.sortBy) {
        const sortBy = req.query.sortBy;
        if (sortBy === 'dueDate') {
            filteredTasks.sort((a, b) => {
                if (!a.dueDate) return 1;
                if (!b.dueDate) return -1;
                return new Date(a.dueDate) - new Date(b.dueDate);
            });
        } else if (sortBy === 'createdAt') {
            filteredTasks.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        } else if (sortBy === 'priority') {
            const priorityOrder = { high: 1, medium: 2, low: 3 };
            filteredTasks.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
        }
    }

    res.status(200).json({
        success: true,
        count: filteredTasks.length,
        data: filteredTasks
    });
};

// GET single task by ID
const getTaskById = (req, res) => {
    const { taskId } = req.params;
    const task = tasks.find(t => t.taskId === taskId);

    if (!task) {
        return res.status(404).json({
            success: false,
            message: `Task with ID ${taskId} not found`
        });
    }

    res.status(200).json({
        success: true,
        data: task
    });
};

// POST create new task
const createTask = (req, res) => {
    const { title, description = '', status = 'pending', priority = 'medium', dueDate, tags = [] } = req.body;

    const now = new Date().toISOString();
    const newTask = {
        taskId: uuidv4(),
        title,
        description,
        status,
        priority,
        dueDate: dueDate || null,
        tags,
        createdAt: now,
        updatedAt: now
    };

    tasks.push(newTask);

    res.status(201).json({
        success: true,
        message: 'Task created successfully',
        data: newTask
    });
};

// PUT replace entire task
const updateTaskFull = (req, res) => {
    const { taskId } = req.params;
    const { title, description, status, priority, dueDate, tags } = req.body;

    const taskIndex = tasks.findIndex(t => t.taskId === taskId);
    if (taskIndex === -1) {
        return res.status(404).json({
            success: false,
            message: `Task with ID ${taskId} not found`
        });
    }

    // Verify all required fields are present
    if (!title || !status || !priority) {
        return res.status(400).json({
            success: false,
            message: 'Title, status, and priority are required for full update'
        });
    }

    const now = new Date().toISOString();
    const updatedTask = {
        taskId,
        title,
        description: description || '',
        status,
        priority,
        dueDate: dueDate || null,
        tags: tags || [],
        createdAt: tasks[taskIndex].createdAt,
        updatedAt: now
    };

    tasks[taskIndex] = updatedTask;

    res.status(200).json({
        success: true,
        message: 'Task updated successfully',
        data: updatedTask
    });
};

// PATCH partial update
const updateTaskPartial = (req, res) => {
    const { taskId } = req.params;
    const updates = req.body;

    const taskIndex = tasks.findIndex(t => t.taskId === taskId);
    if (taskIndex === -1) {
        return res.status(404).json({
            success: false,
            message: `Task with ID ${taskId} not found`
        });
    }

    const now = new Date().toISOString();
    const updatedTask = {
        ...tasks[taskIndex],
        ...updates,
        taskId,
        createdAt: tasks[taskIndex].createdAt,
        updatedAt: now
    };

    tasks[taskIndex] = updatedTask;

    res.status(200).json({
        success: true,
        message: 'Task updated successfully',
        data: updatedTask
    });
};

// DELETE task
const deleteTask = (req, res) => {
    const { taskId } = req.params;
    const taskIndex = tasks.findIndex(t => t.taskId === taskId);

    if (taskIndex === -1) {
        return res.status(404).json({
            success: false,
            message: `Task with ID ${taskId} not found`
        });
    }

    tasks.splice(taskIndex, 1);

    res.status(204).send();
};

// Get tasks storage for seeding
const getTasks = () => tasks;

// Seed tasks
const seedTasks = (initialTasks) => {
    tasks = [...initialTasks];
};

module.exports = {
    getAllTasks,
    getTaskById,
    createTask,
    updateTaskFull,
    updateTaskPartial,
    deleteTask,
    getTasks,
    seedTasks
};
