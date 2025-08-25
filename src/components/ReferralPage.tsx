"use client"

import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import ValorantPopup from "@/components/ValorantPopup";
import { FaEnvelope, FaWhatsapp, FaGithub, FaLinkedin } from "react-icons/fa";

import { ModeToggle } from "./ModeToggle";
import { FlickeringGrid } from "@/components/magicui/flickering-grid";
import { Button as MovingBorderButton } from "@/components/ui/moving-border";
import IWasHereWidget from "@/components/IWasHereWidget";

export default function ReferralPage({ skills }: { skills: string[] }) {
  // Compute age from birthdate: June 28, 2002
  const birthDate = new Date(2002, 5, 28); // JS months are 0-based; 5 = June
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return (
    <main className="min-h-screen bg-background text-foreground font-sans flex flex-col items-center justify-center p-4 transition-colors">
      <ValorantPopup />
  <div className="relative w-full max-w-3xl mb-6">
        {/* Local background just behind the card */}
        <div className="absolute -inset-3 sm:-inset-4 -z-10 rounded-2xl overflow-hidden">
          <div className="block dark:hidden h-full w-full opacity-60">
            <FlickeringGrid className="h-full w-full" color="rgb(0,0,0)" maxOpacity={0.08} />
          </div>
          <div className="hidden dark:block h-full w-full opacity-50">
            <FlickeringGrid className="h-full w-full" color="rgb(255,255,255)" maxOpacity={0.12} />
          </div>
        </div>
        <Card className="w-full p-6 sm:p-8 border border-muted shadow-lg bg-card">
        {/* Hero */}
  <div className="flex items-center gap-4 sm:gap-6 mb-3 sm:mb-4 w-full">
          <Avatar className="border border-muted shadow-sm w-16 h-16 sm:w-20 sm:h-20 overflow-hidden">
            <img src="/me.jpg" alt="Yubaraj Biswas" className="object-cover w-full h-full" />
          </Avatar>
          <div className="flex-1">
            <p className="text-sm sm:text-base text-muted-foreground">
              Looking for <span className="font-semibold text-primary">SDE I</span> or <span className="font-semibold text-primary">QEA</span> role — entry level, just graduated as a fresher.
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
              <h3 className="text-base font-medium mb-1 text-muted-foreground">Latest Work Experience</h3>
              <div className="text-sm sm:text-base text-muted-foreground">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                  <span className="font-medium text-foreground">PROGRAMMER ANALYST INTERN | COGNIZANT</span>
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
          <h2 className="text-xl font-semibold mb-2">Contact Info</h2>
          <div className="flex flex-col gap-3">
            <a href="mailto:yubarajbiswas34@gmail.com" className="flex items-center gap-2 text-base font-medium hover:text-fuchsia-400 transition-colors group">
              <FaEnvelope className="text-xl group-hover:scale-110 group-hover:text-fuchsia-400 transition-transform" />
              yubarajbiswas34@gmail.com
            </a>
            <a href="https://wa.me/+919883289005" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-base font-medium hover:text-green-500 transition-colors group">
              <FaWhatsapp className="text-xl group-hover:scale-110 group-hover:text-green-500 transition-transform" />
              WhatsApp
            </a>
            <a href="https://www.linkedin.com/in/yubarajbiswas" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-base font-medium hover:text-blue-600 transition-colors group">
              <FaLinkedin className="text-xl group-hover:scale-110 group-hover:text-blue-600 transition-transform" />
              LinkedIn
            </a>
            <a href="https://github.com/ybtheflash" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-base font-medium hover:text-gray-900 dark:hover:text-white transition-colors group">
              <FaGithub className="text-xl group-hover:scale-110 group-hover:text-gray-900 dark:group-hover:text-white transition-transform" />
              GitHub
            </a>
          </div>
        </div>
  <Separator className="my-4 bg-muted" />
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <ModeToggle />
          <Button asChild variant="outline" size="icon" className="hover:scale-105 transition-transform" title="Visit ybtheflash.in">
            <a href="https://ybtheflash.in" target="_blank" rel="noopener noreferrer" aria-label="ybtheflash.in">
              {/* simple globe icon */}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
                <circle cx="12" cy="12" r="10" />
                <path d="M2 12h20" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10Z" />
              </svg>
            </a>
          </Button>
          <IWasHereWidget />
        </div>
        </Card>
      </div>
      <style jsx global>{`
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
