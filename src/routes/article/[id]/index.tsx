/*
 * @Author: yulinZ 1973329248@qq.com
 * @Date: 2023-06-19 19:47:36
 * @LastEditors: yulinZ 1973329248@qq.com
 * @LastEditTime: 2023-06-20 01:34:50
 * @FilePath: \qwik-app\src\routes\test\index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { component$, useVisibleTask$, useStore, useStylesScoped$,useResource$,
  Resource,
  useSignal,
 } from '@builder.io/qwik';
import { type DocumentHead, useLocation, routeLoader$ } from '@builder.io/qwik-city';
import { getData } from '../../../api';
// import styles from './flower.css?inline';



const useData = routeLoader$(async () => {
  const response:any = await getData()

  return (await response.json()) as {
    data:[];
    code: string;
    total: number;
  };
});

export default component$(() => {

  const dataList :any  = useData()

  const state = useStore({
    data:[1,2,3,4,5],
    count: 0,
    number: 20,
  });

  // handleShortener(state)
  useVisibleTask$(async ({ cleanup }) => {

    const timeout = setTimeout(() => (state.count = 1), 500);
    cleanup(() => clearTimeout(timeout));

    const internal = setInterval(() => state.count++, 7000);
    cleanup(() => clearInterval(internal));
  });

  return (
    <div>
      {dataList.value.total}
      {
        dataList.value.data.map((item:any)=>{
          return <div key={item?.id}>{item?.title}</div>
        })
      }
   </div>
  );
});

export const head: DocumentHead = {
  title: 'Qwik Flower',
};
