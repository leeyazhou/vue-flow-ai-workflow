<template>
    <div class="condition-panel">
        <div class="form-item">
            <label>变量</label>
            <el-select v-model="data.variable" placeholder="选择变量或输入变量名" filterable allow-create size="small">
                <el-option-group v-for="group in availableVariables" :key="group.nodeId" :label="group.nodeLabel">
                    <el-option v-for="variable in group.variables" :key="variable.name" :label="variable.name"
                        :value="variable.name">
                        <div class="variable-option">
                            <span class="var-name">{{ variable.name }}</span>
                            <el-tag size="small" type="info" class="var-type">{{ variable.type }}</el-tag>
                        </div>
                        <div class="var-description">{{ variable.description }}</div>
                    </el-option>
                </el-option-group>
                <template v-if="availableVariables.length === 0">
                    <el-option disabled value="">
                        <span style="color: #909399;">暂无可用变量,请先连接前置节点</span>
                    </el-option>
                </template>
            </el-select>
        </div>

        <div class="form-item">
            <label>操作符</label>
            <el-select v-model="data.operator" placeholder="选择操作符" size="small">
                <el-option label="等于 (==)" value="==" />
                <el-option label="不等于 (!=)" value="!=" />
                <el-option label="包含" value="contains" />
                <el-option label="不包含" value="not_contains" />
                <el-option label="大于 (>)" value=">" />
                <el-option label="小于 (<)" value="<" />
                <el-option label="大于等于 (>=)" value=">=" />
                <el-option label="小于等于 (<=)" value="<=" />
            </el-select>
        </div>

        <div class="form-item">
            <label>比较值</label>
            <el-input v-model="data.value" placeholder="输入比较值" />
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue'
import { collectPredecessorVariables } from '@/utils/workflowSchema'

const props = defineProps({
    nodeId: {
        type: String,
        default: ''
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

const data = defineModel('data', {
    default: () => ({
        variable: '',
        operator: '==',
        value: ''
    })
})

// 收集前置节点的所有变量,按节点分组
const availableVariables = computed(() => {
    if (!props.nodeId || !props.workflowNodes || !props.workflowEdges) {
        return []
    }

    return collectPredecessorVariables(
        props.nodeId,
        props.workflowNodes,
        props.workflowEdges
    )
})
</script>

<style scoped>
.condition-panel {
    display: flex;
    flex-direction: column;
    gap: 10px;
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

.variable-option {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
}

.var-name {
    flex: 1;
    font-family: 'Courier New', monospace;
    font-size: 13px;
}

.var-type {
    font-size: 11px;
}

.var-description {
    font-size: 11px;
    color: #909399;
    margin-top: 2px;
    padding-left: 4px;
}

/* 自定义下拉选项样式 */
:deep(.el-select-dropdown__item) {
    height: auto;
    padding: 8px 12px;
    line-height: 1.4;
}
</style>
