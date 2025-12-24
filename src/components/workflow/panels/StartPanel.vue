<template>
    <div class="start-panel">
        <div class="section">
            <div class="section-header">
                <h3>内置变量</h3>
                <el-tag size="small" type="info">系统</el-tag>
            </div>
            <el-table :data="builtInVariables" size="small" border class="compact-table">
                <el-table-column type="index" label="#" width="30" align="center" />

                <el-table-column label="变量名" min-width="120">
                    <template #default="{ row }">
                        <span class="readonly-text">{{ row.name }}</span>
                    </template>
                </el-table-column>

                <el-table-column label="类型" width="100">
                    <template #default="{ row }">
                        <el-tag size="small" type="info">{{ getTypeLabel(row.type) }}</el-tag>
                    </template>
                </el-table-column>

                <el-table-column label="说明" min-width="150">
                    <template #default="{ row }">
                        <span class="description-text">{{ row.description }}</span>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <!-- 自定义参数 -->
        <div class="section">
            <div class="section-header">
                <h3>自定义参数</h3>
                <el-button type="primary" size="small" @click="addInputParam">
                    <el-icon>
                        <Plus />
                    </el-icon>
                </el-button>
            </div>

            <el-table :data="inputParams" size="small" border class="compact-table" :empty-text="'暂无参数'">
                <el-table-column type="index" label="#" width="30" align="center" />

                <el-table-column label="变量名" min-width="120">
                    <template #default="{ row }">
                        <el-input v-model="row.name" placeholder="例: user_query" size="small" class="compact-input" />
                    </template>
                </el-table-column>

                <el-table-column label="类型" width="100">
                    <template #default="{ row }">
                        <el-select v-model="row.type" size="small" class="compact-select">
                            <el-option v-for="(value, key) in paramType" :label="value" :value="key" />
                        </el-select>
                    </template>
                </el-table-column>

                <el-table-column label="必填" width="41" align="center">
                    <template #default="{ row }">
                        <el-checkbox v-model="row.required" size="small" />
                    </template>
                </el-table-column>

                <el-table-column label="操作" width="41" align="center" fixed="right">
                    <template #default="{ $index }">
                        <el-button type="danger" link size="small" @click="removeInputParam($index)">
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
import { paramType } from '@/utils/workflowSchema'

const data = defineModel('data', {
    default: () => ({
        inputParams: [],
        outputParams: []
    })
})

// 内置系统变量(只读)
const builtInVariables = [
    {
        name: 'sys.workflow_id',
        type: 'string',
        description: '当前工作流ID',
        required: true,
        builtin: true
    },
    {
        name: 'sys.execution_id',
        type: 'string',
        description: '当前执行实例ID',
        required: true,
        builtin: true
    },
    {
        name: 'sys.timestamp',
        type: 'number',
        description: '执行开始时间戳',
        required: true,
        builtin: true
    },
    {
        name: 'sys.user_id',
        type: 'string',
        description: '触发用户ID',
        required: false,
        builtin: true
    }
]

// 确保参数数组存在
const inputParams = computed(() => {
    if (!data.value.inputParams) {
        data.value.inputParams = []
    }
    return data.value.inputParams
})

// 类型标签映射
const getTypeLabel = (type) => {
    return paramType[type] || type
}

const addInputParam = () => {
    inputParams.value.push({
        name: '',
        type: 'string',
        required: true,
        builtin: false
    })
}

const removeInputParam = (index) => {
    inputParams.value.splice(index, 1)
}
</script>

<style scoped>
.start-panel {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.section {
    display: flex;
    flex-direction: column;
    gap: 6px;
}

.section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 6px;
}

.section-header h3 {
    margin: 0;
    font-size: 12px;
    font-weight: 600;
    color: #303133;
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

.readonly-text {
    color: #606266;
    font-weight: 500;
}

.description-text {
    color: #909399;
    font-size: 12px;
}
</style>
