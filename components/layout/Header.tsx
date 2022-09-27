import Link from "next/link";
import SocialLinks from "./SocialLinks";

type Props = {
  onClick: () => void;
};

export default function Header({ onClick }: Props) {
  return (
    <header className="h-[var(--header-height)] pt-8 text-2xl font-extralight flex justify-between items-center">
      <Link href={"/"}>
        <a onClick={onClick}>@Sook</a>
      </Link>
      <SocialLinks />
    </header>
  );
}
