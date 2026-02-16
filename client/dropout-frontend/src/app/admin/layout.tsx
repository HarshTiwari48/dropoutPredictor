"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";
import { Button } from "@/components/ui/button";
import ShimmerBackButton from "@/components/common/ShimmerActionButton";
import { usePathname } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user, isAuthenticated,logout, loading, fetchMe } = useAuthStore();
  const pathname = usePathname();
  const isAdminHome = pathname === "/admin";


  // fetch user on refresh (not perfrect)
  useEffect(() => {
    fetchMe();
  }, [fetchMe]);

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        router.replace("/login");
      } else if (user?.role !== "ADMIN") {
        router.replace("/student");
      }
    }
  }, [loading, isAuthenticated, user, router]);

  if (loading || !isAuthenticated || user?.role !== "ADMIN") {
    return null; // remember to replace with spinner later nigga
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* ================= NAVBAR ================= */}
      <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-900/70 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div>
            <h1 className="text-lg font-semibold">
              EleWarePrime
            </h1>
            <p className="text-xs text-slate-400">Admin Panel</p>
          </div>

          <Button
            variant="outline"
            className="text-black"
            onClick={async () => {
              await logout();
              router.push("/login");
            }}
          >
            Logout
          </Button>
        </div>
      </header>

      {/* ================= PAGE CONTENT ================= */}
      <main className="mx-auto max-w-7xl px-6 py-10">
        <div>
          {!isAdminHome && (
           <ShimmerBackButton fallbackHref="/admin" />
          )}

        </div>
        {children}
      </main>
    </div>
  );

}
