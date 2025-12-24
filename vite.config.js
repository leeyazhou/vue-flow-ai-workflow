import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.js'),
      name: 'VueFlowAiWorkflow',
      fileName: (format) => `vue-flow-ai-workflow.${format}.js`
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: [
        'vue',
        'element-plus',
        '@vue-flow/core',
        '@vue-flow/background',
        '@vue-flow/controls',
        '@vue-flow/minimap',
        '@element-plus/icons-vue'
      ],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue',
          'element-plus': 'ElementPlus',
          '@vue-flow/core': 'VueFlow',
          '@vue-flow/background': 'VueFlowBackground',
          '@vue-flow/controls': 'VueFlowControls',
          '@vue-flow/minimap': 'VueFlowMinimap',
          '@element-plus/icons-vue': 'ElementPlusIconsVue'
        }
      }
    }
  }
})
