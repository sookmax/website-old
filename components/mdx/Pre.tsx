import { classNames } from "@/utils/class-names";
import { GlobalState } from "@/utils/globalState";
import useClipboardCopy from "@/utils/useClipboardCopy";
import Highlight, {
  defaultProps,
  PrismTheme,
  Language,
} from "prism-react-renderer";

const codeThemeLight: PrismTheme = {
  plain: {
    color: "#0c4a6e",
    backgroundColor: "#f3f4f6",
  },
  styles: [
    {
      types: ["prolog"],
      style: {
        color: "rgb(0, 0, 128)",
      },
    },
    {
      types: ["comment"],
      style: {
        color: "rgb(106, 153, 85)",
      },
    },
    {
      types: ["builtin", "changed", "keyword", "interpolation-punctuation"],
      style: {
        color: "rgb(86, 156, 214)",
      },
    },
    {
      types: ["builtin"],
      style: {
        color: "rgb(67, 176, 154)",
      },
    },
    {
      types: ["number", "inserted"],
      style: {
        color: "rgb(181, 206, 168)",
      },
    },
    {
      types: ["constant"],
      style: {
        color: "rgb(100, 102, 149)",
      },
    },
    {
      types: ["attr-name", "variable"],
      style: {
        color: "rgb(156, 220, 254)",
      },
    },
    {
      types: ["deleted", "string", "attr-value", "template-punctuation"],
      style: {
        color: "rgb(206, 145, 120)",
      },
    },
    {
      types: ["selector"],
      style: {
        color: "#ca8a04",
      },
    },
    {
      // Fix tag color
      types: ["tag"],
      style: {
        color: "#059669",
      },
    },
    {
      // Fix tag color for HTML
      types: ["tag"],
      languages: ["markup"],
      style: {
        color: "rgb(86, 156, 214)",
      },
    },
    {
      types: ["punctuation", "operator"],
      style: {
        color: "#9ca3af",
      },
    },
    {
      // Fix punctuation color for HTML
      types: ["punctuation"],
      languages: ["markup"],
      style: {
        color: "#9ca3af",
      },
    },
    {
      types: ["function"],
      style: {
        color: "#f59e0b",
      },
    },
    {
      types: ["class-name"],
      style: {
        color: "rgb(67, 176, 154)",
      },
    },
    {
      types: ["char"],
      style: {
        color: "rgb(209, 105, 105)",
      },
    },
  ],
};

const codeThemeDark: PrismTheme = {
  plain: {
    color: "#9CDCFE",
    backgroundColor: "#1E1E1E",
  },
  styles: [
    {
      types: ["prolog"],
      style: {
        color: "rgb(0, 0, 128)",
      },
    },
    {
      types: ["comment"],
      style: {
        color: "rgb(106, 153, 85)",
      },
    },
    {
      types: ["builtin", "changed", "keyword", "interpolation-punctuation"],
      style: {
        color: "rgb(86, 156, 214)",
      },
    },
    {
      types: ["builtin"],
      style: {
        color: "rgb(78, 201, 176)",
      },
    },
    {
      types: ["number", "inserted"],
      style: {
        color: "rgb(181, 206, 168)",
      },
    },
    {
      types: ["constant"],
      style: {
        color: "rgb(100, 102, 149)",
      },
    },
    {
      types: ["attr-name", "variable"],
      style: {
        color: "rgb(156, 220, 254)",
      },
    },
    {
      types: ["deleted", "string", "attr-value", "template-punctuation"],
      style: {
        color: "rgb(206, 145, 120)",
      },
    },
    {
      types: ["selector"],
      style: {
        color: "rgb(215, 186, 125)",
      },
    },
    {
      // Fix tag color
      types: ["tag"],
      style: {
        color: "rgb(78, 201, 176)",
      },
    },
    {
      // Fix tag color for HTML
      types: ["tag"],
      languages: ["markup"],
      style: {
        color: "rgb(86, 156, 214)",
      },
    },
    {
      types: ["punctuation", "operator"],
      style: {
        color: "rgb(212, 212, 212)",
      },
    },
    {
      // Fix punctuation color for HTML
      types: ["punctuation"],
      languages: ["markup"],
      style: {
        color: "#808080",
      },
    },
    {
      types: ["function"],
      style: {
        color: "rgb(220, 220, 170)",
      },
    },
    {
      types: ["class-name"],
      style: {
        color: "rgb(78, 201, 176)",
      },
    },
    {
      types: ["char"],
      style: {
        color: "rgb(209, 105, 105)",
      },
    },
  ],
};

export default function Pre(theme: GlobalState["theme"]) {
  if (!theme)
    return function Pre(props: any) {
      return <pre>{props.children}</pre>;
    };

  return function Pre(props: any) {
    const title = props.title as string | undefined;
    const showLineNumbers = props.showLineNumbers as boolean | undefined;

    const languageRaw = props.children.props.className as string;
    const language = languageRaw.split("-")[1] as Language;

    const codeString = props.children.props.children as string;

    const [copyState, copyIcon, onCopyClick] = useClipboardCopy();

    const handleCopy = () => {
      onCopyClick(codeString);
    };

    return (
      <Highlight
        {...defaultProps}
        theme={theme === "light" ? codeThemeLight : codeThemeDark}
        code={codeString.trim()}
        language={language}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={classNames(
              "code-block-container flex flex-col p-0",
              copyState === "idle" && "[&:hover_button]:opacity-50",
              (copyState === "sucessful" || copyState === "failed") &&
                "[&:hover_button]:opacity-100"
            )}
            style={style}
          >
            {title && (
              <div className="code-title border-b-2 p-3 text-[color:var(--tw-prose-body)] dark:border-gray-600">
                {title}
              </div>
            )}
            <div className={classNames("relative overflow-hidden")}>
              <div
                className={classNames(className, "relative overflow-auto p-3")}
              >
                {tokens.map((line, i) => {
                  return (
                    <span
                      key={i}
                      {...getLineProps({ line, key: i })}
                      className="table-row"
                    >
                      {showLineNumbers && (
                        <span className="line-number table-cell select-none pr-4 text-right text-xs opacity-50">
                          {i + 1}
                        </span>
                      )}
                      <span className="table-cell">
                        {line.map((token, key) => (
                          <span key={i} {...getTokenProps({ token, key })} />
                        ))}
                      </span>
                    </span>
                  );
                })}
              </div>
              <div className="copy-button absolute top-0 right-0 flex">
                <button
                  className={classNames(
                    "transition-opacity duration-300 ease-in-out",
                    "h-10 w-10 p-2 text-gray-400 opacity-0",
                    "hover:!opacity-100 focus-visible:opacity-100",
                    copyState === "sucessful" &&
                      "text-emerald-600 dark:text-emerald-400",
                    copyState === "failed" && "text-rose-600 dark:text-rose-400"
                  )}
                  onClick={handleCopy}
                >
                  {copyIcon}
                </button>
              </div>
            </div>
          </pre>
        )}
      </Highlight>
    );
  };
}
