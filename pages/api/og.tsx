/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const config = {
  runtime: "experimental-edge",
};

export default async function handler(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const hasTitle = searchParams.has("title");
    const title = hasTitle
      ? searchParams.get("title")?.slice(0, 100)
      : "Hi 👋, I'm Sook.";

    return new ImageResponse(
      (
        <div
          style={{
            backgroundColor: "black",
            backgroundSize: "150px 150px",
            height: "100%",
            width: "100%",
            display: "flex",
            textAlign: "center",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            flexWrap: "nowrap",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              justifyItems: "center",
            }}
          >
            <div
              style={{
                fontSize: 60,
                fontStyle: "normal",
                backgroundClip: "text",
                backgroundImage:
                  "linear-gradient(to right, #facc15, #10b981, #2dd4bf)",
                color: "transparent",
                padding: "0 120px",
                whiteSpace: "pre-wrap",
              }}
            >
              {title}
            </div>
          </div>
          <img
            alt="github-avatar"
            height={90}
            width={90}
            src={`https://github.com/${process.env.NEXT_PUBLIC_GITHUB_USERNAME}.png`}
            style={{
              position: "absolute",
              top: "0",
              right: "0",
              margin: "20px",
              borderRadius: "9999px",
              borderWidth: "2px",
              borderColor: "#374151",
            }}
          />
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response("Failed to generate the image", { status: 500 });
  }
}
