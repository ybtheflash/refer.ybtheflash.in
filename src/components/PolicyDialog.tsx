"use client";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { HelpCircle } from "lucide-react";

export default function PolicyDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className="hover:scale-105 transition-transform" title="Policies & Info" aria-label="Policies and Information">
          <HelpCircle className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Policies & Transparency</DialogTitle>
          <DialogDescription>What this site collects and why.</DialogDescription>
        </DialogHeader>
        <div className="space-y-3 text-sm text-muted-foreground">
          <div>
            <span className="font-medium text-foreground">What we collect</span>
            <ul className="list-disc pl-5 mt-1 space-y-1">
              <li>
                Unique visitors: we store a salted hash of your IP (not your raw IP) to count unique visits.
              </li>
              <li>
                "I was here" wall: your name, message, device type, and time. Messages are checked for profanity; rejected text isn’t saved.
              </li>
              <li>
                reCAPTCHA v3 is used to prevent abuse.
              </li>
            </ul>
          </div>
          {/* <div>
            <span className="font-medium text-foreground">Services used</span>
            <ul className="list-disc pl-5 mt-1 space-y-1">
              <li>InstantDB for realtime storage.</li>
              <li>Google reCAPTCHA v3 for bot protection.</li>
              <li>Google Gemini for profanity moderation (strict YES/NO).</li>
            </ul>
          </div> */}
          <div>
            <span className="font-medium text-foreground">Notes</span>
            <ul className="list-disc pl-5 mt-1 space-y-1">
              <li>No marketing tracking, ads, or selling data.</li>
              <li>Basic server logs may record standard request info.</li>
              <li>Policies may change; continued use implies consent.</li>
            </ul>
          </div>
          <div>
            Questions or removal requests? Contact: <a className="underline hover:text-foreground" href="mailto:ybtheflash@gmail.com">ybtheflash@gmail.com</a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
