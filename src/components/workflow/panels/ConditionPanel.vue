<template>
    <div class="condition-panel">
        <div class="form-item">
            <label>Variable</label>
            <el-input v-model="data.variable" placeholder="e.g. input_text" />
        </div>

        <div class="form-item">
            <label>Operator</label>
            <el-select v-model="data.operator" placeholder="Select operator">
                <el-option label="Equals (==)" value="==" />
                <el-option label="Not Equals (!=)" value="!=" />
                <el-option label="Contains" value="contains" />
                <el-option label="Greater Than (>)" value=">" />
                <el-option label="Less Than (<)" value="<" />
            </el-select>
        </div>

        <div class="form-item">
            <label>Value</label>
            <el-input v-model="data.value" placeholder="Comparison value" />
        </div>
    </div>
</template>

<script setup>
const data = defineModel('data', {
    default: () => ({
        variable: '',
        operator: 'contains',
        value: ''
    })
})
</script>

<style scoped>
.form-item {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 12px;
}

.form-item label {
    font-size: 14px;
    color: #606266;
    font-weight: 500;
}
</style>
