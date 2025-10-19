// Validation middleware and functions

const validateTask = (taskData, isUpdate = false) => {
    const errors = {};

    // Title validation
    if (!isUpdate || taskData.title !== undefined) {
        if (!taskData.title || typeof taskData.title !== 'string') {
            errors.title = 'Title is required and must be a string';
        } else if (taskData.title.length === 0 || taskData.title.length > 100) {
            errors.title = 'Title must be between 1 and 100 characters';
        }
    }

    // Description validation
    if (taskData.description !== undefined) {
        if (taskData.description && typeof taskData.description !== 'string') {
            errors.description = 'Description must be a string';
        } else if (taskData.description && taskData.description.length > 500) {
            errors.description = 'Description must not exceed 500 characters';
        }
    }

    // Status validation
    if (taskData.status !== undefined) {
        const validStatuses = ['pending', 'in-progress', 'completed'];
        if (!validStatuses.includes(taskData.status)) {
            errors.status = `Status must be one of: ${validStatuses.join(', ')}`;
        }
    }

    // Priority validation
    if (taskData.priority !== undefined) {
        const validPriorities = ['low', 'medium', 'high'];
        if (!validPriorities.includes(taskData.priority)) {
            errors.priority = `Priority must be one of: ${validPriorities.join(', ')}`;
        }
    }

    // Due date validation
    if (taskData.dueDate !== undefined) {
        if (taskData.dueDate) {
            const date = new Date(taskData.dueDate);
            if (isNaN(date.getTime())) {
                errors.dueDate = 'Due date must be a valid ISO 8601 datetime';
            }
        }
    }

    // Tags validation
    if (taskData.tags !== undefined) {
        if (!Array.isArray(taskData.tags)) {
            errors.tags = 'Tags must be an array';
        } else if (!taskData.tags.every(tag => typeof tag === 'string')) {
            errors.tags = 'All tags must be strings';
        }
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
};

module.exports = {
    validateTask
};
