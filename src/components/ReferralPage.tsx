"use client"

import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import ValorantPopup from "@/components/ValorantPopup";
import { FaEnvelope, FaWhatsapp, FaGithub, FaLinkedin, FaYoutube, FaHandshake, FaTimes } from "react-icons/fa";
import { FaDiscord, FaXTwitter } from "react-icons/fa6";
import { useState, useEffect } from "react";

import { ModeToggle } from "./ModeToggle";
import { FlickeringGrid } from "@/components/magicui/flickering-grid";
import { Button as MovingBorderButton } from "@/components/ui/moving-border";
import IWasHereWidget from "@/components/IWasHereWidget";
import NowPlaying from "@/components/NowPlaying";
import PolicyDialog from "@/components/PolicyDialog";

export default function ReferralPage({ skills }: { skills: string[] }) {
  const [isPhotoExpanded, setIsPhotoExpanded] = useState(false);

  useEffect(() => {
    if (isPhotoExpanded) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isPhotoExpanded]);

  // Compute age from birthdate: June 28, 2002
  const birthDate = new Date(2002, 5, 28); // JS months are 0-based; 5 = June
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  // Compute Years of Experience from September 13, 2025
  const expStartDate = new Date(2025, 8, 13); // September 13, 2025
  let expInYears = (today.getTime() - expStartDate.getTime()) / (1000 * 60 * 60 * 24 * 365.25);
  // Ensure it doesn't show negative if date is in the future
  if (expInYears < 0) expInYears = 0;
  const formattedExp = expInYears.toFixed(1);
  return (
    <main className="min-h-screen bg-background text-foreground font-sans flex flex-col items-center justify-center p-4 transition-colors">
      {/* Full-viewport background */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="block dark:hidden h-full w-full opacity-60">
          <FlickeringGrid className="h-full w-full" color="rgb(0,0,0)" squareSize={5} maxOpacity={0.06} />
        </div>
        <div className="hidden dark:block h-full w-full opacity-50">
          <FlickeringGrid className="h-full w-full" color="rgb(255,255,255)" squareSize={5} maxOpacity={0.10} />
        </div>
      </div>
      {/* Foreground content */}
      <div className="relative z-10 w-full flex flex-col items-center">
        <ValorantPopup />
        <div className="relative w-full max-w-3xl mb-6">
          <Card className="w-full p-6 sm:p-8 border border-muted shadow-lg bg-card">
            {/* Hero */}
            <div className="flex items-center gap-4 sm:gap-6 mb-3 sm:mb-4 w-full">
              <button
                className="cursor-pointer hover:scale-105 active:scale-95 transition-all outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-full shrink-0"
                onClick={() => setIsPhotoExpanded(true)}
                aria-label="Expand photo"
              >
                <Avatar className="border border-muted shadow-sm w-[4.5rem] h-[4.5rem] sm:w-[5.5rem] sm:h-[5.5rem] overflow-hidden pointer-events-none">
                  <img src="/me.jpg" alt="Yubaraj Biswas" className="object-cover w-full h-full" />
                </Avatar>
              </button>
              <div className="flex-1">
                <p className="text-sm sm:text-base text-muted-foreground">
                  Looking for <span className="font-semibold text-primary">SDE I</span> or <span className="font-semibold text-primary">QEA</span> role — entry level.
                </p>
                <h1 className="mt-1 text-3xl sm:text-4xl font-extrabold tracking-tight">Yubaraj Biswas</h1>
                <div className="mt-1 text-xs text-muted-foreground">Kolkata, India • He/Him • {age}</div>
              </div>
            </div>
            {/* Prominent Resume button below bio with moving border */}
            <div className="mb-3 flex justify-start">
              <MovingBorderButton
                as="a"
                href="/YUBARAJ_BISWAS_2025.pdf"
                target="_blank"
                rel="noopener noreferrer"
                duration={3000}
                containerClassName="h-11 w-auto"
                className="px-4 py-2 text-sm font-semibold border border-foreground bg-foreground text-background"
                borderClassName="text-foreground/70 dark:text-foreground/60"
              >
                View Resume (PDF)
              </MovingBorderButton>
            </div>
            <Separator className="my-3 sm:my-4 bg-muted" />
            {/* Education & Work */}
            <section className="mb-3 sm:mb-4">
              <h2 className="text-xl font-semibold mb-2">Quick Overview</h2>
              <div className="space-y-3">
                {/* Education subsection */}
                <div>
                  <h3 className="text-base font-medium mb-1 text-muted-foreground">Highest Education</h3>
                  <div className="text-sm sm:text-base text-muted-foreground">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                      <div>
                        <span className="font-medium text-foreground">B P Poddar Institute Of Management and Technology</span>
                        <span className="ml-2 text-xs sm:text-sm text-muted-foreground">[Tier II] • Kolkata, WB, India</span>
                      </div>
                      <a href="https://bppimt.ac.in" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center w-8 h-8 rounded-md border border-muted hover:bg-muted transition-colors" aria-label="bppimt.ac.in">
                        ↗
                      </a>
                    </div>
                    <div className="mt-1">B.Tech in Computer Science and Engineering (2021 – 2025) • CGPA: 7.42</div>
                    <div className="text-xs sm:text-sm">Affiliated to Maulana Abul Kalam Azad University of Technology, West Bengal</div>
                  </div>
                </div>

                <Separator className="bg-muted" />

                {/* Work subsection */}
                <div>
                  <h3 className="text-base font-medium mb-4 text-muted-foreground">Latest Work Experience</h3>
                  <div className="text-sm sm:text-base text-muted-foreground">
                    <div className="relative">
                      {/* Root Tree Item: Cognizant */}
                      <div className="flex items-center mb-6 relative z-10">
                        <img
                          src="/cognizant-logo_512x512.png"
                          alt="Cognizant"
                          className="object-contain h-10 sm:h-12 w-auto rounded-sm dark:bg-white dark:p-1 transition-colors"
                        />
                      </div>

                      {/* Vertical tree line */}
                      <div className="absolute left-4 sm:left-5 top-8 bottom-8 w-px bg-muted"></div>

                      {/* Node 1: Trainee */}
                      <div className="relative pl-10 mb-6">
                        {/* Horizontal connector */}
                        <div className="absolute left-4 sm:left-5 top-3 w-6 sm:w-5 h-px bg-muted"></div>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                          <span className="font-medium text-foreground">PROGRAMMER ANALYST TRAINEE</span>
                          <span className="text-xs sm:text-sm">September 2025 – Present</span>
                        </div>
                        <div className="text-xs sm:text-sm mt-0.5">Project QEA: Healthcare • Coimbatore, Tamil Nadu</div>
                        <p className="mt-2 leading-relaxed">
                          Working within the healthcare domain performing manual testing of coding implementations, executing comprehensive query and claims testing. Validating data integrity across healthcare modules, participating in defect lifecycle management, and collaborating with cross-functional teams to ensure robust software quality.
                        </p>
                      </div>

                      {/* Node 2: Intern */}
                      <div className="relative pl-10">
                        {/* Horizontal connector */}
                        <div className="absolute left-4 sm:left-5 top-3 w-6 sm:w-5 h-px bg-muted"></div>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                          <span className="font-medium text-foreground">PROGRAMMER ANALYST INTERN</span>
                          <span className="text-xs sm:text-sm">May 2025 – August 2025</span>
                        </div>
                        <div className="text-xs sm:text-sm mt-0.5">Remote, Chennai, India</div>
                        <p className="mt-2 leading-relaxed">
                          Focused on technical upskilling through hands-on coding, project work, webinars, and milestone-based
                          evaluations; prepared with Agile and Testing skill set for QEA while adapting to dynamic skill tracks and
                          collaborating with industry mentors to align learning with real-world business needs.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <Separator className="my-3 sm:my-4 bg-muted" />
            <div className="mb-4">
              <h2 className="text-xl font-semibold mb-2">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, idx) => (
                  <Badge key={idx} className="bg-muted text-foreground border border-muted shadow-sm hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer animate-pulse-on-hover">{skill}</Badge>
                ))}
              </div>
            </div>
            <Separator className="my-4 bg-muted" />
            <div className="mb-2">
              <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
                Connections 🤝🏻
              </h2>
              <div className="flex flex-col gap-4">
                <a href="mailto:yubarajbiswas34@gmail.com" className="flex items-center gap-2 text-base font-medium hover:text-fuchsia-400 transition-colors group">
                  <FaEnvelope className="text-xl group-hover:scale-110 group-hover:text-fuchsia-400 transition-transform shrink-0" />
                  <span className="truncate">yubarajbiswas34@gmail.com</span>
                </a>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3">
                  <a href="https://wa.me/+919883289005" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-base font-medium hover:text-green-500 transition-colors group">
                    <FaWhatsapp className="text-xl group-hover:scale-110 group-hover:text-green-500 transition-transform shrink-0" />
                    <span className="truncate">WhatsApp</span>
                  </a>
                  <a href="https://www.linkedin.com/in/yubarajbiswas" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-base font-medium hover:text-blue-600 transition-colors group">
                    <FaLinkedin className="text-xl group-hover:scale-110 group-hover:text-blue-600 transition-transform shrink-0" />
                    <span className="truncate">LinkedIn</span>
                  </a>
                  <a href="https://github.com/ybtheflash" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-base font-medium hover:text-amber-600 dark:hover:text-amber-400 transition-colors group">
                    <FaGithub className="text-xl group-hover:scale-110 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-transform shrink-0" />
                    <span className="truncate">GitHub</span>
                  </a>
                  <a href="https://www.youtube.com/@ybtheflash" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-base font-medium hover:text-red-600 transition-colors group">
                    <FaYoutube className="text-xl group-hover:scale-110 group-hover:text-red-600 transition-transform shrink-0" />
                    <span className="truncate">YouTube</span>
                  </a>
                  <a href="https://discord.com/users/477812176002875423" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-base font-medium hover:text-[#5865F2] transition-colors group">
                    <FaDiscord className="text-xl group-hover:scale-110 group-hover:text-[#5865F2] transition-transform shrink-0" />
                    <span className="truncate">ybtheflash</span>
                  </a>
                  <a href="https://x.com/ybtheflash" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-base font-medium hover:text-gray-500 dark:hover:text-gray-300 transition-colors group">
                    <FaXTwitter className="text-xl group-hover:scale-110 group-hover:text-gray-500 dark:group-hover:text-gray-300 transition-transform shrink-0" />
                    <span className="truncate">X (Twitter)</span>
                  </a>
                </div>
              </div>
            </div>
            <Separator className="my-1 bg-muted" />
            {/* Bottom section: New layout for all views */}
            <div className="space-y-5">
              {/* Top row: Spotify player centered */}
              <div className="flex justify-center w-full">
                <NowPlaying />
              </div>

              {/* Bottom row: 3 buttons on left, iWasHere on right */}
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                  <ModeToggle />
                  <Button asChild variant="outline" size="icon" className="hover:scale-105 transition-transform" title="Visit ybtheflash.in">
                    <a href="https://ybtheflash.in" target="_blank" rel="noopener noreferrer" aria-label="ybtheflash.in">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M2 12h20" />
                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10Z" />
                      </svg>
                    </a>
                  </Button>
                  <PolicyDialog />
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="px-3 py-1.5 h-9 text-sm font-medium whitespace-nowrap bg-muted border border-muted-foreground/20 text-muted-foreground flex items-center justify-center rounded-md">
                    EXP {formattedExp} Yrs
                  </Badge>
                  <IWasHereWidget />
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Photo Modal */}
      {isPhotoExpanded && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md p-4 animate-modal-fade"
          onClick={() => setIsPhotoExpanded(false)}
        >
          <div className="relative animate-zoom-in max-w-[95vw] max-h-[95vh] sm:max-w-[90vw] sm:max-h-[90vh]">
            <button
              className="absolute -top-12 right-0 sm:-right-12 sm:-top-0 text-white/70 hover:text-white p-2 transition-colors cursor-pointer z-10"
              onClick={(e) => {
                e.stopPropagation();
                setIsPhotoExpanded(false);
              }}
              aria-label="Close"
            >
              <FaTimes className="w-8 h-8 sm:w-10 sm:h-10 drop-shadow-md" />
            </button>
            <img
              src="/me.jpg"
              alt="Yubaraj Biswas"
              className="object-contain max-w-full max-h-[85vh] sm:max-h-[90vh] rounded-lg shadow-2xl pointer-events-none select-none"
            />
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes modalFade {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes zoomIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-modal-fade {
          animation: modalFade 0.2s ease-out forwards;
        }
        .animate-zoom-in {
          animation: zoomIn 0.2s ease-out forwards;
        }
        .animate-pulse-on-hover:hover {
          animation: pulse 0.5s;
        }
        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 var(--tw-shadow-color, #888); }
          50% { box-shadow: 0 0 8px 2px var(--tw-shadow-color, #888); }
          100% { box-shadow: 0 0 0 0 var(--tw-shadow-color, #888); }
        }
      `}</style>
    </main>
  );
}
