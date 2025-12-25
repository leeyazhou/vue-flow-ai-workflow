<template>
    <div class="panel-section">
        <div class="form-item">
            <label>知识库</label>
            <el-select v-model="data.knowledgeId" placeholder="选择知识库" size="small">
                <el-option v-for="knowledge in workflowConfig.knowledgeList" :label="knowledge.name" :key="knowledge.id"
                    :value="knowledge.id" />
            </el-select>
        </div>

        <div class="form-item">
            <label>返回数量 (Top K)</label>
            <el-input-number v-model="data.topK" :min="1" :max="10" size="small" />
        </div>

        <div class="output-section">
            <div class="section-header">
                <label>输入参数</label>
                <el-button v-if="inputParams.length == 0" type="primary" size="small" @click="addInputParameter">
                    <el-icon>
                        <Plus />
                    </el-icon>
                </el-button>
            </div>

            <el-table :data="inputParams" size="small" border class="compact-table" :empty-text="'默认输出 response'">
                <el-table-column type="index" label="#" width="30" align="center" />

                <el-table-column label="变量名" min-width="100">
                    <template #default="{ row }">
                        <el-input v-model="row.name" placeholder="例: result" size="small" class="compact-input" />
                    </template>
                </el-table-column>

                <el-table-column label="类型" width="100">
                    <template #default="{ row }">
                        <el-select v-model="row.paramMapKey" placeholder="选择使用的变量" filterable size="small" collapse-tags
                            collapse-tags-tooltip>
                            <el-option-group v-for="group in availableParams" :key="group.nodeId"
                                :label="group.nodeLabel">
                                <el-option v-for="variable in group.variables" :key="variable.name"
                                    :label="variable.name" :value="group.nodeId + '.' + variable.name">
                                    <div class="variable-option">
                                        <span class="var-name">{{ variable.name }}</span>
                                        <el-tag size="small" type="info" class="var-type">{{ variable.type }}</el-tag>
                                    </div>
                                </el-option>
                            </el-option-group>

                            <template v-if="availableParams.length === 0">
                                <el-option disabled value="">
                                    <span style="color: #909399;">暂无可用变量,请先连接前置节点</span>
                                </el-option>
                            </template>
                        </el-select>
                    </template>
                </el-table-column>

                <el-table-column label="操作" width="41" align="center" fixed="right">
                    <template #default="{ $index }">
                        <el-button type="danger" link size="small" @click="removeInputParameter($index)">
                            <el-icon>
                                <Delete />
                            </el-icon>
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!-- 输出参数配置 -->
        <div class="output-section">
            <div class="section-header">
                <label>输出参数</label>
                <el-button type="primary" size="small" @click="addOutputParameter">
                    <el-icon>
                        <Plus />
                    </el-icon>
                </el-button>
            </div>

            <el-table :data="outputParams" size="small" border class="compact-table" :empty-text="'默认输出 response'">
                <el-table-column type="index" label="#" width="30" align="center" />

                <el-table-column label="变量名" min-width="100">
                    <template #default="{ row }">
                        <el-input v-model="row.name" placeholder="例: result" size="small" class="compact-input" />
                    </template>
                </el-table-column>

                <el-table-column label="类型" width="85">
                    <template #default="{ row }">
                        <el-select v-model="row.type" size="small" class="compact-select">
                            <el-option v-for="(value, key) in paramType" :key="key" :label="value" :value="key" />
                        </el-select>
                    </template>
                </el-table-column>

                <el-table-column label="操作" width="41" align="center" fixed="right">
                    <template #default="{ $index }">
                        <el-button type="danger" link size="small" @click="removeOutputParameter($index)">
                            <el-icon>
                                <Delete />
                            </el-icon>
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue'
import { collectPredecessorVariables, KnowledgeOutputParams, paramType } from '@/utils/workflowSchema'

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
    },
    workflowConfig: {
        type: Object,
        default: () => {
            knowledgeList: []
        }
    }
})

const data = defineModel('data', {
    default: () => ({
        knowledgeId: '',
        topK: 3,
        inputParams: [],
        outputParams: []
    })
})

// 收集前置节点的所有变量,按节点分组
const availableParams = computed(() => {
    if (!props.nodeId || !props.workflowNodes || !props.workflowEdges) {
        return []
    }

    return collectPredecessorVariables(
        props.nodeId,
        props.workflowNodes,
        props.workflowEdges
    )
})

// 确保输出参数数组存在
const outputParams = computed(() => {
    if (!data.value.outputParams) {
        data.value.outputParams = [...KnowledgeOutputParams]
    }
    return data.value.outputParams
})

const inputParams = computed(() => {
    if (!data.value.inputParams) {
        data.value.inputParams = []
    }
    return data.value.inputParams
})

const addOutputParameter = () => {
    outputParams.value.push({
        name: '',
        type: 'string'
    })
}

const addInputParameter = () => {
    inputParams.value.push({
        name: '',
        type: 'string'
    })
}

const removeOutputParameter = (index) => {
    outputParams.value.splice(index, 1)
}

const removeInputParameter = (index) => {
    inputParams.value.splice(index, 1)
}
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

.output-section {
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin-top: 4px;
}

.section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.section-header label {
    font-size: 12px;
    color: #606266;
    font-weight: 500;
}
</style>
