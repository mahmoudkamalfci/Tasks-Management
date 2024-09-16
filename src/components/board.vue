    <script setup>
  import { uuid } from '@/utils'
  import { useAppStore } from '@/stores/app'
  import { storeToRefs } from 'pinia'

  // eslint-disable-next-line no-unused-vars
  const props = defineProps({
    board: {
      type: Object,
      default: () => {},
    },
  })

  const emit = defineEmits(['clearSearch'])

  const appStore = useAppStore()
  const { boards, selectedSort } = storeToRefs(appStore)

  const titles = ref([])

  const getColor = boardId => {
    switch (boardId) {
      case 'todo':
        return '#BBDEFB'
      case 'inprogress':
        return '#FF8A80'
      case 'inreview':
        return '#FFE082'
      case 'done':
        return '#C8E6C9'
      default:
        return '#C8E6C9'
    }
  }

  const createTask = (boardId, index) => {
    const selectedBoard = boards.value.find(board => board.id === boardId)
    const task = { id: uuid(), title: titles.value[index] }
    appStore.createTask(selectedBoard.id, task)
    titles.value[index] = ''

    emit('clearSearch')
  }

  const handleDrop = ($event, toBoardId) => {
    const fromBoardId = $event.dataTransfer.getData('from-board-id')
    const taskId = $event.dataTransfer.getData('task-id')

    appStore.moveTask({ taskId, fromBoardId, toBoardId })
    selectedSort.value = '' // reset sort
  }
    </script>
<template>
  <v-card
    class="board"
    :color="getColor(board.id)"
    @dragenter.prevent
    @dragover.prevent
    @drop="handleDrop($event, board.id)"
  >
    <v-card-title>{{ board.name }}</v-card-title>
    <v-card-text>
      <TaskCard
        v-for="(task, taskIndex) in board.tasks"
        :key="taskIndex"
        :board-id="board.id"
        :task="task"
        :task-index="taskIndex"
      />

    </v-card-text>
    <v-card-actions>
      <v-text-field
        v-model="titles[index]"
        density="compact"
        label="Add New Task"
        prepend-inner-icon="mdi-plus"
        variant="plain"
        @keyup.enter="createTask( board.id, index)"
      />
    </v-card-actions>
  </v-card>
</template>

<style lang="scss" scoped>

</style>
