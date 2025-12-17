<template>
    <div v-if="visible" class="node-menu" :style="{ top: position.y + 'px', left: position.x + 'px' }" ref="menuRef">
        <div class="menu-header">Select Node</div>
        <div class="menu-list">
            <div class="menu-item" @click="$emit('select', 'llm')">
                <el-icon>
                    <ChatDotRound />
                </el-icon>
                <span>LLM Node</span>
            </div>
            <div class="menu-item" @click="$emit('select', 'knowledge')">
                <el-icon>
                    <Collection />
                </el-icon>
                <span>Knowledge Base</span>
            </div>
            <div class="menu-item" @click="$emit('select', 'condition')">
                <el-icon>
                    <Operation />
                </el-icon>
                <span>Condition</span>
            </div>
            <div class="menu-item" @click="$emit('select', 'end')">
                <el-icon>
                    <SwitchButton />
                </el-icon>
                <span>End</span>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import {
    ChatDotRound,
    Operation,
    SwitchButton,
    Collection
} from '@element-plus/icons-vue'

const props = defineProps({
    visible: Boolean,
    position: {
        type: Object,
        default: () => ({ x: 0, y: 0 })
    }
})

const emit = defineEmits(['select', 'close'])

const menuRef = ref(null)

const closeMenu = (e) => {
    if (props.visible && menuRef.value && !menuRef.value.contains(e.target)) {
        emit('close')
    }
}

onMounted(() => {
    document.addEventListener('click', closeMenu) // Use capture or bubble? 
    // We need to be careful not to close immediately if the click that opened it bubbles up.
    // WorkflowCanvas uses setTimeout to add listener, we can rely on parent handling or do it here.
    // Let's rely on the parent (WorkflowCanvas) to handle the global click-outside for now to perfectly match previous behavior, 
    // OR move the logic here. Moving it here is cleaner.
})

// However, if we add the listener immediately on mount, and the mount happens on click, it might trigger.
// But this component uses v-if in parent, so it mounts when shown.
// So we need a small delay or use setTimeout.
onMounted(() => {
    setTimeout(() => {
        document.addEventListener('click', closeMenu)
    }, 0)
})

onUnmounted(() => {
    document.removeEventListener('click', closeMenu)
})
</script>

<style scoped>
.node-menu {
    position: absolute;
    z-index: 1000;
    background: white;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    border: 1px solid #e4e7ed;
    width: 200px;
    overflow: hidden;
}

.menu-header {
    padding: 10px 12px;
    background: #f5f7fa;
    font-size: 12px;
    color: #909399;
    font-weight: 600;
    border-bottom: 1px solid #ebeef5;
}

.menu-list {
    padding: 4px 0;
}

.menu-item {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 12px;
    cursor: pointer;
    transition: background 0.2s;
    font-size: 14px;
    color: #606266;
}

.menu-item:hover {
    background: #ecf5ff;
    color: #409eff;
}
</style>
