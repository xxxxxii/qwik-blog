/*
 * @Description:
 * @version: 0.0.1
 * @Author: yulinZ
 * @LastEditTime: 2023-06-25 11:54:43
 */
import { $, component$, useStyles$ } from "@builder.io/qwik";
import {
  Image,
  type ImageTransformerProps,
  useImageProvider,
} from "qwik-image";
import styles from "./index.css?inline";

interface propsDto {
  src?: string;
  width?: string;
  height?: string;
}

export default component$((props: propsDto) => {
  useStyles$(styles);
  const imageTransformer$ = $(
    ({ src, width, height }: ImageTransformerProps): string => {
      // Here you can set your favorite image loaders service
      return `${src}?height=${height}&width=${width}&format=webp&fit=fill`;
    }
  );

  // Global Provider (required)
  useImageProvider({
    // You can set this prop to overwrite default values [3840, 1920, 1280, 960, 640]
    resolutions: [640],
    imageTransformer$,
  });
  return (
    <Image
      class="img"
      layout="fixed"
      objectFit="cover"
      width="180"
      height="100"
      loading="lazy"
      alt="Tropical paradise"
      placeholder="#e6e6e6"
      src={props.src}
    />
  );
});
