import { ref } from 'vue'
import dagre from 'dagre'
import { useVueFlow } from '@vue-flow/core'

/**
 * useAutoLayout composable
 * 
 * Uses dagre to automatically layout nodes in a graph.
 */
export function useAutoLayout() {
    const { findNode, getNodes, getEdges } = useVueFlow()

    // Default options
    const defaults = {
        direction: 'LR', // Left-Right
        nodeWidth: 150, // Approximation or default
        nodeHeight: 50, // Approximation
        spacing: 50,
    }

    function layout(nodes, edges, options = {}) {
        const opts = { ...defaults, ...options }
        const { direction, spacing } = opts

        const g = new dagre.graphlib.Graph()

        g.setGraph({
            rankdir: direction,
            nodesep: spacing, // Horizontal spacing
            ranksep: spacing, // Vertical spacing
        })

        g.setDefaultEdgeLabel(() => ({}))

        // Add nodes
        // If nodes/edges are passed, use them. Otherwise get from VueFlow instance.
        const workNodes = nodes || getNodes.value
        const workEdges = edges || getEdges.value

        workNodes.forEach((node) => {
            // Use node dimensions if available, else defaults
            // Note: node.dimensions might strictly be available only after render?
            // Vue Flow nodes usually have dimensions property if rendered.
            // If hidden or not connected to resizing observer, use fallback.
            const width = node.dimensions?.width || node.style?.width || opts.nodeWidth
            const height = node.dimensions?.height || node.style?.height || opts.nodeHeight

            g.setNode(node.id, { width, height })
        })

        // Add edges
        workEdges.forEach((edge) => {
            g.setEdge(edge.source, edge.target)
        })

        // Run layout
        dagre.layout(g)

        // Apply computed positions back to nodes
        // Returning new nodes array with positions or mutating?
        // Usually mutation is fine for updateNode Internals or just returning new props.
        // We'll return an array of updates to be safe or applied.

        return workNodes.map((node) => {
            const nodeWithPosition = g.node(node.id)

            // Dagre returns center point, Vue Flow uses top-left.
            // So we need to subtract half width/height.
            return {
                id: node.id,
                position: {
                    x: nodeWithPosition.x - nodeWithPosition.width / 2,
                    y: nodeWithPosition.y - nodeWithPosition.height / 2,
                },
                // We might also want to persist dimensions if Dagre changed them? No.
            }
        })
    }

    return {
        layout
    }
}
