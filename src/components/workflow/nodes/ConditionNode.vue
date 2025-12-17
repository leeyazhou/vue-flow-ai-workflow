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
                <div class="handle-wrapper">
                    <!--
                    <span class="handle-label yes">Yes</span>
                -->
                    <Handle type="source" position="right" id="true" class="handle condition-handle yes-handle" />
                    <!-- Yes Link Button -->
                    <div class="link-button yes-btn"
                        @click.stop="$emit('add-node', { id, handleId: 'true', event: $event })">
                        <el-icon>
                            <Plus />
                        </el-icon>
                    </div>
                </div>
                <div class="handle-wrapper">
                    <!--
                    <span class="handle-label no">No</span>
                    -->
                    <Handle type="source" position="right" id="false" class="handle condition-handle no-handle" />
                    <!-- No Link Button -->
                    <div class="link-button no-btn"
                        @click.stop="$emit('add-node', { id, handleId: 'false', event: $event })">
                        <el-icon>
                            <Plus />
                        </el-icon>
                    </div>
                </div>
            </div>
        </template>
    </BaseNode>
</template>

<script setup>
import { Handle } from '@vue-flow/core'
import { Operation } from '@element-plus/icons-vue'
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
    right: 0px;
    /* Moved closer to be on the edge. Diamond tip is at right: 0 approx. */
    top: 60%;
    transform: translateY(-50%);
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.handle-wrapper {
    position: relative;
    display: flex;
    align-items: center;
}

.handle-label {
    position: absolute;
    right: 16px;
    font-size: 10px;
    font-weight: bold;
    pointer-events: none;
}

.handle-label.yes {
    color: #67c23a;
}

.handle-label.no {
    color: #f56c6c;
}

/* Override base node handle styles for these specific handles */
:deep(.condition-handle) {
    width: 8px !important;
    height: 8px !important;
    border-radius: 50%;
    border: 1px solid white;
    opacity: 1 !important;
    /* Always visible for condition logic */
    position: static !important;
    /* Relative to wrapper */
    pointer-events: auto !important;
}

:deep(.yes-handle) {
    background: #67c23a !important;
}

:deep(.no-handle) {
    background: #f56c6c !important;
}

/* Link Buttons */
.link-button {
    width: 14px;
    height: 14px;
    font-size: 10px;
    background: #409eff;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    opacity: 0;
    transition: opacity 0.2s;
    position: absolute;
    right: -7px;
    top: 5%;
    transform: translateY(-50%);
    /* Keep buttons outside */
    pointer-events: auto;
}

.handle-wrapper:hover .link-button {
    opacity: 1;
}

.yes-btn {
    background: #67c23a;
}

.no-btn {
    background: #f56c6c;
}
</style>
