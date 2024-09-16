<script setup>
  import { requiredValidator } from '@/utils/validator'
  import VueDatePicker from '@vuepic/vue-datepicker'
  import '@vuepic/vue-datepicker/dist/main.css'
  import { useAppStore } from '@/stores/app'
  import { storeToRefs } from 'pinia'

  const props = defineProps({
    dialog: {
      type: Boolean,
      default: false,
    },
    boardId: {
      type: String,
      default: null,
    },
    task: {
      type: Object,
      default: () => {},
    },
  })

  const emit = defineEmits(['update:dialog'])

  const appStore = useAppStore()
  const { priorities } = storeToRefs(appStore)

  const form = ref()
  const selectedTask = ref({})

  watch(() => props.dialog, () => {
    selectedTask.value = { ...props.task }
  })

  const toggleDialog = value => {
    emit('update:dialog', value)
  }

  const updateTask = () => {
    form.value?.validate().then(async ({ valid: isValid }) => {
      if (!isValid) return

      appStore.updateTask(props.boardId, selectedTask.value)

      toggleDialog(false)
    })
  }
</script>

<template>
  <div>
    <v-dialog
      max-width="600"
      :model-value="props.dialog"
      persistent
      @update:model-value="toggleDialog"
    >
      <v-card
        title="Update Task"
      >
        <v-card-text>
          <v-form ref="form">
            <div class="field-control">
              <label for="title">Task Title</label>
              <v-text-field
                id="title"
                v-model="selectedTask.title"
                density="compact"
                :rules="[requiredValidator]"
                variant="outlined"
              />
            </div>

            <div class="field-control">
              <label for="desc">Description</label>
              <v-textarea
                id="desc"
                v-model="selectedTask.desc"

                density="compact"
                variant="outlined"
              />
            </div>
            <div class="field-contfdsafrol mb-4">
              <label for="dueDate">Due Date</label>
              <VueDatePicker
                id="dueDate"
                v-model="selectedTask.due_date"
                :is-24="false"
                teleport-center
              />
            </div>
            <div class="field-control">
              <label for="priority">Priority</label>
              <v-select
                v-model="selectedTask.priority"
                density="compact"

                item-title="name"
                item-value="value"
                :items="priorities"
                :rules="[requiredValidator]"
                variant="outlined"
              />
            </div>
          </v-form>
        </v-card-text>

        <v-divider />

        <v-card-actions>
          <v-spacer />

          <v-btn
            text="Close"
            variant="plain"
            @click="toggleDialog(false)"
          />

          <v-btn
            color="primary"
            text="Save"
            variant="tonal"
            @click="updateTask"
          />
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<style lang="scss" scoped>
//
</style>
