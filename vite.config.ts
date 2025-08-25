import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
      // 指定symbolId格式
      symbolId: 'icon-[dir]-[name]',
      // 是否压缩
      svgoOptions: {
        plugins: [
          {
            name: 'removeAttrs',
            params: { attrs: ['data-name', 'fill', 'stroke'] },
          },
        ],
      },
    }),
  ],
  server: {
    port: 3000, // 指定启动端口
    host: true, // 允许外部访问
    open: true, // 自动打开浏览器
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});
