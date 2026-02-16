"use client";

import { useRouter } from "next/navigation";
import { IconArrowLeft } from "@tabler/icons-react";
import { ShimmerButton } from "@/components/ui/shimmer-button";

type Props = {
  fallbackHref?: string;
  label?: string;
  className?: string;
};

export default function ShimmerBackButton({
  fallbackHref,
  label = "Back",
  className,
}: Props) {
  const router = useRouter();

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else if (fallbackHref) {
      router.push(fallbackHref);
    }
  };

  return (
    <ShimmerButton
      shimmerColor="#c7d2fe"          // soft indigo shimmer
      shimmerSize="0.03em"            // VERY subtle
      shimmerDuration="3.5s"          // slow animation
      borderRadius="8px"
      background="#0f172a"
      className={`flex items-center gap-2 px-2 py-1 text-sm text-white hover:yellow-100 ${className || ""}`}
      onClick={handleBack}
    >
      <IconArrowLeft size={16} />
      {label}
    </ShimmerButton>
  );
}
