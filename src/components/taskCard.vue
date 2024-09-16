<script setup>
  import { useAppStore } from '@/stores/app'
  import { formatDate, isDateNotPassed, truncateString } from '@/utils'
  import { storeToRefs } from 'pinia'

  // eslint-disable-next-line no-unused-vars
  const props = defineProps({
    boardId: {
      type: String,
      default: null,
    },
    task: {
      type: Object,
      default: () => {},
    },
    taskIndex: {
      type: Number,
      default: null,
    },
  })

  const appStore = useAppStore()
  const { priorities, selectedSort } = storeToRefs(appStore)

  const isTaskDialogOpen = ref(false)
  const selectedTask = ref(null)
  const selectedBoardId = ref(null)
  const isConfirmDialogOpen = ref(false)

  const removeTask = (boardId, taskId) => {
    appStore.removeTask(boardId, taskId)
    isConfirmDialogOpen.value = false
  }

  const openUpdateTaskDialog = (task, boardId) => {
    selectedTask.value = task
    selectedBoardId.value = boardId
    isTaskDialogOpen.value = true
  }

  const openConfirmDialog = (task, boardId) => {
    selectedTask.value = task
    selectedBoardId.value = boardId
    isConfirmDialogOpen.value = true
  }

  const handleDragStart = ({ $event, boardId, taskId }) => {
    $event.dataTransfer.effectAllowed = 'move'
    $event.dataTransfer.dropEffect = 'move'
    $event.dataTransfer.setData('from-board-id', boardId)
    $event.dataTransfer.setData('task-id', taskId)
  }

  const moveTaskToSpecificLocation = ({ $event, toBoardId, toTaskIndex }) => {
    const fromBoardId = $event.dataTransfer.getData('from-board-id')
    const taskId = $event.dataTransfer.getData('task-id')
    appStore.moveTask({ taskId, fromBoardId, toBoardId, toTaskIndex })
    selectedSort.value = '' // reset sort
  }
</script>
<template>
  <div>

    <v-card
      class="task mb-4"
      draggable="true"
      @click="openUpdateTaskDialog(task, boardId)"
      @dragenter.prevent
      @dragover.prevent
      @dragstart="handleDragStart({$event, boardId: boardId, taskId: task.id})"
      @drop.stop="moveTaskToSpecificLocation({$event, toBoardId: boardId, toTaskIndex: taskIndex})"
    >
      <v-card-title class="d-flex align-center justify-space-between">
        <span>{{ task.title }}</span>
        <v-btn
          color="error"
          density="compact"
          icon="mdi-delete"
          title="delete task"
          variant="text"
          @click.stop="openConfirmDialog(task, boardId)"
        />
      </v-card-title>
      <v-card-subtitle v-if="task.due_date">
        <span>
          {{ formatDate(task.due_date) }}
        </span>
        <v-icon v-if="!isDateNotPassed(task.due_date)" class="ms-2" color="error" title="due date is passed">mdi-timer-alert-outline</v-icon>

      </v-card-subtitle>
      <v-card-text>
        <p v-if="task.priority" class="mb-0 d-flex align-center">
          <span>
            <v-icon v-for="i in 4" :key="i" :color="i <= task.priority ? '#ca432c': ''" size="8">mdi-circle</v-icon>
          </span>
          <span class="ms-2 d-inline-block">
            {{ priorities[task.priority - 1]?.name }}
          </span>
        </p>
        <p v-if="task.desc" class="mt-2">{{ truncateString(task.desc, 40) }}</p>
      </v-card-text>
    </v-card>

    <UpdateTaskDialog
      v-model:dialog="isTaskDialogOpen"
      :board-id="selectedBoardId"
      :task="selectedTask"
    />
    <ConfirmDialog
      v-model:dialog="isConfirmDialogOpen"
      :board-id="selectedBoardId"
      :task-id="selectedTask?.id"
      @confirm="removeTask"
    />
  </div>

</template>

<style lang="scss" scoped>

</style>
