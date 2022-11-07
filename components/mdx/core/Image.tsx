import NextImage from "next/image";

// https://github.com/vercel/next.js/blob/canary/examples/image-component/pages/color.tsx
// added this placeholder generator in hopes of fixing the image height.. but
// doesn't seem to work well.
// I wanted to have a determined image height when mounted so I could calculate reading progress without
// worrying about the height of the overflowing element being changed.
//
// TODO: revisit this issue later

// Pixel GIF code adapted from https://stackoverflow.com/a/33919020/266535
const keyStr =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

const triplet = (e1: number, e2: number, e3: number) =>
  keyStr.charAt(e1 >> 2) +
  keyStr.charAt(((e1 & 3) << 4) | (e2 >> 4)) +
  keyStr.charAt(((e2 & 15) << 2) | (e3 >> 6)) +
  keyStr.charAt(e3 & 63);

const rgbDataURL = (r: number, g: number, b: number) =>
  `data:image/gif;base64,R0lGODlhAQABAPAA${
    triplet(0, r, g) + triplet(b, 255, 255)
  }/yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==`;

type Props = {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
};

export default function Image({ src, alt, width, height, caption }: Props) {
  return (
    <figure>
      <NextImage
        src={src}
        alt={alt}
        width={width}
        height={height}
        style={{ maxWidth: "100%", height: "auto" }}
        placeholder="blur"
        blurDataURL={rgbDataURL(0, 0, 0)}
      />
      {caption && <figcaption className="text-center">{caption}</figcaption>}
    </figure>
  );
}
