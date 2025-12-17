# 贡献指南 (Contributing to AI Workflow)

感谢您对 **AI Workflow** 项目感兴趣！我们欢迎每一位贡献者的加入，无论是提交 Bug、改进文档，还是贡献代码。

## 📜 行为准则

在参与本项目之前，请阅读并遵守我们的 [行为准则](CODE_OF_CONDUCT.md)。

## 🐛 提交 Issue

如果您发现了 Bug 或有新功能建议，请在 GitHub Issues 中提交。

1.  **搜索现有 Issue**：查看是否已经有人提出过类似的问题。
2.  **使用模板**：请尽可能详细地描述问题，包括复现步骤、预期行为和截图。

## 🛠️ 开发环境搭建

请参考 [README.md](README.md) 中的 "快速开始" 章节来配置您的本地开发环境。

## 💻 提交 Pull Request (PR)

1.  **Fork 本仓库**：点击右上角的 Fork 按钮。
2.  **创建分支**：
    ```bash
    git checkout -b feature/your-feature-name
    # 或
    git checkout -b fix/your-bug-fix
    ```
3.  **提交更改**：请遵循我们的代码风格。
    *   使用 Vue 3 Composition API (`<script setup>`)。
    *   确保代码格式化（Prettier）。
4.  **提交代码**：
    ```bash
    git commit -m "feat: 添加了 xxx 功能"
    ```
    *   我们推荐使用 [Conventional Commits](https://www.conventionalcommits.org/zh-hans/) 规范。
5.  **推送到您的 Fork**：
    ```bash
    git push origin feature/your-feature-name
    ```
6.  **创建 Pull Request**：在 GitHub 上发起 PR，并描述您的更改内容。

## 🎨 代码风格

*   **Vue**: 使用 Vue 3 `<script setup>` 语法。
*   **CSS**: 使用 Sass，类名推荐使用 BEM 命名法或清晰的语义化命名。
*   **格式化**: 项目配置了 `.prettierrc`，请确保提交前运行了格式化工具。

---

再次感谢您的贡献！🎉
