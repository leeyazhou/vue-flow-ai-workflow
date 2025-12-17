<template>
    <BaseNode :id="id" :selected="selected" @add-node="$emit('add-node', $event)">
        <template #icon>
            <el-icon class="icon">
                <ChatDotRound />
            </el-icon>
        </template>
        <template #title>
            {{ data.label || 'LLM Node' }}
        </template>
        <template #tag>
            <el-tag size="small" type="success">LLM</el-tag>
        </template>
        <template #description>
            {{ data.description || 'Processes input using a Large Language Model.' }}
        </template>
    </BaseNode>
</template>

<script setup>
import { ChatDotRound } from '@element-plus/icons-vue'
import BaseNode from './BaseNode.vue'

defineProps({
    id: {
        type: String,
        required: true,
    },
    selected: {
        type: Boolean,
        default: false,
    },
    data: {
        type: Object,
        default: () => ({}),
    }
})

defineEmits(['add-node'])
</script>

<style scoped>
.icon {
    font-size: 18px;
    color: #67c23a;
}
</style>
