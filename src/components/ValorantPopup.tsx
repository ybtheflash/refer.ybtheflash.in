"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

// Subtle top banner instead of modal dialog
export default function ValorantPopup() {
  const [show, setShow] = useState(false);
  const [thanks, setThanks] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 600);
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div className="w-full max-w-2xl mx-auto mb-4 rounded-md border border-muted bg-muted/40 text-foreground px-4 py-3 shadow-sm">
      {!thanks ? (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-sm">
            Did I find you on{' '}
            <a
              href="https://playvalorant.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-red-600 dark:text-red-500 hover:underline"
            >
              VALORANT
            </a>
            ?
          </span>
          <div className="flex gap-2">
            <Button size="sm" onClick={() => setThanks(true)}>
              Yes
            </Button>
            <Button size="sm" variant="outline" onClick={() => setShow(false)}>
              No
            </Button>
          </div>
        </div>
      ) : (
        <div className="text-sm text-center sm:text-left space-y-1">
          <div>Here&#39;s a cookie 🍪!</div>
          <div>
            Thanks for taking your time to visit this site, I would be grateful if you could refer me to a job.
          </div>
        </div>
      )}
    </div>
  );
}
