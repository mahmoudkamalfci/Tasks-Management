// Utilities
import { useLocalStorage } from '@vueuse/core'
import { defineStore } from 'pinia'

const defaultBoards = [
  { name: 'To Do', id: 'todo', tasks: [] },
  { name: 'In Progress', id: 'inprogress', tasks: [] },
  { name: 'In Review', id: 'inreview', tasks: [] },
  { name: 'Done', id: 'done', tasks: [] }]

export const useAppStore = defineStore('app', {
  state: () => ({
    boards: useLocalStorage('boards', defaultBoards),
    priorities: [
      { name: 'low', value: 1 },
      { name: 'medium', value: 2 },
      { name: 'high', value: 3 },
      { name: 'heighest', value: 4 },
    ],
    search: '',
    selectedSort: '',
  }),
  actions: {
    createTask (boardId, task) {
      const board = this.boards.find(b => b.id === boardId)
      if (board) {
        board.tasks.push(task)
      }
    },
    updateTask (boardId, updatedTask) {
      const board = this.boards.find(b => b.id === boardId)
      if (board) {
        const task = board.tasks.find(t => t.id === updatedTask.id)
        if (task) {
          Object.assign(task, updatedTask)
        }
      }
    },

    removeTask (boardId, taskId) {
      const board = this.boards.find(b => b.id === boardId)
      if (board) {
        board.tasks = board.tasks.filter(t => t.id !== taskId)
      }
    },

    moveTask ({ taskId, fromBoardId, toBoardId, toTaskIndex }) {
      const fromBoard = this.boards.find(b => b.id === fromBoardId)
      const toBoard = this.boards.find(b => b.id === toBoardId)
      if (fromBoard && toBoard) {
        const taskIndex = fromBoard.tasks.findIndex(t => t.id === taskId)
        if (taskIndex !== -1) {
          const [task] = fromBoard.tasks.splice(taskIndex, 1)
          if (toTaskIndex !== undefined) {
            toBoard.tasks.splice(toTaskIndex, 0, task)
          } else {
            toBoard.tasks.push(task)
          }
        }
      }
    },

    sortTasks (order = 'asc') {
      this.boards.forEach(board => {
        board.tasks.sort((a, b) => {
          const comparison = a.priority - b.priority
          return order === 'asc' ? comparison : -comparison
        })
      })
    },

  },
})
