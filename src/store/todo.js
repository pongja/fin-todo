import { defineStore} from 'pinia'
// 이름 ,옵션
export const todoStore = defineStore( 'todo', {
    state: () => ({
        todos: [],
        filters: {
            done: 'all',
            sortBy: 'none'
        }
    }),
    // computed
    getters: {
        filteredTodos(state) {
            let filteredTodos = [...state.todos]
            // 표시
            if (state.filters.done !== 'all') {
                filteredTodos = state.todos.filter(todo => {
                    switch (state.filters.done) {
                        case 'true':
                            return todo.done
                        case 'false':
                            return !todo.done
                    }
                })
            }
            // 정렬
            if (state.filters.sortBy !== 'none'){
                filteredTodos.sort((a, b) => {
                    const aTime = new Date(a.createdAt).getTime
                    const bTime = new Date(b.createdAt).getTime
                    switch (state.filters.sortBy) {
                        case 'newest':
                            return bTime - aTime
                        case 'oldest':
                            return aTime - bTime
                        default:
                            return 0
                    }
                })
            }
            return filteredTodos
        }
    },
    // methods
    actions: {
        async createTodo(title){
        await request({
            method: 'POST',
            body: { title }
        })
        this.readTodos()
        },
        async readTodos() {
            this.todos = await request({
                method: 'GET'
            })
        },
        async updateTodo(payload){
            const { id, title, done, order } = payload
            await request({
                method: 'PUT',
                body: {
                    title,
                    done,
                    order
                },
                id
            })
            this.readTodos()
        },
        async deleteTodo(id) {
            await request({
                method: 'DELETE',
                id
            })
            this.readTodos()
        },
        async reorderTodos({ oldIndex, newIndex }){
            const todoIds = this.todos.map(todo => todo.id)
            const oldId = todoIds[oldIndex] // copy
            todoIds.splice(oldIndex, 1)
            todoIds.splice(newIndex, 0, oldId)
            await request({
                id: 'reorder',
                method: 'PUT',
                body: {
                    todoIds
                }
            })
            this.readTodos()
        }
    }
})

async function request(options){
    const {method, body, id ='' } = options
    const res = await fetch(`https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos/${id}`, {
        method,
        headers: {
            'content-type': 'application/json',
            apikey: 'FinTech202207',
            username: 'KIMKIBEOM'
        },
        body: JSON.stringify(body)
    })
    return await res.json()
}
