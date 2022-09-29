import Intro from "@/components/intro.mdx";
import Timeline from "@/components/Timeline";

export default function Home() {
  return (
    <div className="space-y-12">
      <section className="prose">
        <Intro />
      </section>
      <section className="space-y-4">
        <header className="text-sm font-light text-gray-600">Timeline</header>
        <Timeline />
      </section>
    </div>
  );
}
