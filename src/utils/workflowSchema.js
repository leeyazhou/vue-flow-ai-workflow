/**
 * 节点输出变量模式定义
 * 定义每种节点类型输出的变量,用于在其他节点中引用
 */

/**
 * 获取指定节点类型的输出变量
 * @param {string} nodeType - 节点类型
 * @param {object} nodeData - 节点数据
 * @returns {Array} 变量列表
 */
export const getNodeOutputVariables = (nodeType, nodeData = {}) => {
    const handler = nodeOutputVariables[nodeType]
    if (!handler) return []
    return handler(nodeData)
}

/**
 * 节点输出变量定义
 */
export const nodeOutputVariables = {
    /**
     * Start 节点输出变量
     * 包含内置系统变量和用户自定义参数
     */
    Start: (nodeData) => {
        const variables = []

        // 内置系统变量
        variables.push(
            { name: 'sys.workflow_id', type: 'string', description: '工作流ID' },
            { name: 'sys.execution_id', type: 'string', description: '执行实例ID' },
            { name: 'sys.timestamp', type: 'number', description: '执行开始时间戳' },
            { name: 'sys.user_id', type: 'string', description: '触发用户ID' }
        )

        // 用户自定义参数
        if (nodeData.inputParams && Array.isArray(nodeData.inputParams)) {
            nodeData.inputParams.forEach((param) => {
                if (param.name) {
                    variables.push({
                        name: param.name,
                        type: param.type || 'string',
                        description: `自定义参数: ${param.name}`
                    })
                }
            })
        }

        // 用户自定义参数
        if (nodeData.outputParams && Array.isArray(nodeData.outputParams)) {
            nodeData.outputParams.forEach((param) => {
                if (param.name) {
                    variables.push({
                        name: param.name,
                        type: param.type || 'string',
                        description: `自定义参数: ${param.name}`
                    })
                }
            })
        }

        return variables
    },

    /**
     * LLM 节点输出变量
     * 包含默认输出变量和用户自定义的输出参数
     */
    LLM: (nodeData) => {
        const variables = []

        // 默认输出变量
        variables.push(
            { name: 'response', type: 'string', description: 'LLM 响应内容' },
            { name: 'tokens', type: 'number', description: '消耗的 token 数量' },
            { name: 'model', type: 'string', description: '使用的模型名称' },
            { name: 'finish_reason', type: 'string', description: '完成原因' }
        )

        // 用户自定义输出参数
        if (nodeData.outputParams && Array.isArray(nodeData.outputParams)) {
            nodeData.outputParams.forEach((param) => {
                if (param.name) {
                    variables.push({
                        name: param.name,
                        type: param.type || 'string',
                        description: `自定义输出: ${param.name}`
                    })
                }
            })
        }

        return variables
    },

    /**
     * Knowledge 节点输出变量
     */
    Knowledge: (nodeData) => [
        { name: 'documents', type: 'object', description: '检索到的文档列表' },
        { name: 'similarity', type: 'number', description: '最高相似度分数' },
        { name: 'count', type: 'number', description: '检索到的文档数量' },
        { name: 'query', type: 'string', description: '检索查询文本' }
    ],

    /**
     * Condition 节点输出变量
     */
    Condition: (nodeData) => [
        { name: 'result', type: 'boolean', description: '条件判断结果 (true/false)' },
        { name: 'matched_value', type: 'string', description: '匹配的值' }
    ],

    /**
     * End 节点没有输出变量
     */
    End: (nodeData) => []
}

/**
 * 递归获取所有前置节点列表(包括前置节点的前置节点)
 * @param {string} nodeId - 当前节点ID
 * @param {Array} edges - 所有边
 * @param {Set} visited - 已访问节点集合(避免循环)
 * @returns {Array} 所有前置节点ID列表
 */
export const getPredecessorNodes = (nodeId, edges, visited = new Set()) => {
    // 防止循环依赖
    if (visited.has(nodeId)) {
        return []
    }
    visited.add(nodeId)

    // 获取直接前置节点
    const directPredecessors = edges
        .filter((edge) => edge.target === nodeId)
        .map((edge) => edge.source)

    // 递归获取所有祖先节点
    const allPredecessors = [...directPredecessors]
    directPredecessors.forEach((predId) => {
        const ancestorPredecessors = getPredecessorNodes(predId, edges, visited)
        ancestorPredecessors.forEach((ancestorId) => {
            if (!allPredecessors.includes(ancestorId)) {
                allPredecessors.push(ancestorId)
            }
        })
    })

    return allPredecessors
}

/**
 * 收集前置节点的所有输出变量,按节点分组
 * @param {string} currentNodeId - 当前节点ID
 * @param {Array} nodes - 所有节点
 * @param {Array} edges - 所有边
 * @returns {Array} 分组的变量列表 [{nodeId, nodeLabel, variables: [...]}]
 */
export const collectPredecessorVariables = (currentNodeId, nodes, edges) => {
    console.log('currentNodeId', currentNodeId)
    const predecessorIds = getPredecessorNodes(currentNodeId, edges)
    console.log('predecessorIds: ', predecessorIds)
    const groupedVariables = []

    predecessorIds.forEach((predId) => {
        console.log('predecessorIds', predId)
        const node = nodes.find((n) => n.id === predId)
        if (!node) return
        if (node.type === 'Condition') return

        const variables = getNodeOutputVariables(node.type, node.data)
        if (variables.length > 0) {
            groupedVariables.push({
                nodeId: node.id,
                nodeLabel: node.label || node.data?.label || node.id,
                nodeType: node.type,
                variables: variables
            })
        }
    })

    return groupedVariables
}
