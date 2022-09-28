import Intro from "@/components/intro.mdx";
import Timeline from "@/components/Timeline";

export default function Home() {
  return (
    <div className="space-y-8">
      <section className="prose">
        <Intro />
      </section>
      <section className="space-y-4">
        <header>My Paths</header>
        <Timeline />
      </section>
    </div>
  );
}
