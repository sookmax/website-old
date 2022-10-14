import { Canvas } from "@react-three/fiber";
import Divider from "@/components/Divider";
import Intro from "@/mdx/intro.mdx";
import Stars from "@/components/3d/Stars";

export default function Home() {
  return (
    <div className="relative space-y-12">
      <section className="h-96">
        <Canvas camera={{ position: [0, 0, 1] }}>
          <Stars />
        </Canvas>
      </section>
      <section className="prose absolute top-0 text-8xl font-bold dark:prose-invert">
        <Intro />
      </section>
      <section className="space-y-4">
        <Divider>Recent Posts</Divider>
      </section>
    </div>
  );
}
