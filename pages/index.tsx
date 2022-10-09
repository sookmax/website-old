import Divider from "@/components/Divider";
import Intro from "@/mdx/intro.mdx";
import Timeline from "@/components/Timeline";

export default function Home() {
  return (
    <div className="space-y-12">
      <section className="prose dark:prose-invert">
        <Intro />
      </section>
      <section className="space-y-4">
        <Divider>Brief history</Divider>
        <Timeline />
      </section>
    </div>
  );
}
