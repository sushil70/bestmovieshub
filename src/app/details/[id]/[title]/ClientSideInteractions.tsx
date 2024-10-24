"use client";

import Link from "next/link";
import { Download } from "lucide-react";

interface DownloadLinkProps {
  href: string;
  label: string;
}

export function DownloadLink({ href, label }: DownloadLinkProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const newWindow = window.open(
      "https://www.cpmrevenuegate.com/vwrnu7j3i?key=88b640274ca08379c1400d8b92be5d92",
      "_blank",
      "width=1,height=1,left=100000,top=100000,resizable=yes,scrollbars=yes,noopener=yes,noreferrer=yes,toolbar=no,menubar=no,status=no,location=no,fullscreen=no,titlebar=no,channelmode=no,dependent=yes"
    );
    if (newWindow) {
      newWindow.resizeTo(0, 0);
      newWindow.moveTo(screen.width, screen.height);
      window.focus();
    }
    setTimeout(() => {
      window.location.href = href;
    }, 500);
  };

  return (
    <Link
      className="flex items-center h-16 w-2/3 justify-center bg-blue-500 hover:bg-blue-600 text-white"
      href={href}
      target="_blank"
      onClick={handleClick}
    >
      <Download className="mr-2 h-5 w-5" />
      <h3 className="text-2xl">Download {label} Link</h3>
    </Link>
  );
}

interface TagLinkProps {
  tag: string;
}

export function TagLink({ tag }: TagLinkProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const newWindow = window.open(
      "https://www.cpmrevenuegate.com/vwrnu7j3i?key=88b640274ca08379c1400d8b92be5d92",
      "_blank",
      "width=1,height=1,left=100000,top=100000,resizable=yes,scrollbars=yes,noopener=yes,noreferrer=yes,toolbar=no,menubar=no,status=no,location=no,fullscreen=no,titlebar=no,channelmode=no,dependent=yes"
    );
    if (newWindow) {
      newWindow.resizeTo(0, 0);
      newWindow.moveTo(screen.width, screen.height);
      window.focus();
    }
    setTimeout(() => {
      window.location.href = `/?t=${encodeURIComponent(tag)}`;
    }, 0);
  };

  return (
    <Link
      href={`/?t=${encodeURIComponent(tag)}`}
      className="bg-gray-200 px-3 py-1 rounded-full text-sm cursor-pointer"
      onClick={handleClick}
    >
      #{tag}
    </Link>
  );
}
