import Link from "next/link";
import SocialLinks from "./SocialLinks";

export default function Header() {
  return (
    <header className="h-[var(--header-height)] pt-4 text-2xl font-extralight flex flex-shrink-0 justify-between items-center">
      <Link href={"/"}>
        <a>@Sook</a>
      </Link>
      <SocialLinks />
    </header>
  );
}
