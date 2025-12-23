<template>
    <BaseNode :id="id" :selected="selected" :show-add-button="false" @add-node="$emit('add-node', $event)">
        <template #icon>
            <el-icon>
                <Operation />
            </el-icon>
        </template>
        <template #title>
            {{ data.label || 'Condition' }}
        </template>
        <template #tag>
            <el-tag size="small" type="warning">IF</el-tag>
        </template>
        <template #description>
            {{ data.description || 'Branch flow based on conditions' }}
        </template>

        <!-- Custom Output Handles -->
        <template #source-handle>
            <div class="condition-handles">
                <!-- Yes Handle Combo -->
                <div class="handle-wrapper yes-wrapper"
                    @click.stop="$emit('add-node', { id, handleId: 'true', event: $event })">
                    <Handle type="source" position="right" id="true" class="handle condition-handle yes-handle" />
                    <el-icon class="plus-icon">
                        <Plus />
                    </el-icon>
                </div>

                <!-- No Handle Combo -->
                <div class="handle-wrapper no-wrapper"
                    @click.stop="$emit('add-node', { id, handleId: 'false', event: $event })">
                    <Handle type="source" position="right" id="false" class="handle condition-handle no-handle" />
                    <el-icon class="plus-icon">
                        <Plus />
                    </el-icon>
                </div>
            </div>
        </template>
    </BaseNode>
</template>

<script setup>
import { Handle } from '@vue-flow/core'
import { Operation, Plus } from '@element-plus/icons-vue'
import BaseNode from './BaseNode.vue'

defineProps({
    id: {
        type: String,
        required: true,
    },
    data: {
        type: Object,
        required: true,
    },
    selected: {
        type: Boolean,
        default: false,
    },
})

defineEmits(['add-node'])
</script>

<style scoped>
.condition-handles {
    position: absolute;
    right: -7px;
    /* Align with BaseNode standard */
    top: 50%;
    /* Center vertically */
    transform: translateY(-50%);
    display: flex;
    flex-direction: column;
    gap: 24px;
    z-index: 10;
}

.handle-wrapper {
    position: relative;
    width: 14px;
    height: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    opacity: 0;
    transition: opacity 0.2s;
}

/* Ensure visibility when hovering the node body (BaseNode) or the handle wrapper itself */
:global(.base-node:hover) .condition-handles .handle-wrapper,
.condition-handles:hover .handle-wrapper,
.handle-wrapper:hover {
    opacity: 1;
}

.base-node:hover :deep(.handle-wrapper) {
    opacity: 1;
}

.plus-icon {
    font-size: 10px;
    color: white;
    pointer-events: none;
    z-index: 20;
    /* Boost z-index to be safe */
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    /* Strictly center */
}

/* Override base node handle styles for these specific handles */
:deep(.condition-handle) {
    width: 14px !important;
    height: 14px !important;
    border-radius: 50%;
    border: none;
    opacity: 1 !important;
    /* Managed by wrapper opacity */
    position: absolute !important;
    right: 0;
    top: 0;
    transform: none !important;
    pointer-events: auto !important;
    z-index: 5;
}

:deep(.yes-handle) {
    background: #67c23a !important;
}

:deep(.no-handle) {
    background: #f56c6c !important;
}
</style>
