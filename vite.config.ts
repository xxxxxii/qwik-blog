/*
 * @Author: yulinZ 1973329248@qq.com
 * @Date: 2023-06-19 19:15:56
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-06-20 09:53:42
 * @FilePath: \qwik-app\vite.config.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { defineConfig } from 'vite';
import { qwikVite } from '@builder.io/qwik/optimizer';
import { qwikCity } from '@builder.io/qwik-city/vite';
import tsconfigPaths from 'vite-tsconfig-paths';


import { fileURLToPath, URL } from "node:url";

export default defineConfig(() => {
 
  return {
    base:'/blogs/',
    plugins: [qwikCity(), qwikVite(), tsconfigPaths()],
    preview: {
      headers: {
        'Cache-Control': 'public, max-age=600',
      },
    },

    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
  };
});
