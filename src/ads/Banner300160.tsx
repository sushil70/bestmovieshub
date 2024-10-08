"use client";

import { useEffect, useRef } from "react";

export default function AdBanner({ id, height, width }: any) {
  const banner = useRef<HTMLDivElement>(null);

  const atOptions = {
    key: id,
    format: "iframe",
    height: height,
    width: width,
    params: {},
  };
  useEffect(() => {
    if (banner.current && !banner.current.firstChild) {
      const conf = window.document.createElement("script");
      const script = window.document.createElement("script");
      script.type = "text/javascript";
      script.src = `//www.topcreativeformat.com/${id}/invoke.js`;
      conf.innerHTML = `atOptions = ${JSON.stringify(atOptions)}`;

      banner.current.append(conf);
      banner.current.append(script);
    }
  }, [banner]);

  return (
    <>
      <div ref={banner}></div>
    </>
  );
}
