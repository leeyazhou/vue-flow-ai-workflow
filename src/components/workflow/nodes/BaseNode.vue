<template>
    <div class="base-node" :class="{ selected }">
        <slot name="target-handle" v-if="showTargetHandle">
            <Handle type="target" position="left" class="handle" />
        </slot>

        <div class="node-container">
            <div class="node-header">
                <div class="icon-wrapper">
                    <slot name="icon"></slot>
                </div>
                <div class="title-wrapper">
                    <el-text line-clamp="1" size="default">
                        <slot name="title"></slot>
                    </el-text>
                </div>
                <div class="tag-wrapper">
                    <slot name="tag"></slot>
                </div>
            </div>

            <div class="node-description">
                <el-text line-clamp="1" size="small">
                    <slot name="description"></slot>
                </el-text>
            </div>
        </div>

        <!-- Source Handle (Right) + Add Button Combo -->
        <slot name="source-handle" v-if="showSourceHandle">
            <div class="source-handle-wrapper" @click.stop="$emit('add-node', { id, event: $event })">
                <Handle type="source" position="right" class="handle" />
                <el-icon class="plus-icon">
                    <Plus />
                </el-icon>
            </div>
        </slot>
    </div>
</template>

<script setup>
import { Handle } from '@vue-flow/core'
import { Plus } from '@element-plus/icons-vue'

defineProps({
    id: {
        type: String,
        required: true,
    },
    selected: {
        type: Boolean,
        default: false,
    },
    showSourceHandle: {
        type: Boolean,
        default: true,
    },
    showTargetHandle: {
        type: Boolean,
        default: true,
    }
})

defineEmits(['add-node'])
</script>

<style scoped>
.base-node {
    display: flex;
    flex-direction: column;
    background: #fff;
    border: 1px solid #dcdfe6;
    border-radius: 8px;
    padding: 12px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    position: relative;
    width: 200px;
    transition: all 0.2s;
}

.base-node.selected {
    border-color: #409eff;
    box-shadow: 0 0 0 2px rgba(64, 158, 255, 0.2);
}

.node-container {
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
}

.node-header {
    display: flex;
    align-items: center;
    gap: 8px;
    border-bottom: 1px solid #eee;
    padding-bottom: 8px;
    margin-bottom: 4px;
}

.icon-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
}

.title-wrapper {
    flex: 1;
    text-align: center;
    font-weight: 600;
    font-size: 14px;
    color: #303133;
}

.tag-wrapper {
    display: flex;
    align-items: center;
}

.node-description {
    font-size: 9px;
    color: #909399;
    line-height: 2.0;
    min-height: 16px;
}

/* Combined Handle and Add Button Styles */
.source-handle-wrapper {
    position: absolute;
    right: -7px;
    top: 50%;
    transform: translateY(-50%);
    width: 14px;
    height: 14px;
    z-index: 10;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: all 0.2s;
}

.base-node:hover .source-handle-wrapper {
    opacity: 1;
    right: -7px;
}

.plus-icon {
    font-size: 10px;
    color: white;
    pointer-events: none;
    /* Let clicks pass to wrapper/handle? No, wrapper handles click. */
    z-index: 6;
    position: absolute;
}

/* Global handle styles for visuals */
:deep(.handle) {
    width: 14px !important;
    height: 14px !important;
    background: #409eff !important;
    border: none;
    border-radius: 50%;
    pointer-events: auto;
    z-index: 5;
    position: absolute;
    opacity: 0;
    transition: opacity 0.2s;
}

/* Show handles on hover */
.base-node:hover :deep(.handle) {
    opacity: 1;
}

/* Specific styling for Source Handle (inside wrapper) */
.source-handle-wrapper :deep(.handle) {
    right: 0;
    top: 0;
    transform: none !important;
}

/* Specific styling for Target Handle (Left side) */
:deep(.vue-flow__handle-left.handle) {
    left: -7px;
    /* Half of width to center on edge */
    top: 50%;
    transform: translateY(-50%) !important;
}

/* User can't manually drag edge if no handle? Or maybe they want to dropping edges? 
                             If I set pointer-events: none, manual connection stops working.
                             The user said "keep + button", implying they use + mostly.
}

/* Removed hover effect */
</style>
