<template>
    <BaseNode :id="id" :selected="selected" @add-node="$emit('add-node', $event)">
        <template #icon>
            <el-icon class="icon">
                <VideoPlay />
            </el-icon>
        </template>
        <template #title>
            {{ data.label || 'Start' }}
        </template>
        <template #tag>
            <el-tag size="small" type="primary">Start</el-tag>
        </template>
        <template #description>

            {{ data.description || 'Entry point' }}

            <div class="params-preview">
                <div v-for="param in data.parameters" :key="param.name" class="param-tag">
                    {{ param.name }}
                </div>
            </div>
        </template>
    </BaseNode>
</template>

<script setup>
import { VideoPlay } from '@element-plus/icons-vue'
import BaseNode from './BaseNode.vue'
import { onUpdated, onMounted } from 'vue'

const props = defineProps({
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
        required: true,
    }
})

defineEmits(['add-node'])
</script>

<style scoped>
.params-preview {
    margin-top: 8px;
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
    /* Debugging border */
    min-height: 10px;
}

.param-tag {
    background: #ecf5ff;
    color: #409eff;
    border: 1px solid #d9ecff;
    border-radius: 4px;
    padding: 0 4px;
    font-size: 9px;
    line-height: 14px;
}

.param-more {
    font-size: 9px;
    color: #909399;
}

.icon {
    font-size: 18px;
    color: #409eff;
}
</style>
