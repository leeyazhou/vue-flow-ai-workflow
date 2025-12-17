<template>
  <Workflow :workflow="workflowData" />
</template>

<script setup>
import Workflow from './components/workflow/Workflow.vue'
import { workflow } from './mocks/workflowMockAPI'
import { ref } from 'vue'

const workflowData = ref(workflow)
// workflowData.value = {
//   nodes: [{
//     id: 'start',
//     type: 'start',
//     position: { x: 100, y: 100 },
//     label: 'Start',
//     data: { label: 'Start', description: 'Entry point' },
//   }],
//   edges: []
// }
</script>

<style scoped></style>
