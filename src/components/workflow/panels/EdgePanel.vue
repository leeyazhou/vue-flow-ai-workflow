<template>
    <div class="edge-panel">
        <div class="form-item">
            <label>连线标签</label>
            <el-input v-model="edge.label" placeholder="输入标签" size="small" />
        </div>
        <div class="form-item">
            <label>连线形状</label>
            <el-select v-model="edge.type" placeholder="选择形状" size="small">
                <el-option label="贝塞尔 (默认)" value="default" />
                <el-option label="直线" value="straight" />
                <el-option label="平滑阶梯" value="smoothstep" />
                <el-option label="阶梯" value="step" />
            </el-select>
        </div>
        <div class="form-item">
            <label>连线颜色</label>
            <el-select v-model="edge.style.stroke" placeholder="选择颜色" size="small">
                <el-option label="绿色" value="green" />
                <el-option label="红色" value="red" />
                <el-option label="蓝色" value="blue" />
                <el-option label="黄色" value="yellow" />
                <el-option label="灰色" value="gray" />
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
function initEdge() {
    if (edge && edge.value && edge.value.style === undefined) {
        edge.value.style = {
            stroke: 'green'
        }
    }
}
initEdge()
console.log('edge: ', edge.value)
</script>

<style scoped>
.edge-panel {
    display: flex;
    flex-direction: column;
    gap: 10px;
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
