import { cn } from "@/lib/utils";

type Props = {
  role: "student" | "mentor";
  text: string;
};

export default function ChatBubble({ role, text }: Props) {
  const isStudent = role === "student";

  return (
    <div
      className={cn(
        "max-w-[75%] rounded-xl px-4 py-3 text-sm leading-relaxed",
        isStudent
          ? "ml-auto bg-orange-500 text-white"
          : "mr-auto bg-orange-50 text-gray-800 border border-orange-100"
      )}
    >
      {text}
    </div>
  );
}
