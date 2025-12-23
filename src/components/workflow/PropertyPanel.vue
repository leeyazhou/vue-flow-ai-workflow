<template>
    <div class="property-panel" v-if="node">
        <div class="panel-header">
            <span>属性</span>
            <el-icon class="close-btn" @click="$emit('close')">
                <Close />
            </el-icon>
        </div>
        <div class="panel-content">
            <!-- Edge Editing -->
            <EdgePanel v-if="isEdge" :edge="node" />
            <!-- Node Editing -->
            <div v-else>
                <div class="form-item">
                    <label>节点名称</label>
                    <el-input v-model="localLabel" size="small" @input="updateNode" />
                </div>
                <div class="form-item">
                    <label>描述</label>
                    <el-input v-model="localDescription" type="textarea" :autosize="{ minRows: 2, maxRows: 4 }"
                        size="small" @input="updateNode" />
                </div>
                <component :is="specificPanel" v-if="specificPanel" :data="node.data" :node-id="node.id"
                    :workflow-nodes="workflowNodes" :workflow-edges="workflowEdges" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import { Close } from '@element-plus/icons-vue'
import LlmPanel from './panels/LlmPanel.vue'
import KnowledgePanel from './panels/KnowledgePanel.vue'
import ConditionPanel from './panels/ConditionPanel.vue'
import StartPanel from './panels/StartPanel.vue'
import EdgePanel from './panels/EdgePanel.vue'

const props = defineProps({
    node: {
        type: Object,
        default: null,
    },
    workflowNodes: {
        type: Array,
        default: () => []
    },
    workflowEdges: {
        type: Array,
        default: () => []
    }
})

const emit = defineEmits(['close', 'update'])

const localLabel = ref('')
const localDescription = ref('')

// Map node types to panel components
const panelMap = {
    start: StartPanel,
    llm: LlmPanel,
    knowledge: KnowledgePanel,
    condition: ConditionPanel,
    edge: EdgePanel,
}

const isEdge = computed(() => props.node && (props.node.source || props.node.target))

const specificPanel = computed(() => {
    if (!props.node || isEdge.value) return null
    return panelMap[props.node.type] || null
})

watch(() => props.node, (newNode) => {
    if (newNode) {
        localLabel.value = newNode.label || newNode.data?.label || ''
        localDescription.value = newNode.data?.description || ''
    }
}, { immediate: true, deep: true })

const updateNode = () => {
    emit('update', {
        id: props.node.id,
        label: localLabel.value,
        data: {
            ...props.node.data,
            label: localLabel.value,
            description: localDescription.value,
        }
    })
}
</script>

<style scoped>
.property-panel {
    margin: 60px 12px;
    width: 360px;
    height: 90%;
    position: absolute;
    right: 0;
    top: 0;
    background: white;
    border-left: 1px solid #dcdfe6;
    box-shadow: -2px 0 8px rgba(0, 0, 0, 0.05);
    display: flex;
    flex-direction: column;
    z-index: 10;
}

.panel-header {
    padding: 10px 12px;
    border-bottom: 1px solid #ebeef5;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: 600;
    font-size: 13px;
    color: #303133;
}

.close-btn {
    cursor: pointer;
    color: #909399;
}

.close-btn:hover {
    color: #606266;
}

.panel-content {
    padding: 12px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    overflow-y: auto;
}

.form-item {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.form-item label {
    font-size: 12px;
    color: #606266;
    font-weight: 500;
}
</style>
