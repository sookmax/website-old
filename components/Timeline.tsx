import AcademicCapSVG from "./icons/AcademicCapSVG";
import BriefcaseSVG from "./icons/BriefcaseSVG";

const timeline = [
  {
    id: 1,
    startYear: 2011,
    endYear: 2015,
    icon: <AcademicCapSVG />,
    title: "College",
    description: "Statistics, B.S.",
    country: "🇺🇸",
  },
  {
    id: 2,
    startYear: 2015,
    endYear: 2016,
    icon: <BriefcaseSVG />,
    title: "Data Analyst",
    description: "R",
    country: "🇰🇷",
  },
  {
    id: 3,
    startYear: 2016,
    endYear: 2017,
    icon: <BriefcaseSVG />,
    title: "Data Analyst",
    description: "R, Python",
    country: "🇰🇷",
  },
  {
    id: 4,
    startYear: 2017,
    endYear: 2020,
    icon: <BriefcaseSVG />,
    title: "Data Analyst / SWE",
    description: "R, Python, React.js",
    country: "🇰🇷",
  },
  {
    id: 5,
    startYear: 2020,
    endYear: 2021,
    icon: <BriefcaseSVG />,
    title: "Frontend Dev",
    description: "React.js, node.js",
    country: "🇰🇷",
  },
  {
    id: 6,
    startYear: 2021,
    endYear: 2022,
    icon: <BriefcaseSVG />,
    title: "Frontend Dev",
    description: "three.js, vue.js",
    country: "🇰🇷",
  },
];

timeline.reverse();

export default function Timeline() {
  return (
    <ul className="space-y-3">
      {timeline.map((item) => (
        <li key={item.id}>
          <div className="relative">
            {item.id !== 1 ? (
              <span className="absolute top-4 left-4 h-full w-0.5 bg-gray-300" />
            ) : null}
            <div className="relative flex w-full items-center space-x-4">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-gray-500 ring-2 ring-white">
                {item.icon}
              </span>
              <span className="flex flex-col">
                <span className="text-sm font-extralight">{item.title}</span>
                <span className="text-xs text-gray-400">
                  {item.description}
                </span>
              </span>
              <span className="flex-grow text-end text-xs font-extralight text-gray-500">
                {item.startYear}-{item.endYear} {item.country}
              </span>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
