<template>
    <BaseNode :id="id" :selected="selected" @add-node="$emit('add-node', $event)" :show-add-button="false">
        <template #icon>
            <el-icon class="icon">
                <SwitchButton />
            </el-icon>
        </template>
        <template #title>
            {{ data.label || 'End Link' }}
        </template>
        <template #tag>
            <el-tag size="small" type="danger">End</el-tag>
        </template>
        <template #description>
            {{ data.description || 'The workflow ends here.' }}
        </template>

        <!-- End Node usually doesn't have a source handle, or maybe it does if it chains? 
         User request: "End Node" (结束节点). Usually no output.
         But BaseNode has a source handle slot. We can overwrite it with empty if needed.
         For now, let's keep it consistent or hide it if it's truly an end.
         Let's assume it can be connected FROM, but maybe not TO anything?
         Actually, End Node usually implies no outlet.
         Let's override source-handle slot to be empty.
    -->
    </BaseNode>
</template>

<script setup>
import { SwitchButton } from '@element-plus/icons-vue'
import BaseNode from './BaseNode.vue'

defineProps({
    id: {
        type: String,
        required: true,
    },
    selected: {
        type: Boolean,
        default: false,
    },
    data: {
        type: Object,
        default: () => ({}),
    }
})

defineEmits(['add-node'])
</script>

<style scoped>
.icon {
    font-size: 18px;
    color: #f56c6c;
    /* Red for End/Stop */
}
</style>
