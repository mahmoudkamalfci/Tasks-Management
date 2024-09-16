<script setup>
  import { useAppStore } from '@/stores/app'
  import { storeToRefs } from 'pinia'

  const appStore = useAppStore()
  const { boards, search, selectedSort } = storeToRefs(appStore)

  const searchedBoards = computed(() => {
    if (!search.value) { return boards.value }

    const searchQuery = search.value.toLowerCase()
    return boards.value.map(board => ({
      ...board,
      tasks: board.tasks.filter(task =>
        task?.title?.toLowerCase().includes(searchQuery) ||
        task?.desc?.toLowerCase().includes(searchQuery)
      ),
    }))
  })

</script>
<template>
  <v-container fluid>
    <v-row class="mt-4">
      <v-col>
        <h1>Tasks Managements</h1>
      </v-col>
      <v-col>
        <div class="d-flex align-center justify-end">
          <v-text-field
            v-model="search"
            class="me-3"
            label="search"
            max-width="250"
            variant="outlined"
          />
          <v-select
            v-model="selectedSort"
            :items="['asc', 'desc']"
            label="sort by priority"
            max-width="250"
            variant="outlined"
            @update:model-value="appStore.sortTasks"
          />
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        v-for="(board, index) in searchedBoards"
        :key="index"
        cols="6"
        md="3"
      >
        <Board :board="board" @clear-search="search = ''" />
      </v-col>
    </v-row>

  </v-container>
</template>
