<script setup>
  const props = defineProps({
    dialog: {
      type: Boolean,
      default: false,
    },
    boardId: {
      type: String,
      default: null,
    },
    taskId: {
      type: String,
      default: null,
    },
  })

  const emit = defineEmits(['update:dialog', 'confirm'])

  const toggleDialog = value => {
    emit('update:dialog', value)
  }

  const confirm = () => {
    emit('confirm', props.boardId, props.taskId)
  }
</script>
<template>
  <div>
    <v-dialog
      max-width="500"
      :model-value="props.dialog"
      @update:model-value="toggleDialog"
    >

      <v-card title="Confirm Delete Task">
        <v-card-text>
          Are you sure you want to delete the task?
        </v-card-text>

        <v-card-actions>
          <v-spacer />

          <v-btn
            text="Close"
            variant="plain"
            @click="toggleDialog(false)"
          />

          <v-btn
            color="primary"
            text="confirm"
            variant="tonal"
            @click="confirm"
          />
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<style lang="scss" scoped>

</style>
