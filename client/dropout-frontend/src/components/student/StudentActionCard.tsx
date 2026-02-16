"use client";

import {
  IconRobot,
  IconUserHeart,
  IconArrowRight,
} from "@tabler/icons-react";
import Link from "next/link";

export const StudentActionCard = () => {
  return (
    <div className="rounded-2xl border bg-white/80 backdrop-blur p-6 shadow-sm">
      {/* Header */}
      <h3 className="mb-4 text-lg font-semibold text-gray-900">
        What would you like to do next?
      </h3>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* AI Mentor */}
        <Link
          href="/student/chat"
          className="group rounded-xl border p-4 transition hover:bg-blue-50"
        >
          <div className="flex items-start gap-3">
            <div className="rounded-lg bg-blue-100 p-2 text-blue-600">
              <IconRobot />
            </div>

            <div className="flex-1">
              <p className="font-medium text-gray-900">
                Talk to AI Mentor
              </p>
              <p className="mt-1 text-sm text-gray-600">
                Ask questions, vent stress, or get study guidance anytime.
              </p>
            </div>

            <IconArrowRight className="mt-1 text-gray-400 transition group-hover:translate-x-1" />
          </div>
        </Link>

        {/* Human Counsellor */}
        <button
          disabled
          className="rounded-xl border p-4 text-left opacity-60 cursor-not-allowed"
          title="Counsellor booking coming soon"
        >
          <div className="flex items-start gap-3">
            <div className="rounded-lg bg-purple-100 p-2 text-purple-600">
              <IconUserHeart />
            </div>

            <div className="flex-1">
              <p className="font-medium text-gray-900">
                Contact Counsellor
              </p>
              <p className="mt-1 text-sm text-gray-600">
                Reach out for confidential human support.
              </p>
            </div>
          </div>

          <p className="mt-3 text-xs text-gray-500">
            Booking feature coming soon
          </p>
        </button>
      </div>

      {/* Supportive footer */}
      <p className="mt-5 text-sm text-gray-600">
        You’re not alone. Support is always available — in the way that
        feels right to you 🤍
      </p>
    </div>
  );
};
