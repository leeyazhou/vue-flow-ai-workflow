<template>
    <div class="workflow-container">
        <VueFlow :nodes="workflow.nodes" :edges="workflow.edges" :node-types="nodeTypes" :default-zoom="1.5"
            :min-zoom="0.2" :max-zoom="4" :class="{ dark }" class="basic-flow" :connect-on-click="false"
            :fit-view-on-init="true">
            <Background pattern-color="#aaa" gap="16" />
            <HelperLines />
            <MiniMap />
            <Controls position="bottom-left">
                <ControlButton title="Reset Transform" @click="resetTransform">
                    <ToolBarIcon name="reset" />
                </ControlButton>

                <ControlButton title="Toggle Dark Mode" @click="toggleDarkMode">
                    <ToolBarIcon v-if="dark" name="sun" />
                    <ToolBarIcon v-else name="moon" />
                </ControlButton>

                <ControlButton title="Optimize Layout" @click="handleLayout">
                    <ToolBarIcon name="layout" />
                </ControlButton>

                <ControlButton title="Log `toObject`" @click="logToObject">
                    <ToolBarIcon name="log" />
                </ControlButton>
            </Controls>

            <!-- Custom Events for Nodes -->
            <template #node-Start="props">
                <StartNode v-bind="props" @add-node="onAddNode" />
            </template>
            <template #node-LLM="props">
                <LlmNode v-bind="props" @add-node="onAddNode" />
            </template>
            <template #node-Knowledge="props">
                <KnowledgeNode v-bind="props" @add-node="onAddNode" />
            </template>
            <template #node-Condition="props">
                <ConditionNode v-bind="props" @add-node="onAddNode" />
            </template>
            <template #node-End="props">
                <EndNode v-bind="props" @add-node="onAddNode" />
            </template>
        </VueFlow>

        <!-- Node Menu Component -->
        <NodeMenu v-if="menuVisible" :visible="menuVisible" :position="{ x: menuX, y: menuY }" @select="handleAddNode"
            @close="menuVisible = false" />

        <PropertyPanel v-if="selectedNode" :node="selectedNode" :workflow-nodes="getNodes" :workflow-edges="getEdges"
            :workflow-config="workflowConfig" @close="selectedNode = null" @update="handleNodeUpdate" />

        <!-- Publish Button -->
        <div class="publish-controls">
            <el-button type="primary" @click="handlePublish">
                Publish
            </el-button>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { VueFlow, useVueFlow, MarkerType } from '@vue-flow/core'
import { Background } from '@vue-flow/background'
import { ControlButton, Controls } from '@vue-flow/controls'
import { MiniMap } from '@vue-flow/minimap'
import StartNode from './nodes/StartNode.vue'
import LlmNode from './nodes/LlmNode.vue'
import KnowledgeNode from './nodes/KnowledgeNode.vue'
import ConditionNode from './nodes/ConditionNode.vue'
import EndNode from './nodes/EndNode.vue'
import NodeMenu from './NodeMenu.vue'
import PropertyPanel from './PropertyPanel.vue'
import ToolBarIcon from './ToolBarIcon.vue'
import HelperLines from './HelperLines.vue'
import { ElMessage } from 'element-plus'

const { addNodes, addEdges, onConnect, project, getNodes, getEdges, onNodeClick, onEdgeClick, onPaneClick, toObject, setViewport, fitView, findEdge, findNode } = useVueFlow()
const dark = ref(false)

onConnect((params) => addEdges({
    ...params,
    animated: true,
    style: { strokeWidth: 1.5 },
    markerEnd: MarkerType.ArrowClosed,
}))
const props = defineProps({
    onPublish: Function
})
const workflow = defineModel('workflow', {
    type: Object,
    default: {
        nodes: [{
            id: 'start',
            type: 'Start',
            position: { x: 100, y: 100 },
            label: 'Start',
            data: { label: 'Start', description: 'Entry point' },
        }],
        edges: []
    },
    required: false
})

const workflowConfig = defineModel('workflowConfig', {
    type: Object,
    default: {
    },
    required: false
})

const nodeTypes = {
    Start: StartNode,
    LLM: LlmNode,
    Knowledge: KnowledgeNode,
    Condition: ConditionNode,
    End: EndNode,
}

function toggleDarkMode() {
    dark.value = !dark.value
    if (dark.value === true) {
        ElMessage.success('切换暗黑模式成功')
    } else {
        ElMessage.success('切换亮色模式成功')
    }
}

// Selection State
const selectedNode = ref(null)

onNodeClick(({ node }) => {
    selectedNode.value = node
})

onEdgeClick(({ edge }) => {
    selectedNode.value = edge
})

onPaneClick(() => {
    selectedNode.value = null
})

function logToObject() {
    console.log('workflow json: ', toObject())
    ElMessage.success('Workflow data log success!')
}

/**
 * Resets the current viewport transformation (zoom & pan)
 */
function resetTransform() {
    setViewport({ x: 0, y: 0, zoom: 1 })
    ElMessage.success('重置视图成功')
}

