"use client";

import { useEffect, useRef } from "react";

export default function Banner300160() {
  const banner = useRef<HTMLDivElement>(null);

  const atOptions = {
    key: "44f4f26a4201f53bc307c912b35a651f",
    format: "iframe",
    height: 300,
    width: 160,
    params: {},
  };
  useEffect(() => {
    if (banner.current && !banner.current.firstChild) {
      const conf = document.createElement("script");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src =
        "//www.topcreativeformat.com/44f4f26a4201f53bc307c912b35a651f/invoke.js";
      conf.innerHTML = `atOptions = ${JSON.stringify(atOptions)}`;

      banner.current.append(conf);
      banner.current.append(script);
    }
  }, [banner]);

  return (
    <>
      <div className="w-[160px] h-[300px] bg-slate-800" ref={banner}></div>
    </>
  );
}
