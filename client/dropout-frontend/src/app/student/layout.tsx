"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { isAuthenticated, loading, user, fetchMe } = useAuthStore();

  useEffect(() => {
    fetchMe();
  }, [fetchMe]);

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        router.replace("/login");
      } else if (user?.role !== "STUDENT") {
        router.replace("/admin");
      }
    }
  }, [loading, isAuthenticated, user, router]);

  if (loading || !isAuthenticated || user?.role !== "STUDENT") {
    return null;
  }

  return <>{children}</>;
}
