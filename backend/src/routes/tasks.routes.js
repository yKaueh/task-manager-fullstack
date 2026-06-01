import express from 'express'
import {
    getTasksController,
    createTaskController,
    deleteTaskController,
    updateTaskController,
    toggleTaskStatusController
} from '../controllers/tasks.controller.js'
import { authMiddleware } from '../middlewares/auth.middleware.js'


const router = express.Router()

router.get('/', authMiddleware, getTasksController)
router.post('/', authMiddleware, createTaskController)
router.delete('/:id', authMiddleware, deleteTaskController)
router.put('/:id', authMiddleware, updateTaskController)
router.post('/toggle', authMiddleware, toggleTaskStatusController)

export default router;