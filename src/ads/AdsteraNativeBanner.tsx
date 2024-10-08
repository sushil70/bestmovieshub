"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    atOptions?: Record<string, any>;
  }
}

interface AdsteraNativeBannerProps {
  atOptions: {
    key: string;
    format: string;
    [key: string]: any;
  };
}

export default function AdsteraNativeBanner({
  atOptions,
}: AdsteraNativeBannerProps) {
  const scriptRef = useRef<HTMLScriptElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const loadAdsterraScript = () => {
      if (scriptRef.current) return; // Script already loaded

      const script = document.createElement("script");
      script.src = `//pl24631489.cpmrevenuegate.com/${atOptions.key}/invoke.js`;
      script.async = true;
      scriptRef.current = script;

      // Set atOptions before appending the script
      window.atOptions = atOptions;

      // Append the script to the container instead of body
      if (containerRef.current) {
        containerRef.current.appendChild(script);
      }
    };

    const reinitializeAd = () => {
      // Remove existing ad content
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }

      // Reload the script
      loadAdsterraScript();
    };

    loadAdsterraScript();

    // Add event listener for page visibility changes
    document.addEventListener("visibilitychange", reinitializeAd);

    return () => {
      // Cleanup function
      document.removeEventListener("visibilitychange", reinitializeAd);

      if (scriptRef.current && scriptRef.current.parentNode) {
        scriptRef.current.parentNode.removeChild(scriptRef.current);
      }

      if (typeof window !== "undefined") {
        delete window.atOptions;
      }

      scriptRef.current = null;
    };
  }, [atOptions]);

  return <div ref={containerRef} id={`container-${atOptions.key}`}></div>;
}
