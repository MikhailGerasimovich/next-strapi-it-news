"use client";

import { useState } from "react";
import { Share2, Check } from "lucide-react";

interface ShareButtonProps {
  url?: string;
}

export default function ShareButton({ url }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    const linkToCopy =
      url || (typeof window !== "undefined" ? window.location.href : "");

    if (!linkToCopy) return;

    try {
      await navigator.clipboard.writeText(linkToCopy);
      setCopied(true);

      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.log("Error copying to clipboard:", error);
    }
  };

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-gray-600">Share:</span>
      <button
        onClick={handleCopyLink}
        className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
          copied
            ? "bg-green-100 text-green-700 border border-green-300"
            : "bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300"
        }`}
        title="Copy link to clipboard"
      >
        {copied ? (
          <>
            <Check className="w-4 h-4" />
            <span className="text-sm font-medium">Copied!</span>
          </>
        ) : (
          <>
            <Share2 className="w-4 h-4" />
            <span className="text-sm font-medium">Copy link</span>
          </>
        )}
      </button>
    </div>
  );
}
