<template>
    <div class="panel-section">
        <!-- 输入参数选择 -->
        <div class="form-item">
            <label>查询变量</label>
            <el-select v-model="data.queryVariable" placeholder="选择查询内容变量" filterable allow-create size="small">
                <el-option-group v-for="group in availableVariables" :key="group.nodeId" :label="group.nodeLabel">
                    <el-option v-for="variable in group.variables" :key="variable.name" :label="variable.name"
                        :value="variable.name">
                        <div class="variable-option">
                            <span class="var-name">{{ variable.name }}</span>
                            <el-tag size="small" type="info" class="var-type">{{ variable.type }}</el-tag>
                        </div>
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
            <label>知识库</label>
            <el-select v-model="data.knowledgeBaseId" placeholder="选择知识库" size="small">
                <el-option label="公司文档" value="kb-001" />
                <el-option label="产品手册" value="kb-002" />
                <el-option label="法律档案" value="kb-003" />
            </el-select>
        </div>

        <div class="form-item">
            <label>返回数量 (Top K)</label>
            <el-input-number v-model="data.topK" :min="1" :max="10" size="small" />
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
        queryVariable: '',
        knowledgeBaseId: '',
        topK: 3,
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
.panel-section {
    display: flex;
    flex-direction: column;
    gap: 10px;
    border-top: 1px solid #ebeef5;
    padding-top: 10px;
    margin-top: 6px;
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
    font-size: 12px;
}

.var-type {
    font-size: 10px;
}
</style>
