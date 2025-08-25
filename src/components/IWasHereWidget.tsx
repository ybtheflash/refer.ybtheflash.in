"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { db } from "@/lib/instant";
import { id } from "@instantdb/react";
import { FaMobileAlt, FaDesktop, FaGlobe } from "react-icons/fa";

function deviceType(): "phone" | "pc" | "other" {
  if (typeof navigator === "undefined") return "other";
  const ua = navigator.userAgent || "";
  if (/Mobi|Android|iPhone|iPad|iPod|Windows Phone/i.test(ua)) return "phone";
  if (/Macintosh|Windows NT|Linux/i.test(ua)) return "pc";
  return "other";
}

export default function IWasHereWidget() {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [submitting, setSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState<string | null>(null);
  const hasIncrementedRef = React.useRef(false);

  const query = React.useMemo(() => ({
    iwashere: {
      $: {
        limit: 5,
        order: { serverCreatedAt: "desc" as const },
      },
    },
  }), []);

  const { isLoading, error: qError, data } = db ? db.useQuery(query) : { isLoading: false, error: new Error("InstantDB not configured"), data: { iwashere: [] as any[] } } as any;

  // Visitor counter data
  const vQuery = React.useMemo(() => ({
    visitors: {
      $: {
        where: { id: "global" },
      },
    },
  }), []);
  const { isLoading: vLoading, data: vData } = db ? (db as any).useQuery(vQuery) : ({ isLoading: false, data: { visitors: [] } } as any);
  const visitCount = (vData?.visitors?.[0]?.count as number) ?? 0;

  // Increment unique visit using server-provided iphash
  React.useEffect(() => {
    if (!db) return;
    if (vLoading) return;
    if (hasIncrementedRef.current) return;
    let cancelled = false;
    (async () => {
      try {
        const r = await fetch("/api/visit");
        if (!r.ok) throw new Error("visit api failed");
        const { iphash } = await r.json();
        if (cancelled) return;
        // Check if this hash exists in InstantDB (namespace: visitors_seen, id = iphash)
        const seenQuery = { visitors_seen: { $: { where: { id: iphash } } } } as any;
        const { data: seenData } = await (db as any).queryOnce(seenQuery);
        const already = (seenData?.visitors_seen?.length ?? 0) > 0;
        if (!already) {
          // Mark hash as seen and increment counter
          await (db as any).transact([
            (db as any).tx.visitors_seen[iphash].update({ createdAt: Date.now() }),
            (db as any).tx.visitors["global"].update({ count: (visitCount || 0) + 1, updatedAt: Date.now() }),
          ]);
        }
        hasIncrementedRef.current = true;
      } catch (_) {
        hasIncrementedRef.current = true; // avoid loops
      }
    })();
    return () => { cancelled = true; };
  }, [vLoading, visitCount]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    if (!name.trim() || !message.trim()) {
      setError("Please fill in both name and message.");
      return;
    }
    setSubmitting(true);
    try {
      // 1) Check name
      const resName = await fetch("/api/moderate-text", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: name }),
      });
      if (!resName.ok) throw new Error("Moderation failed (name)");
      const nameJson = await resName.json();
      if (nameJson.profane === true) {
        setError("That name is inappropriate.");
        setSubmitting(false);
        return;
      }

      // 2) Check message
      const resMsg = await fetch("/api/moderate-text", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: message }),
      });
      if (!resMsg.ok) throw new Error("Moderation failed (message)");
      const msgJson = await resMsg.json();
      if (msgJson.profane === true) {
        setError("That message is inappropriate.");
        setSubmitting(false);
        return;
      }
      // Store in InstantDB
      if (!db) throw new Error("InstantDB not configured");
      await db.transact(
        db.tx.iwashere[id()].update({
          name: name.trim(),
          message: message.trim(),
          device: deviceType(),
          createdAt: Date.now(),
        })
      );
      setSuccess("Thanks! Your note was added.");
      setName("");
      setMessage("");
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  const waveEmoji = (
    <span className="inline-block will-change-transform animate-wave text-lg" aria-hidden>👋</span>
  );

  return (
    <>
      <style jsx>{`
        @keyframes wave {
          0% { transform: rotate(0deg); }
          5% { transform: rotate(20deg); }
          10% { transform: rotate(-10deg); }
          15% { transform: rotate(12deg); }
          20% { transform: rotate(0deg); }
          100% { transform: rotate(0deg); }
        }
        .animate-wave { animation: wave 3s ease-in-out infinite; transform-origin: 70% 70%; }
      `}</style>
      <Dialog open={open} onOpenChange={setOpen}>
        <div className="inline-flex items-center gap-3">
          <DialogTrigger asChild>
            <Button variant="outline" className="hover:scale-105 transition-transform">
              iWasHere {waveEmoji}
            </Button>
          </DialogTrigger>
          <div className="inline-flex items-center gap-2 text-sm text-muted-foreground select-none" title="Unique visitors">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>{vLoading ? "--" : visitCount}</span>
          </div>
        </div>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>I was here</DialogTitle>
            <DialogDescription>Leave a note and see the recent ones.</DialogDescription>
          </DialogHeader>
          <form onSubmit={onSubmit} className="space-y-3">
            <div className="grid grid-cols-1 gap-2">
              <input
                type="text"
                placeholder="Your name"
                className="w-full rounded-md border border-muted bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={submitting}
                maxLength={64}
              />
              <textarea
                placeholder="Say something nice"
                className="w-full min-h-[80px] rounded-md border border-muted bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                disabled={submitting}
                maxLength={300}
              />
            </div>
            {error && <div className="text-sm text-red-600">{error}</div>}
            {success && <div className="text-sm text-green-600">{success}</div>}
            <DialogFooter>
              <Button type="submit" disabled={submitting}>
                {submitting ? (
                  <span className="inline-flex items-center gap-2">
                    <span className="h-4 w-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
                    Checking...
                  </span>
                ) : (
                  "Send"
                )}
              </Button>
            </DialogFooter>
          </form>
          <div className="mt-4">
            <div className="text-sm font-medium mb-2">Recent (5)</div>
            {isLoading ? (
              <div className="text-sm text-muted-foreground">Loading...</div>
            ) : qError ? (
              <div className="text-sm text-red-600">Failed to load wall.</div>
            ) : (
              <ul className="space-y-2">
                {(data?.iwashere || []).map((it: any) => (
                  <li key={it.id} className="rounded-md border border-muted p-2">
                    <div className="text-sm"><span className="font-medium">{it.name || "Anonymous"}</span>: {it.message}</div>
                    <div className="mt-1 text-xs text-muted-foreground flex items-center gap-2">
                      <span>{new Date(it.createdAt ?? Date.now()).toLocaleString()}</span>
                      <span>•</span>
                      {it.device === "phone" ? (
                        <span className="inline-flex items-center" title="Mobile" aria-label="Mobile"><FaMobileAlt className="h-4 w-4" /></span>
                      ) : it.device === "pc" ? (
                        <span className="inline-flex items-center" title="PC" aria-label="PC"><FaDesktop className="h-4 w-4" /></span>
                      ) : (
                        <span className="inline-flex items-center" title="Others" aria-label="Others"><FaGlobe className="h-4 w-4" /></span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
