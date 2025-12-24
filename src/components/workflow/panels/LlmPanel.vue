<template>
    <div class="panel-section">
        <!-- 输入参数选择 -->
        <div class="form-item">
            <label>输入参数</label>
            <el-select v-model="selectedInputParams" placeholder="选择使用的变量" multiple filterable size="small"
                collapse-tags collapse-tags-tooltip>
                <el-option-group v-for="group in availableParams" :key="group.nodeId" :label="group.nodeLabel">
                    <el-option v-for="variable in group.variables" :key="variable.name" :label="variable.name"
                        :value="variable.name">
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
        </div>

        <div class="form-item">
            <label>模型</label>
            <el-select v-model="data.model" placeholder="选择模型" size="small">
                <el-option v-for="model in workflowConfig.modelList" :label="model.modelName" :value="model.id" />
            </el-select>
        </div>

        <div class="form-item">
            <label>温度: {{ data.temperature }}</label>
            <el-slider v-model="data.temperature" :min="0" :max="1" :step="0.1" size="small" />
        </div>

        <div class="form-item">
            <label>系统提示词</label>
            <el-input v-model="data.systemPrompt" type="textarea" :autosize="{ minRows: 3, maxRows: 6 }"
                placeholder="输入系统指令... 使用 {{变量名}} 引用输入变量" size="small" />
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
                            <el-option label="字符串" value="string" />
                            <el-option label="数字" value="number" />
                            <el-option label="布尔" value="boolean" />
                            <el-option label="对象" value="object" />
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
import { Plus, Delete } from '@element-plus/icons-vue'
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
    },
    workflowConfig: {
        type: Object,
        default: () => {
            modelList: []
        }
    }
})

const data = defineModel('data', {
    default: ({
        model: 'gpt-3.5-turbo',
        temperature: 0.7,
        systemPrompt: '',
        inputParams: [],
        outputParams: []
    })
})

// 选中的输入变量
const selectedInputParams = computed({
    get: () => data.value.inputParams || [],
    set: (val) => {
        data.value.inputParams = val
    }
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
        data.value.outputParams = []
    }
    return data.value.outputParams
})

const addOutputParameter = () => {
    outputParams.value.push({
        name: '',
        type: 'string'
    })
}

const removeOutputParameter = (index) => {
    outputParams.value.splice(index, 1)
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

.compact-table {
    font-size: 12px;
}

.compact-table :deep(.el-table__cell) {
    padding: 4px 0;
}

.compact-input,
.compact-select {
    width: 100%;
}

.compact-input :deep(.el-input__wrapper) {
    padding: 1px 8px;
}

.compact-select :deep(.el-input__wrapper) {
    padding: 1px 8px;
}
</style>
