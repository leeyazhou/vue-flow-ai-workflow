<template>
  <Workflow :workflow="workflowData" :workflow-config="workflowConfig" :on-publish="handlePublish" />
</template>

<script setup>
import Workflow from './components/workflow/Workflow.vue'
import { workflow, workflowConfig } from './mocks/workflowMockAPI'
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

const handlePublish = data => {
  console.log('Published data:', data)
  const jsonString = JSON.stringify(data, null, 2)
  const blob = new Blob([jsonString], { type: 'application/json' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = 'workflow.json'
  link.click()
  URL.revokeObjectURL(link.href)

  ElMessage.success('Workflow data exported!')
  console.log('Exported data:', data)
}
</script>

<style scoped></style>
