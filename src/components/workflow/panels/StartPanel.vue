<template>
    <div class="start-panel">
        <div class="panel-header">
            <h3>输入参数</h3>
            <el-button type="primary" size="small" @click="addParameter">
                <el-icon>
                    <Plus />
                </el-icon>
            </el-button>
        </div>

        <el-table :data="parameters" size="small" border class="compact-table" :empty-text="'暂无参数'">
            <el-table-column type="index" label="#" width="30" align="center" />

            <el-table-column label="变量名" min-width="120">
                <template #default="{ row }">
                    <el-input v-model="row.name" placeholder="例: user_query" size="small" class="compact-input" />
                </template>
            </el-table-column>

            <el-table-column label="类型" width="100">
                <template #default="{ row }">
                    <el-select v-model="row.type" size="small" class="compact-select">
                        <el-option label="字符串" value="string" />
                        <el-option label="数字" value="number" />
                        <el-option label="布尔" value="boolean" />
                        <el-option label="对象" value="object" />
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
                    <el-button type="danger" link size="small" @click="removeParameter($index)">
                        <el-icon>
                            <Delete />
                        </el-icon>
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script setup>
import { computed } from 'vue'
import { Plus, Delete } from '@element-plus/icons-vue'

const data = defineModel('data', {
    default: () => ({ parameters: [] })
})

// 确保参数数组存在
const parameters = computed(() => {
    if (!data.value.parameters) {
        data.value.parameters = []
    }
    return data.value.parameters
})

const addParameter = () => {
    parameters.value.push({
        name: '',
        type: 'string',
        required: true
    })
}

const removeParameter = (index) => {
    parameters.value.splice(index, 1)
}
</script>

<style scoped>
.start-panel {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.panel-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 8px;
}

.panel-header h3 {
    margin: 0;
    font-size: 14px;
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
</style>
