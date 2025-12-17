# AI Workflow

AI Workflow 是一个基于 Vue 3 和 Vue Flow 的可视化工作流编辑器。它允许用户通过直观的节点拖拽和连接，构建复杂的 AI 驱动的工作流。

## ✨ 主要特性

*   **可视化编辑器**: 借助 Vue Flow 提供流畅的节点拖拽、缩放和连接体验。
*   **AI 节点集成**:
    *   **LlmNode**: 集成大型语言模型，支持复杂的文本处理任务。
    *   **KnowledgeNode**: 连接知识库，增强 AI 的上下文理解能力。
*   **逻辑控制**:
    *   **ConditionNode**: 支持条件分支，实现灵活的业务逻辑流转。
*   **交互式组件**:
    *   **属性面板**: 双击节点即可编辑详细属性。
    *   **右键菜单**: 提供便捷的节点操作（删除、复制等）。
    *   **辅助线**: 帮助用户快速对齐节点，保持画布整洁。
    *   **工具栏**: 提供缩放、全屏等常用画布操作。

## 🛠️ 技术栈

*   [Vue 3](https://vuejs.org/) - 渐进式 JavaScript 框架
*   [Vite](https://vitejs.dev/) - 下一代前端构建工具
*   [Vue Flow](https://vueflow.dev/) - 高度可定制的 Vue 3 流程图库
*   [Element Plus](https://element-plus.org/) - 基于 Vue 3 的组件库
*   [Sass](https://sass-lang.com/) - CSS 预处理器

## 🚀 快速开始

### 前置要求

请确保您的环境中已安装 [Node.js](https://nodejs.org/) (推荐 LTS 版本)。

### 安装依赖

```bash
npm install
# 或者
yarn install
```

### 启动开发服务器

```bash
npm run dev
```

启动后，访问 `http://localhost:5173` (或终端显示的端口) 即可查看应用。

## 📂 项目结构

```
src/
├── assets/          # 静态资源
├── components/      # Vue 组件
│   └── workflow/    # 工作流相关组件
│       ├── nodes/   # 自定义节点 (LlmNode, StartNode 等)
│       ├── edges/   # 自定义连线
│       ├── panels/  # 属性面板
│       └── ...      # 其他工作流组件 (Toolbar, Menu 等)
├── mocks/           # 模拟数据
├── utils/           # 工具函数
├── App.vue          # 根组件
└── main.js          # 入口文件
```

## 🤝 贡献

欢迎提交 Issue 或 Pull Request 来改进本项目！
