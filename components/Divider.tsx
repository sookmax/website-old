type Props = {
  children?: string;
};

export default function Divider({ children }: Props) {
  return (
    <div className="relative">
      <div className="absolute inset-0 flex items-center" aria-hidden="true">
        <div className="w-full border-t border-gray-300" />
      </div>
      {children && (
        <div className="relative flex justify-start">
          <span className="bg-white pr-2 text-sm text-gray-500 dark:bg-slate-800 dark:text-gray-200">
            {children}
          </span>
        </div>
      )}
    </div>
  );
}
