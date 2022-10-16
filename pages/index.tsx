// import { Canvas } from "@react-three/fiber";
// import Divider from "@/components/Divider";
// import Intro from "@/mdx/intro.mdx";
// import Stars from "@/components/3d/Stars";

export default function Home() {
  return (
    <div className="relative">
      {/* <section className="h-96">
        <Canvas camera={{ position: [0, 0, 1] }}>
          <Stars />
        </Canvas>
      </section> */}
      <section>
        <div className="mt-12 text-7xl font-bold text-gray-700 dark:text-gray-300">
          Hi,
          <br />
          I Am <br />
          Sook.
        </div>
        <div className="mt-4 text-gray-500 dark:text-gray-400">
          A web developer.
        </div>
      </section>
      {/* <section className="space-y-4">
        <Divider>Recent Posts</Divider>
      </section> */}
    </div>
  );
}