const handleNodeUpdate = (updatedElement) => {
    // Check if it's a node or edge
    if (updatedElement.source && updatedElement.target) {
        // It's an edge
        const edge = findEdge(updatedElement.id)
        if (edge) {
            edge.label = updatedElement.label
            edge.type = updatedElement.type // Update edge type
            edge.style = updatedElement.style
            selectedNode.value = { ...edge }
        }
    } else {
        // It's a node
        const node = findNode(updatedElement.id)
        if (node) {
            console.log('Updating node:', node.id, updatedElement)
            node.label = updatedElement.label
            node.data = { ...node.data, ...updatedElement.data }

            // Update selectedNode to reflect changes to the panel itself if needed,
            // but usually panel emits the change, so it has the latest.
            // However, we want to ensure selectedNode stays a valid reference or clone.
            // If we clone, we break the link? 
            // The PropertyPanel props.node is the selectedNode.
            // Use spread to update selectedNode to trigger checking?
            selectedNode.value = { ...node }
        }
    }
}

// Menu State
const menuVisible = ref(false)
const menuX = ref(0)
const menuY = ref(0)
const sourceNodeId = ref(null)
const sourceHandleId = ref(null)

const onAddNode = ({ id, handleId, event }) => {
    sourceNodeId.value = id
    sourceHandleId.value = handleId // Capture specific handle ID if present
    menuX.value = event.clientX + 20
    menuY.value = event.clientY - 20
    menuVisible.value = true
}


const handleAddNode = (type) => {
    if (!sourceNodeId.value) return

    const sourceNode = findNode(sourceNodeId.value)
    if (!sourceNode) return

    const newNodeId = `node-${Date.now()}`
    const newNode = {
        id: newNodeId,
        type: type,
        position: { x: sourceNode.position.x + 300, y: sourceNode.position.y },
        data: { type }
    }

    addNodes([newNode])

    addEdges([{
        id: `e-${sourceNodeId.value}-${newNodeId}`,
        source: sourceNodeId.value,
        sourceHandle: sourceHandleId.value, // Pass specific handle ID
        target: newNodeId,
        animated: true,
        style: { strokeWidth: 2.5 },
        markerEnd: MarkerType.ArrowClosed,
    }])

    menuVisible.value = false
    sourceHandleId.value = null // Reset handle ID
}

// findNode is now imported from useVueFlow

const handlePublish = () => {
    const data = toObject()
    props.onPublish(data);
}

import { useAutoLayout } from '@/utils/workflowAutoLayout'
const { layout } = useAutoLayout()

const handleLayout = () => {
    const nodes = getNodes.value
    const edges = toObject().edges // Use edges from toObject or edges.value? useVueFlow provides getEdges
    // But layout helper uses getNodes/getEdges from useVueFlow() internally if we don't pass them?
    // Our implementation of useAutoLayout takes (nodes, edges) or defaults to useVueFlow() internal state if not cleared.
    // However, for consistency and ensuring we update OUR workflow nodes (which are bound via v-model?), we need to be careful.
    // If we update positions, v-model 'workflow' array should update?
    // VueFlow v-model syncs changes back.

    // Let's try calling layout() without args first, it uses internal state context which is shared if useVueFlow is used in same scope.
    // Actually, useAutoLayout creates its own useVueFlow() call.
    // If useAutoLayout is inside setup, it shares the context.

    // We need to apply changes. layout() returns updated nodes.
    const layoutNodes = layout()

    // We need to batch update nodes or they update automatically?
    // The implementation of layout() in useAutoLayout.js RETURNS the nodes with new positions.
    // It does NOT apply them automatically (unless we change that).
    // Let's update the implementation or use it here.
    // My implementation: return workNodes.map(...) -> returns array of {id, position}.
    // We should apply these updates.

    // Use applyNodeChanges or just update existing nodes?
    // We can use project `setNodes`? Or simply mutate?
    // Since we are using v-model `workflow`, mutating the `workflow` ref works best?
    // Or `findNode` and mutate.

    layoutNodes.forEach(update => {
        const node = findNode(update.id)
        if (node) {
            node.position = update.position
        }
    })

    // Update local workflow model to match?
    // HandleNodeUpdate does "manual" sync, but bulk update might desync if we don't sync.
    // However, VueFlow emits 'nodesChange' which updates v-model?
    // If we mutate node.position directly on the reactive object from internal store, it usually triggers view update.

    // Fit view after layout
    setTimeout(() => {
        fitView()
        ElMessage.success('自动布局成功')
    }, 50)
}

</script>

<style scoped>
.workflow-container {
    width: 100%;
    height: 100%;
    position: relative;
}

.publish-controls {
    position: absolute;
    top: 20px;
    right: 20px;
    z-index: 5;
    /* Above canvas but below menus if needed, or higher? Panel is z-index 10. */
}

/* Thicker connection lines */
:deep(.vue-flow__edge-path) {
    stroke-width: 1.5px !important;
}
</style>
