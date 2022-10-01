import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  caption?: string;
  creditURL?: string;
};

export default function ResponsiveImage({
  src,
  alt,
  caption,
  creditURL,
}: Props) {
  return (
    <figure>
      <Image src={src} alt={alt} layout="responsive" width={300} height={300} />
      {caption ? (
        <figcaption className="flex w-full items-center justify-center text-xs text-gray-500 sm:text-sm">
          <span>
            {caption}{" "}
            {creditURL ? (
              <a
                href={creditURL}
                target={"_blank"}
                rel="noreferrer"
                className="text-xs"
              >
                (source)
              </a>
            ) : null}
          </span>
        </figcaption>
      ) : null}
    </figure>
  );
}
