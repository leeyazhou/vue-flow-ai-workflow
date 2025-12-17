<template>
    <div class="start-panel">
        <div class="panel-header">
            <h3>Input Parameters</h3>
            <el-button type="primary" link size="small" @click="addParameter">
                <el-icon>
                    <Plus />
                </el-icon>
            </el-button>
        </div>

        <div class="parameters-list">
            <div v-for="(param, index) in parameters" :key="index" class="parameter-item">
                <div class="param-header">
                    <span class="param-index">#{{ index + 1 }}</span>
                    <el-button type="danger" link size="small" @click="removeParameter(index)">
                        <el-icon>
                            <Delete />
                        </el-icon>
                    </el-button>
                </div>

                <div class="form-item">
                    <label>Variable Name</label>
                    <el-input v-model="param.name" placeholder="e.g. user_query" size="small" />
                </div>

                <div class="form-row">
                    <div class="form-item half">
                        <label>Type</label>
                        <el-select v-model="param.type" size="small">
                            <el-option label="String" value="string" />
                            <el-option label="Number" value="number" />
                            <el-option label="Boolean" value="boolean" />
                            <el-option label="Object" value="object" />
                        </el-select>
                    </div>
                    <div class="form-item half checkbox-container">
                        <el-checkbox v-model="param.required" label="Required" size="small" />
                    </div>
                </div>
            </div>

            <div v-if="parameters.length === 0" class="empty-state">
                No parameters defined.
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue'
import { Plus, Delete } from '@element-plus/icons-vue'

const data = defineModel('data', {
    default: () => ({ parameters: [] })
})

// Ensure parameters array exists
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
    border-bottom: 1px solid #ebeef5;
    padding-bottom: 8px;
}

.panel-header h3 {
    margin: 0;
    font-size: 14px;
    font-weight: 600;
    color: #606266;
}

.parameters-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
    max-height: 400px;
    overflow-y: auto;
}

.parameter-item {
    background: #f5f7fa;
    border-radius: 6px;
    padding: 10px;
    border: 1px solid #ebeef5;
}

.param-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;
}

.param-index {
    font-size: 12px;
    font-weight: bold;
    color: #909399;
}

.form-item {
    display: flex;
    flex-direction: column;
    gap: 4px;
    margin-bottom: 8px;
}

.form-item label {
    font-size: 12px;
    color: #606266;
}

.form-row {
    display: flex;
    gap: 10px;
}

.half {
    flex: 1;
}

.checkbox-container {
    justify-content: flex-end;
    padding-bottom: 4px;
}

.empty-state {
    text-align: center;
    color: #909399;
    font-size: 12px;
    padding: 20px 0;
}
</style>
