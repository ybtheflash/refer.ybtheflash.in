"use client";
import RecaptchaV3 from "@/components/RecaptchaV3";

export default function CaptchaSection() {
  return (
    <div className="bg-black/40 p-4 rounded border border-[#00fff7] text-center">
      <RecaptchaV3 />
    </div>
  );
}
