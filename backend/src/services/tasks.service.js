import { db } from '../database/db.js'

export async function getTasksService(userId) {
    const [rows] = await db.query('SELECT * FROM tasks WHERE user_id = ?', [userId])

    return rows
}

export async function createTaskService(userId, title) {
    const [result] = await db.query('INSERT INTO tasks (title, user_id) VALUES (?, ?)', [title, userId])

    return {
        id: result.insertId,
        title: title,
        status: 'pending'
    }
}

export async function deleteTaskService(userId, id) {
    const [result] = await db.query('DELETE FROM tasks WHERE id = ? AND user_id = ?', [id, userId])

    if(result.affectedRows === 0) return null

    return {message: 'Tarefa deletada'}
}

export async function updateTaskService(userId, id, title) {
    const [result] = await db.query(`
        UPDATE tasks
        SET title = ?
        WHERE id = ?
        AND user_id = ?
        `, [title, id, userId])

    if(result.affectedRows === 0) return null

    const [rows] = await db.query('SELECT status FROM tasks WHERE id = ? AND user_id = ?', [id, userId])
    if(rows.length === 0) return null
    const status = rows[0].statusrs

    return {
        id,
        title,
        status
    }
}

export async function toggleTaskStatusService(userId, id) {
    const [rows] = await db.query('SELECT status FROM tasks WHERE id = ? AND user_id = ?', [id, userId])

    if(rows.length === 0) return null

    const currentStatus = rows[0].status
    const newStatus = currentStatus === 'pending' ? 'done' : 'pending'

    const [result] = await db.query(`
        UPDATE tasks
        SET status = ?
        WHERE id = ? AND user_id = ?
        `, [newStatus, id, userId])

    if(result.affectedRows === 0) return null

    return {
        id, status: newStatus
    }
}