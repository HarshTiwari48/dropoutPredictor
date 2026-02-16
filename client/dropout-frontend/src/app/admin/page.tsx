"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BorderBeam } from "@/components/ui/border-beam";
import Link from "next/link";

import {
  IconUpload,
  IconUsers,
  IconCalendar,
} from "@tabler/icons-react";

export default function AdminPage() {
  return (
    <>
      {/*  HEADER  */}
      <div className="mb-10 mt-4">
        <h2 className="text-3xl font-bold">Admin Dashboard</h2>
        <p className="mt-2 text-slate-400">
          Manage students, data, and interventions
        </p>
      </div>

      {/*  CARDS  */}
      <div className="grid gap-8 md:grid-cols-3">
        <AdminCard
          icon={IconUpload}
          title="Upload CSV"
          desc="Upload and update student academic records securely."
          action="Upload Data"
          href="/admin/upload"
          
        />

        <AdminCard
          icon={IconUsers}
          title="Students Data"
          desc="View students, dropout risk levels, and contact them."
          action="View Students"
          href="/admin/students"
        />

        <AdminCard
          icon={IconCalendar}
          title="Schedule Appointments"
          desc="Arrange counselling sessions with students."
          action="Schedule"
          href="/admin/schedule"
        />
      </div>
    </>
  );
}

/*  ADMIN CARD  */

function AdminCard({
  icon: Icon,
  title,
  desc,
  action,
  href,
}: {
  icon: any;
  title: string;
  desc: string;
  action: string;
  href: string;
}) {
  return (
    <Link href={href}>
    <div className="relative rounded-xl p-0.5">
      <BorderBeam
        size={180}
        duration={8}
        borderWidth={2}
        colorFrom="#38bdf8"
        colorTo="#6366f1"
      />

      
      <Card className="relative h-full rounded-xl border border-slate-800 bg-linear-to-br from-slate-900 to-slate-950 backdrop-blur transition-transform hover:-translate-y-1">
        <CardHeader className="flex flex-row items-center gap-4">
          <Icon size={32} className="text-cyan-400" />
          <CardTitle className="text-lg">{title}</CardTitle>
        </CardHeader>

        <CardContent className="flex h-full flex-col justify-between">
          <p className="mb-6 text-sm text-slate-400">
            {desc}
          </p>

          <Button className="w-full">{action}</Button>
        </CardContent>
      </Card>
    </div>
  </Link>
  );
}

