<template>
    <div class="panel-section">
        <div class="form-item">
            <label>Model</label>
            <el-select v-model="data.model" placeholder="Select Model">
                <el-option label="GPT-4o" value="gpt-4o" />
                <el-option label="GPT-4 Turbo" value="gpt-4-turbo" />
                <el-option label="GPT-3.5 Turbo" value="gpt-3.5-turbo" />
                <el-option label="Claude 3.5 Sonnet" value="claude-3-5-sonnet" />
            </el-select>
        </div>

        <div class="form-item">
            <label>Temperature: {{ data.temperature }}</label>
            <el-slider v-model="data.temperature" :min="0" :max="1" :step="0.1" />
        </div>

        <div class="form-item">
            <label>System Prompt</label>
            <el-input v-model="data.systemPrompt" type="textarea" :rows="5"
                placeholder="Enter system instructions..." />
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
    gap: 16px;
    border-top: 1px solid #ebeef5;
    padding-top: 16px;
    margin-top: 8px;
}

.form-item {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.form-item label {
    font-size: 14px;
    color: #606266;
    font-weight: 500;
}
</style>
