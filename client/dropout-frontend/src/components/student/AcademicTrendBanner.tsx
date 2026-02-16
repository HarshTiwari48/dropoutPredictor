"use client";

interface AcademicTrendBannerProps {
  academicTrend: "IMPROVING" | "STABLE" | "DECLINING";
}

export const AcademicTrendBanner = ({
  academicTrend,
}: AcademicTrendBannerProps) => {
  const content = {
    IMPROVING: {
      title: "You’re improving. Keep going.",
      message:
        "Your recent performance shows positive momentum. Small, consistent efforts are working — stay steady.",
      color: "text-green-400",
    },
    STABLE: {
      title: "You’re holding steady.",
      message:
        "Stability is not a failure. With a little more focus or support, this can turn into growth.",
      color: "text-yellow-400",
    },
    DECLINING: {
      title: "This phase looks challenging.",
      message:
        "Academic dips happen and they don’t define you. Getting support early can genuinely help — you don’t have to handle this alone.",
      color: "text-red-400",
    },
  };

  const trend = content[academicTrend];

  return (
    <div className="mt-10 rounded-xl border border-white/10 bg-white/5 p-6">
      <h3
        className={`mb-2 text-xl font-semibold ${trend.color}`}
      >
        {trend.title}
      </h3>

      <p className="text-sm text-black/60">
        {trend.message}
      </p>
    </div>
  );
};
