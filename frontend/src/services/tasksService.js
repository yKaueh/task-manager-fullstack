const API_URL = import.meta.env.VITE_API_URL

export async function getTasks(token) {
    const res = await fetch(`${API_URL}/tasks`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    const data = await res.json()

    if(!res.ok){
        throw new Error(`Erro ao buscar tarefas: ${data.message}`)
    }

    return data
}

export async function createTask(token, title) {
    const res = await fetch(`${API_URL}/tasks`, {
        method: 'POST',
        headers: {
             Authorization: `Bearer ${token}`,
             'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title
        })
    })

    const data = await res.json()

    if(!res.ok){
        throw new Error(`Erro ao criar tarefa: ${data.message}`)
    }

    return data
}

export async function deleteTask(token, id) {
    const res = await fetch(`${API_URL}/tasks/${id}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    const data = await res.json()

    if(!res.ok){
        throw new Error(`Erro ao deletar tarefa: ${data.message}`)
    }

    return data
}

export async function updateTask(token, id, title) {
    const res = await fetch(`${API_URL}/tasks/${id}`, {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title
        })
    })

    const data = await res.json()

    if(!res.ok){
        throw new Error(`Erro ao editar tarefa: ${data.message}`)
    }

    return data
}

export async function toggleTaskStatus(token, id) {
    const res = await fetch(`${API_URL}/tasks/toggle`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id
        })
    })

    const data = await res.json()

    if(!res.ok){
        throw new Error(`Erro ao mudar status da tarefa: ${data.message}`)
    }

    return data
}