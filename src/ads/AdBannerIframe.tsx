"use client";

import { useEffect, useRef } from "react";

interface AdBannerIframeProps {
  id: string;
  height: number;
  width: number;
}

export default function AdBannerIframe({
  id,
  height,
  width,
}: AdBannerIframeProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const iframeDocument =
      iframe.contentDocument || iframe.contentWindow?.document;
    if (!iframeDocument) return;

    // Clear any existing content
    iframeDocument.open();
    iframeDocument.write(`
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
        </head>
        <body>
          <div id="ad-banner"></div>
        </body>
      </html>
    `);
    iframeDocument.close();

    // Create and append the script elements
    const script1 = iframeDocument.createElement("script");
    script1.textContent = `
       atOptions = {
        key: "${id}",
        format: "iframe",
        height: ${height},
        width: ${width},
        params: {}
      };
    `;
    const script2 = iframeDocument.createElement("script");
    script2.src = `//www.topcreativeformat.com/${id}/invoke.js`;

    iframeDocument.body.appendChild(script1);
    iframeDocument.body.appendChild(script2);
  }, [id, height, width]);

  return (
    <iframe
      ref={iframeRef}
      style={{
        border: "none",
        width: `${width + 8}px`,
        height: `${height + 16}px`,
      }}
      sandbox="allow-scripts allow-same-origin allow-popups"
      title="Ad Banner"
    />
  );
}
