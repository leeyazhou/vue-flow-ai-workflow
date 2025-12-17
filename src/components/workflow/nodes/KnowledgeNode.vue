<template>
    <BaseNode :id="id" :selected="selected" @add-node="$emit('add-node', $event)">
        <template #icon>
            <el-icon class="icon">
                <Collection />
            </el-icon>
        </template>
        <template #title>
            {{ data.label || 'Knowledge Base' }}
        </template>
        <template #tag>
            <el-tag size="small" type="warning">KB</el-tag>
        </template>
        <template #description>
            {{ data.description || 'Select and query a knowledge base.' }}
        </template>
    </BaseNode>
</template>

<script setup>
import { Collection } from '@element-plus/icons-vue'
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
    color: #e6a23c;
    /* Warning/Orange color for Knowledge/Data */
}
</style>
