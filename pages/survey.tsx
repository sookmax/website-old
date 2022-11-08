import { LayoutProps } from "@/components/layout";
import MDX from "@/mdx/survey.mdx";
import { useEffect } from "react";

export default function SurveyPage({ saveScrollPosition }: LayoutProps) {
  useEffect(() => {
    const unsubscribe = saveScrollPosition(SurveyPage.name);
    return () => unsubscribe?.();
  }, [saveScrollPosition]);

  return (
    <section className="prose px-4 py-10 dark:prose-invert">
      <MDX />
    </section>
  );
}
