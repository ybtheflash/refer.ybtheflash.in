"use client";
import { useEffect, useState } from "react";

// Read site key from Next.js public env (never fall back to secret on client)
const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string | undefined;

export default function RecaptchaV3() {
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [score, setScore] = useState<number | null>(null);
  const [verified, setVerified] = useState<boolean | null>(null);

  useEffect(() => {
    // Load the reCAPTCHA script
    if (!window.grecaptcha) {
      const script = document.createElement("script");
      script.src = `https://www.google.com/recaptcha/api.js?render=${SITE_KEY}`;
      script.async = true;
      script.onload = () => {
        if (window.grecaptcha) {
          window.grecaptcha.ready(() => {
            window.grecaptcha.execute(SITE_KEY, { action: "homepage" }).then(setToken).catch(() => setError("Failed to get token"));
          });
        }
      };
      script.onerror = () => setError("Failed to load reCAPTCHA script");
      document.body.appendChild(script);
    } else {
      window.grecaptcha.ready(() => {
        window.grecaptcha.execute(SITE_KEY, { action: "homepage" }).then(setToken).catch(() => setError("Failed to get token"));
      });
    }
  }, []);

  useEffect(() => {
    if (token) {
      fetch("/api/verify-recaptcha", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      })
        .then((res) => res.json())
        .then((data) => {
          setScore(data.score);
          setVerified(data.success);
        })
        .catch(() => setError("Verification failed"));
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center">
      <span className="text-[#ff00ea] mb-2">Google reCAPTCHA v3 enabled</span>
      {error ? (
        <span className="text-xs text-red-400">{error}</span>
      ) : token == null ? (
        <span className="text-xs text-yellow-400">Generating token...</span>
      ) : verified == null ? (
        <span className="text-xs text-yellow-400">Verifying...</span>
      ) : verified ? (
        <span className="text-xs text-green-400">Verified ✔️ (score: {score})</span>
      ) : (
        <span className="text-xs text-red-400">Failed reCAPTCHA (score: {score})</span>
      )}
    </div>
  );
}

declare global {
  interface Window {
    grecaptcha?: any;
  }
}
