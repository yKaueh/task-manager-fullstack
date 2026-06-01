import {
    getTasksService,
    createTaskService,
    deleteTaskService,
    updateTaskService,
    toggleTaskStatusService
}  from '../services/tasks.service.js'

export async function getTasksController(req, res) {
    const userId = req.user.id

    const tasks = await getTasksService(userId)

    res.json(tasks)

}

export async function createTaskController(req, res) {
    const userId = req.user.id
    const { title } = req.body

    const task = await createTaskService(userId, title)

    res.status(201).json(task)

}

export async function deleteTaskController(req, res) {
    const userId = req.user.id
    const { id } = req.params

    const deleted = await deleteTaskService(userId, id)

    if(!deleted){
        return res.status(404).json({message: 'Tarefa não encontrada'})
    }

    res.json(deleted)

}

export async function updateTaskController(req, res) {
    const userId = req.user.id
    const { id } = req.params
    const { title } = req.body

    const updated = await updateTaskService(userId, id, title)

    if(!updated){
        return res.status(404).json({message: 'Tarefa não editada'})
    }

    res.json(updated)
}

export async function toggleTaskStatusController(req , res) {
    const userId = req.user.id
    const { id } = req.body
    const toggled = await toggleTaskStatusService(userId, id)

    if(!toggled){
        return res.status(404).json({message: 'Task não encontrada ou sem permissão'})
    }

    res.json(toggled)

}