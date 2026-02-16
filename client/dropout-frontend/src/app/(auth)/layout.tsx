"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";
import ShimmerBackButton from "@/components/common/ShimmerActionButton"; // add this later

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { isAuthenticated, loading, fetchMe, user } = useAuthStore();

  // Fetch user once (no recurrence)
  useEffect(() => {
    fetchMe();
  }, [fetchMe]);

  // role ke hisaab se redirect a
  useEffect(() => {
    if (!loading && isAuthenticated && user) {
      if (user.role === "ADMIN") {
        router.replace("/admin");
      } else {
        router.replace("/student");
      }
    }
  }, [loading, isAuthenticated, user, router]);

  if (loading) return null;

  return (
     <>{children}</>
  );
}
