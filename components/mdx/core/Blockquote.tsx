export default function Blockquote(props: any) {
  const children = props.children.filter(
    (child: any) => typeof child !== "string"
  ) as React.ReactElement[];

  return (
    <blockquote>
      {children.map((child, idx) => {
        if (idx > 0 && idx === children.length - 1) {
          // to prevent `tailwindcss` from adding a close quote at the end.
          return <div key={idx} {...child.props} />;
        }
        return child;
      })}
    </blockquote>
  );
}
