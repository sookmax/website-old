import { AcademicCapIcon, BriefcaseIcon } from "@heroicons/react/24/outline";

const timeline = [
  {
    id: 1,
    startYear: 2011,
    endYear: 2015,
    icon: <AcademicCapIcon />,
    title: "College",
    description: "Statistics, B.S.",
    country: "🇺🇸",
  },
  {
    id: 2,
    startYear: 2015,
    endYear: 2019,
    icon: <BriefcaseIcon />,
    title: "Data Analyst",
    description: "R, Python",
    country: "🇰🇷",
  },
  {
    id: 3,
    startYear: 2019,
    endYear: "current",
    icon: <BriefcaseIcon />,
    title: "Frontend Dev",
    description: "React, Vue, three",
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
              <span className="absolute top-4 left-3 h-full w-0.5 bg-gray-300 dark:bg-gray-600" />
            ) : null}
            <div className="relative flex w-full items-center space-x-4">
              <span className="h-6 w-6 rounded-full bg-white text-gray-400 ring-4 ring-white dark:bg-gray-600 dark:text-gray-300 dark:ring-gray-600">
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
