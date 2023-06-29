/*
 * @Description:
 * @version: 0.0.1
 * @Author: yulinZ
 * @LastEditTime: 2023-06-29 15:27:32
 */
import { qwikCity } from '@builder.io/qwik-city/vite';
import { qwikReact } from '@builder.io/qwik-react/vite';
import { qwikVite } from '@builder.io/qwik/optimizer';
import { fileURLToPath } from 'node:url';
import { defineConfig, loadEnv } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [qwikCity(), qwikVite(), tsconfigPaths(), qwikReact()],
    define: {
      'process.env.API_DOMAIN': JSON.stringify(env.API_DOMAIN),
      'process.env.DOMAIN': JSON.stringify(env.DOMAIN),
      'process.env.NODE_ENV': JSON.stringify(mode),
    },
    server: {
      proxy: {
        '/blogApi': {
          target: 'https://blogyl.xyz/', //实际请求地址
          changeOrigin: true,
          // rewrite: (path) => path.replace(/^\/api/, '')
        },
      },
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    optimizeDeps: {
      include: ['canvas-confetti'],
    },
  };
});
