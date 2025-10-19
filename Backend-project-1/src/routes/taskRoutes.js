// Task routes
const express = require('express');
const router = express.Router();
const {
    getAllTasks,
    getTaskById,
    createTask,
    updateTaskFull,
    updateTaskPartial,
    deleteTask
} = require('../controllers/taskController');
const { validateTask } = require('../middleware/validation');

// GET all tasks with filtering and sorting
router.get('/', getAllTasks);

// GET single task
router.get('/:taskId', getTaskById);

// POST create new task
router.post('/', (req, res, next) => {
    const validation = validateTask(req.body);

    if (!validation.isValid) {
        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors: validation.errors
        });
    }

    next();
}, createTask);

// PUT full update
router.put('/:taskId', (req, res, next) => {
    const validation = validateTask(req.body, true);

    if (!validation.isValid) {
        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors: validation.errors
        });
    }

    next();
}, updateTaskFull);

// PATCH partial update
router.patch('/:taskId', (req, res, next) => {
    const validation = validateTask(req.body, true);

    if (!validation.isValid) {
        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors: validation.errors
        });
    }

    next();
}, updateTaskPartial);

// DELETE task
router.delete('/:taskId', deleteTask);

module.exports = router;
