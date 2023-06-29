/*
 * @Description:
 * @version: 0.0.1
 * @Author: yulinZ
 * @LastEditTime: 2023-06-29 17:19:17
 */
import { component$ } from '@builder.io/qwik';
import { useServerTimeLoader } from '~/routes/layout';
import styles from './footer.module.css';

export default component$(() => {
  const serverTime = useServerTimeLoader();

  return (
    <footer>
      <div class="container">
        <a href="https://blogyl.xyz" target="_blank" class={styles.anchor}>
          <span>Made with ♡ by yulinZ Blog`s </span>
          <span class={styles.spacer}>|</span>
          <span>{serverTime.value.date}</span>
        </a>
      </div>
    </footer>
  );
});
