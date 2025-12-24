export const workflow = {
    dark: false,
    nodes: [{
        id: 'start',
        type: 'Start',
        position: { x: 100, y: 100 },
        label: 'Start',
        data: { label: 'Start', description: 'Entry point' },
    },
    {
        id: 'llm-1',
        type: 'LLM',
        position: { x: 800, y: 100 }, // Shifted right and up slightly for branch visualization
        label: 'LLM Node',
        data: { label: 'LLM Analysis', description: 'Analyzes the input text.' },
    },
    {
        id: 'end',
        type: 'End',
        position: { x: 1100, y: 300 }, // Shifted further right

        label: 'End',
        data: { label: 'End', description: 'Workflow completion.' },
    },
    {
        id: 'condition-1',
        type: 'Condition',
        position: { x: 400, y: 100 },
        label: 'Check Input',
        data: { label: 'Check Input', description: 'Validate input text', variable: 'input', operator: 'contains', value: 'hello' },
    }],

    edges: [
        {
            id: 'e-start-condition',
            source: 'start',
            target: 'condition-1',
            animated: true,
            type: 'default',
            style: { stroke: 'green' },
            markerEnd: 'arrowclosed',
        },
        {
            id: 'e-condition-yes',
            source: 'condition-1',
            sourceHandle: 'true',
            target: 'llm-1', // Yes -> LLM
            animated: true,
            markerEnd: 'arrowclosed',
            label: 'Yes'
        },
        {
            id: 'e-condition-no',
            source: 'condition-1',
            sourceHandle: 'false',
            target: 'end', // No -> End (short circuit)
            animated: true,
            type: 'default',
            labelBgStyle: { fill: 'orange' },
            style: { stroke: 'red' },
            markerEnd: 'arrowclosed',
            label: 'No'
        },
        {
            id: 'e-llm-end', // LLM -> End (existing path completion)
            type: 'step',
            source: 'llm-1',
            target: 'end',
            animated: true,
            markerEnd: 'arrowclosed',
        }]
}

export const workflowConfig = {
    modelList: [
        {
            id: 1,
            modelName: 'GPT-4o'
        },
        {
            id: 2,
            modelName: 'GPT-4 Turbo'
        },
        {
            id: 2,
            modelName: 'GPT-3.5 Turbo'
        },
        {
            id: 2,
            modelName: 'Claude 3.5 Sonnet'
        }
    ],
    knowledgeList: [
        {
            id: 1,
            name: '知识库1'
        },
        {
            id: 2,
            name: '知识库2'
        },
        {
            id: 3,
            name: '知识库3'
        }
    ]
}