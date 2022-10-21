import NextImage from "next/image";

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
      />
      {caption && <figcaption className="text-center">{caption}</figcaption>}
    </figure>
  );
}
