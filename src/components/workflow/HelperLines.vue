<template>
    <div class="snapline-container">
        <div v-if="lines.horizontal" class="snapline horizontal" :style="{ top: `${lines.horizontal}px` }"></div>
        <div v-if="lines.vertical" class="snapline vertical" :style="{ left: `${lines.vertical}px` }"></div>
    </div>
</template>

<script setup>
import { useVueFlow } from '@vue-flow/core'
import { ref } from 'vue'

const { onNodeDrag, onNodeDragStop, getNodes } = useVueFlow()

const lines = ref({ horizontal: null, vertical: null })
const threshold = 10

onNodeDrag(({ node }) => {
    const nodes = getNodes.value.filter((n) => n.id !== node.id && !n.hidden)

    let horizontalLine = null
    let verticalLine = null

    const nodeParams = {
        top: node.position.y,
        bottom: node.position.y + (node.dimensions.height || 0),
        left: node.position.x,
        right: node.position.x + (node.dimensions.width || 0),
        centerX: node.position.x + (node.dimensions.width || 0) / 2,
        centerY: node.position.y + (node.dimensions.height || 0) / 2,
    }

    for (const target of nodes) {
        if (!target.dimensions) continue

        const targetParams = {
            top: target.position.y,
            bottom: target.position.y + (target.dimensions.height || 0),
            left: target.position.x,
            right: target.position.x + (target.dimensions.width || 0),
            centerX: target.position.x + (target.dimensions.width || 0) / 2,
            centerY: target.position.y + (target.dimensions.height || 0) / 2,
        }

        // Vertical Alignment (checking x-axis match)
        // Left - Left
        if (Math.abs(nodeParams.left - targetParams.left) < threshold) {
            verticalLine = targetParams.left
            node.position.x = targetParams.left // Snap
        }
        // Right - Right
        else if (Math.abs(nodeParams.right - targetParams.right) < threshold) {
            verticalLine = targetParams.right
            node.position.x = targetParams.right - node.dimensions.width
        }
        // Center - Center
        else if (Math.abs(nodeParams.centerX - targetParams.centerX) < threshold) {
            verticalLine = targetParams.centerX
            node.position.x = targetParams.centerX - node.dimensions.width / 2
        }
        // Left - Right
        else if (Math.abs(nodeParams.left - targetParams.right) < threshold) {
            verticalLine = targetParams.right
            node.position.x = targetParams.right
        }
        // Right - Left
        else if (Math.abs(nodeParams.right - targetParams.left) < threshold) {
            verticalLine = targetParams.left
            node.position.x = targetParams.left - node.dimensions.width
        }

        // Horizontal Alignment (checking y-axis match)
        // Top - Top
        if (Math.abs(nodeParams.top - targetParams.top) < threshold) {
            horizontalLine = targetParams.top
            node.position.y = targetParams.top
        }
        // Bottom - Bottom
        else if (Math.abs(nodeParams.bottom - targetParams.bottom) < threshold) {
            horizontalLine = targetParams.bottom
            node.position.y = targetParams.bottom - node.dimensions.height
        }
        // Center - Center
        else if (Math.abs(nodeParams.centerY - targetParams.centerY) < threshold) {
            horizontalLine = targetParams.centerY
            node.position.y = targetParams.centerY - node.dimensions.height / 2
        }
        // Top - Bottom
        else if (Math.abs(nodeParams.top - targetParams.bottom) < threshold) {
            horizontalLine = targetParams.bottom
            node.position.y = targetParams.bottom
        }
        // Bottom - Top
        else if (Math.abs(nodeParams.bottom - targetParams.top) < threshold) {
            horizontalLine = targetParams.top
            node.position.y = targetParams.top - node.dimensions.height
        }
    }

    lines.value = { horizontal: horizontalLine, vertical: verticalLine }
})

onNodeDragStop(() => {
    lines.value = { horizontal: null, vertical: null }
})
</script>

<style scoped>
.snapline-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 100;
}

.snapline {
    position: absolute;
    background: #ff0072;
    /* Distinct color */
}

.horizontal {
    width: 100%;
    height: 1px;
    left: 0;
}

.vertical {
    height: 100%;
    width: 1px;
    top: 0;
}
</style>
