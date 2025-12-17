<template>
    <div class="edge-panel">
        <div class="form-item">
            <label>Label</label>
            <el-input v-model="edge.label" placeholder="Enter edge label..." />
        </div>
        <div class="form-item">
            <label>Edge Shape</label>
            <el-select v-model="edge.type" placeholder="Select shape">
                <el-option label="Bezier (Default)" value="default" />
                <el-option label="Straight" value="straight" />
                <el-option label="Smooth Step" value="smoothstep" />
                <el-option label="Step" value="step" />
            </el-select>
        </div>
        <div class="form-item">
            <label>Edge Color</label>
            <el-select v-model="edge.style.stroke" placeholder="Select color">
                <el-option label="Green" value="green" />
                <el-option label="Red" value="red" />
                <el-option label="Blue" value="blue" />
                <el-option label="Yellow" value="yellow" />
                <el-option label="Gray" value="gray" />
            </el-select>
        </div>
    </div>
</template>

<script setup>
const edge = defineModel('edge', {
    default: () => ({
        label: '',
        type: 'default',
        style: {
            stroke: 'green'
        }
    })
})
console.log('edge: ', edge.value)
</script>

<style scoped>
.form-item {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 16px;
}

.form-item label {
    font-size: 14px;
    color: #606266;
    font-weight: 500;
}
</style>
