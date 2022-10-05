import Link from "next/link";
import SocialLinks from "./SocialLinks";

export default function Header() {
  return (
    <header className="flex h-[var(--header-height)] flex-shrink-0 items-center justify-between pt-4 text-2xl font-extralight">
      <Link href={"/"}>
        <a>SOOK.DEV</a>
      </Link>
      <SocialLinks />
    </header>
  );
}
