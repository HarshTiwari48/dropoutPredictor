"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Magic UI
import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern";
import { AnimatedShinyText } from "@/components/ui/animated-shiny-text";
// import { Meteors } from "@/components/ui/meteors"
import GraduationCap from "@/components/graduationCap";
import FeatureSection from "@/components/landing/FeatureSection";



// Tabler Icons
import {
  IconBrain,
  IconUpload,
  IconChartLine,
  IconMessageChatbot,
  IconArrowRight,
} from "@tabler/icons-react";

export default function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white">
      {/* ================= BACKGROUND ================= */}

      {/* Animated Grid Pattern */}
      <AnimatedGridPattern
        numSquares={40}
        maxOpacity={0.15}
        duration={3}
        className="absolute inset-0"
      />

      {/* Soft Gradient Blobs */}
      <div className="absolute -top-40 -left-40 h-125 w-125 rounded-full bg-indigo-500/20 blur-[120px]" />
      <div className="absolute top-1/3 -right-40 h-125 w-125 rounded-full bg-purple-500/20 blur-[120px]" />

      {/* meteor */}

       {/* <div className="relative h-125 w-full overflow-hidden">
      <Meteors />
       </div> */}


      {/* ================= HEADER ================= */}
      <header className="sticky top-0 z-100 w-full
 flex items-center justify-between px-8 py-6">
        <h1 className="text-xl font-semibold tracking-wide">
          EleWare<span className="text-slate-400">Prime</span>
        </h1>

        <div className="flex gap-3">
          <Link href="/login">
            <Button variant="ghost">Login</Button>
          </Link>
          <Link href="/signup">
            <Button>Sign up</Button>
          </Link>
        </div>
      </header>

      {/* ================= HERO ================= */}
<main className="relative z-10 flex min-h-[80vh] items-center justify-center px-6">
  <div className="mx-auto grid max-w-360 grid-cols-1 items-center gap-20 md:grid-cols-2">

    {/* LEFT — Text */}
    <div className="text-center md:text-left ml-5">
      <AnimatedShinyText className="text-5xl font-extrabold md:text-7xl leading-tight">
        <span className="inline-flex items-center gap-4">
          <IconBrain size={44} className="text-indigo-400" />
          Predict student dropouts before they happen
        </span>
      </AnimatedShinyText>

      <p className="mt-6 max-w-xl text-lg text-slate-400">
        An AI-powered system that analyzes academic performance, predicts
        dropout risk, and provides personalized guidance to students.
      </p>

      <div className="mt-10 flex flex-col gap-4 sm:flex-row">
        <Link href="/signup">
          <Button size="lg" className="gap-2">
            Get Started
            <IconArrowRight size={18} />
          </Button>
        </Link>

        <a href="#how-it-works">
          <Button size="lg" variant="outline" className="text-indigo-400">
            Learn More
          </Button>
        </a>
      </div>
    </div>

    <div className="hidden md:block absolute left-1/2 top-1/2 h-[60%] w-px -translate-y-1/2 bg-linear-to-b from-transparent via-indigo-500/20 to-transparent" />
        

    {/* RIGHT — Graduation Cap */}
    <div className="relative flex justify-center">
      {/* soft glow behind */}
      <div className="absolute h-72 w-72 rounded-full bg-indigo-500/20 blur-[120px]" />
      <GraduationCap />
    </div>

  </div>
</main>

{/* FEATURES */}

<FeatureSection
  title="AI-Powered Academic Support"
  description="Students receive real-time guidance powered by advanced AI, tailored to their academic risk and performance data."
  bullets={[
    "Real-time conversational AI mentor",
    "Emotion-aware supportive responses",
    "Context-aware academic suggestions",
    "Secure student-only access",
  ]}
  imageSrc="/screenshots/chat.png"
/>

<FeatureSection
  title="Personalized Dropout Risk Insights"
  description="Machine learning predicts student dropout probability and tracks academic performance trends semester by semester."
  bullets={[
    "ML-based dropout probability scoring",
    "Semester performance tracking",
    "Academic trend detection",
    "Support-oriented insights",
  ]}
  imageSrc="/screenshots/studentDashboard.png"
  reverse
/>

<FeatureSection
  title="Institution-Level Risk Monitoring"
  description="Administrators can upload student datasets, classify risk levels, and schedule counselling sessions efficiently."
  bullets={[
    "Bulk CSV upload processing",
    "Risk classification (Low / Medium / High)",
    "Student performance overview",
    "Appointment scheduling system",
  ]}
  imageSrc="/screenshots/adminDashboard.png"
/>


      {/* ================= HOW IT WORKS ================= */}
      <section
        id="how-it-works"
        className="relative z-10 mx-auto max-w-6xl px-6 py-20"
      >
        <h2 className="mb-12 text-center text-3xl font-semibold">
          How it works
        </h2>

        <div className="grid gap-8 md:grid-cols-3">
          <FeatureCard
            icon={IconUpload}
            title="Upload Academic Data"
            desc="Counsellors securely upload student data using CSV files."
          />
          <FeatureCard
            icon={IconChartLine}
            title="AI Risk Prediction"
            desc="Machine learning models analyze trends and predict dropout probability."
          />
          <FeatureCard
            icon={IconMessageChatbot}
            title="Student Guidance"
            desc="Students track progress and receive AI-powered counselling."
          />
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="relative z-10 border-t border-slate-900 px-6 py-6 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} Dropout Predictor · Built with AI
      </footer>
    </div>
  );
}

/* ================= FEATURE CARD ================= */

function FeatureCard({
  icon: Icon,
  title,
  desc,
}: {
  icon: any;
  title: string;
  desc: string;
}) {
  return (
    <Card className="border-slate-800 bg-slate-900/60 backdrop-blur transition hover:shadow-xl hover:shadow-indigo-900/20">
      <CardHeader className="flex flex-row items-center gap-3">
        <Icon size={28} className="text-indigo-400" />
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-slate-400">{desc}</p>
      </CardContent>
    </Card>
  );
}
