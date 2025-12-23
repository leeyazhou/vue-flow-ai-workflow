<template>
    <div class="panel-section">
        <div class="form-item">
            <label>模型</label>
            <el-select v-model="data.model" placeholder="选择模型" size="small">
                <el-option label="GPT-4o" value="gpt-4o" />
                <el-option label="GPT-4 Turbo" value="gpt-4-turbo" />
                <el-option label="GPT-3.5 Turbo" value="gpt-3.5-turbo" />
                <el-option label="Claude 3.5 Sonnet" value="claude-3-5-sonnet" />
            </el-select>
        </div>

        <div class="form-item">
            <label>温度: {{ data.temperature }}</label>
            <el-slider v-model="data.temperature" :min="0" :max="1" :step="0.1" size="small" />
        </div>

        <div class="form-item">
            <label>系统提示词</label>
            <el-input v-model="data.systemPrompt" type="textarea" :autosize="{ minRows: 3, maxRows: 6 }"
                placeholder="输入系统指令..." size="small" />
        </div>
    </div>
</template>

<script setup>
const data = defineModel('data', {
    default: () => ({
        model: 'gpt-3.5-turbo',
        temperature: 0.7,
        systemPrompt: '',
    })
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
</style>
