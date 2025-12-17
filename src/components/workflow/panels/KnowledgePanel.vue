<template>
    <div class="panel-section">
        <div class="form-item">
            <label>Knowledge Base</label>
            <el-select v-model="data.knowledgeBaseId" placeholder="Select Knowledge Base">
                <el-option label="Company Docs" value="kb-001" />
                <el-option label="Product Manuals" value="kb-002" />
                <el-option label="Legal Archive" value="kb-003" />
            </el-select>
        </div>

        <div class="form-item">
            <label>Top K</label>
            <el-input-number v-model="data.topK" :min="1" :max="10" />
        </div>
    </div>
</template>

<script setup>
const data = defineModel('data', {
    default: () => ({
        knowledgeBaseId: '',
        topK: 3,
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
