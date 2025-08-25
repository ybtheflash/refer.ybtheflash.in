
import ReferralPage from "@/components/ReferralPage";
import fs from "fs";
import path from "path";
import { Metadata } from "next";

// Read skills from skills.txt (server component)
const skillsPath = path.join(process.cwd(), "skills.txt");
const skills = fs.readFileSync(skillsPath, "utf-8").split("\n").filter(Boolean);

export const metadata: Metadata = {
  title: "Yubaraj Biswas",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function Home() {
  return <ReferralPage skills={skills} />;
}

