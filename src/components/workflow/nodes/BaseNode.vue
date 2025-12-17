<template>
    <div class="base-node" :class="{ selected }">
        <slot name="target-handle">
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

        <!-- Add Button -->
        <div v-if="showAddButton" class="add-button" @click.stop="$emit('add-node', { id, event: $event })">
            <el-icon>
                <Plus />
            </el-icon>
        </div>

        <slot name="source-handle">
            <Handle type="source" position="right" class="handle" />
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
    showAddButton: {
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
    /* Ensure some height even if empty? Or hide if empty */
}

.add-button {
    position: absolute;
    right: -7px;
    /* Half of 14px width */
    top: 50%;
    transform: translateY(-50%);
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
    transition: all 0.2s;
    z-index: 10;
    opacity: 0;
    pointer-events: none;
}

.base-node:hover .add-button {
    opacity: 1;
    pointer-events: auto;
    right: -7px;
}

/* Global handle styles to ensure consistency if specific nodes override */
:deep(.handle) {
    width: 1px !important;
    height: 1px !important;
    background: transparent !important;
    border: none;
    opacity: 0;
    pointer-events: none;
    /* User can't manually drag edge if no handle? Or maybe they want to dropping edges? 
                             If I set pointer-events: none, manual connection stops working.
                             The user said "keep + button", implying they use + mostly.
                             But I previously fixed manual connection. 
                             If I hide dots, manual connection is hard. 
                             Let's keep them interactable but invisible? 
                             Or maybe just invisible. 
                             "No left, right dots". 
                             I'll make them transparent. 
                          */
}

/* Removed hover effect */
</style>
