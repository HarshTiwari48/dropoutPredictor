"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";
import { useState } from "react";
import ContactCounsellorDialog from "@/components/student/ContactCounsellorDialog";

import {
  IconChartLine,
  IconMessageChatbot,
  IconUserHeart,
  IconArrowRight,
  IconSunrise,
} from "@tabler/icons-react";

//any type needs to be studied

export default function StudentHomePage() {
  const router = useRouter();
  const {logout} = useAuthStore();
  const [openCounsellorDialog, setOpenCounsellorDialog] = useState(false);

  return (
    <div className="relative min-h-screen overflow-hidden bg-linear-to-br from-orange-50 via-amber-50 to-sky-100">
      
      {/* soft background blobs */}
      <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-orange-300/30 blur-[120px]" />
      <div className="absolute top-1/3 -right-40 h-96 w-96 rounded-full bg-sky-300/30 blur-[120px]" />

      {/*  HEADER  */}
      <header className="relative z-10 flex items-center justify-between px-8 py-6">
        <h1 className="text-xl font-semibold text-slate-800">
          EleWare<span className="text-slate-500">Prime</span>
        </h1>

        <Button variant="outline"
         onClick={async () => {
              await logout();
              router.push("/login");
            }}
        >Logout</Button>
      </header>

      {/*  MAIN  */}
      <main className="relative z-10 mx-auto max-w-6xl px-6 py-16">
        
        {/* Greeting */}
        <div className="mb-12">
          <div className="flex items-center gap-3 text-orange-500">
            <IconSunrise size={36} />
            <h2 className="text-3xl font-semibold text-slate-800">
              Welcome back 👋
            </h2>
          </div>
          <p className="mt-2 max-w-xl text-slate-600">
            You’re not behind. You’re learning at your own pace — and we’re here
            to help you move forward.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-8 md:grid-cols-3">
          <StudentCard
            icon={IconChartLine}
            title="Your Dashboard"
            desc="Track your academic progress and see how things are improving over time."
            href="/student/dashboard"
          />

          <StudentCard
            icon={IconMessageChatbot}
            title="Talk to AI Mentor"
            desc="Ask questions, vent your worries, or get study guidance anytime."
            href="/student/chat"
          />

          <div
  onClick={(e) => {
    e.preventDefault();
    setOpenCounsellorDialog(true);
  }}
>
  <StudentCard
    icon={IconUserHeart}
    title="Contact Counsellor"
    desc="Reach out to your assigned counsellor for human support."
    href="#"
  />
</div>

        </div>

        {/* motivation */}
        <p className="mt-16 text-center text-sm text-slate-500">
          🌱 Small steps every day lead to big changes.
        </p>
      </main>
      <ContactCounsellorDialog
         open={openCounsellorDialog}
         onOpenChange={setOpenCounsellorDialog}
      />

    </div>
  );
}

/*  CARD  */

function StudentCard({
  icon: Icon,
  title,
  desc,
  href,
}: {
  icon: any;
  title: string;
  desc: string;
  href: string;
}) {
  return (
    <Link href={href}>
      <Card className="group h-full cursor-pointer border-slate-200 bg-white/80 backdrop-blur transition hover:-translate-y-1 hover:shadow-xl">
        <CardHeader className="flex flex-row items-center gap-4">
          <div className="rounded-xl bg-indigo-100 p-3 text-indigo-600">
            <Icon size={28} />
          </div>
          <CardTitle className="text-slate-800">{title}</CardTitle>
        </CardHeader>

        <CardContent>
          <p className="text-sm text-slate-600">{desc}</p>

          <div className="mt-4 flex items-center gap-2 text-sm font-medium text-indigo-600">
            Open
            <IconArrowRight
              size={16}
              className="transition group-hover:translate-x-1"
            />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
