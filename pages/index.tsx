export default function Home() {
  return (
    <div className="relative flex-grow">
      <canvas id="canvas"></canvas>
      <section
        id="main-text"
        className="absolute top-1/2 left-0 -translate-y-1/2 p-3"
      >
        <div className="font-['Oswald'] text-7xl font-extrabold text-gray-700 dark:text-teal-50 sm:text-8xl">
          Hi,
          <br />
          I Am <br />
          Sook.
        </div>
        <div className="mt-2 px-2 text-end font-['Raleway'] text-sm text-gray-400 sm:text-base">
          - A web developer
        </div>
      </section>
    </div>
  );
}
