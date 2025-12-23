<template>
    <div class="panel-section">
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
