import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// Fix: __dirname is not available in ES modules. Use fileURLToPath and import.meta.url to define it.
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig(({ mode }) => {
    // Fix: Use '.' instead of process.cwd() to avoid the "Property 'cwd' does not exist on type 'Process'" error.
    // loadEnv will search for .env files in the current working directory when passed '.'.
    const env = loadEnv(mode, '.', ''); 
    return {
      // 1. 部署基础路径（腾讯云可能非根域名部署，必加）
      base: './', // 改为相对路径，适配所有部署环境
      
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      
      // 2. 构建输出优化（腾讯云构建可能缺失此配置）
      build: {
        outDir: 'dist', // 明确输出目录（腾讯云默认识别 dist）
        assetsDir: 'assets', // 静态资源目录
        rollupOptions: {
          output: {
            // 防止静态资源路径拼接错误
            assetFileNames: 'assets/[name].[hash].[ext]',
            chunkFileNames: 'assets/[name].[hash].js',
            entryFileNames: 'assets/[name].[hash].js',
          },
        },
      },
      
      plugins: [react()],
      
      // 3. 修复重复的环境变量定义 + 兼容注入规则
      define: {
        // 只保留一个，避免覆盖；加 JSON 兜底防止 undefined
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY || ''),
        // 兼容旧代码的 API_KEY 引用（如果代码里有用到）
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY || ''),
        // 修复 vite 下 process 未定义的兼容问题
        'process.env': JSON.stringify(process.env),
      },
      
      resolve: {
        alias: {
          // Fix: Use the manually defined __dirname to resolve project root correctly in ESM.
          '@': path.resolve(__dirname, '.'), // 指向项目根目录
        }
      }
    };
});

