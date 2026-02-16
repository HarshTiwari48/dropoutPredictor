"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface Props {
  title: string;
  description: string;
  bullets: string[];
  imageSrc: string;
  reverse?: boolean;
}

export default function FeatureSection({
  title,
  description,
  bullets,
  imageSrc,
  reverse = false,
}: Props) {
  return (
    <section className="relative py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-16 px-6 md:grid-cols-2">
        
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: reverse ? 40 : -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className={`${reverse ? "md:order-2" : ""}`}
        >
          <div className="rounded-2xl border border-amber-200 bg-white/5 p-3 backdrop-blur-xl shadow-2xl">
            <Image
              src={imageSrc}
              alt="Feature preview"
              width={900}
              height={600}
              className="rounded-xl"
            />
          </div>
        </motion.div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: reverse ? -40 : 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className={`${reverse ? "md:order-1" : ""}`}
        >
          <h2 className="text-4xl font-semibold text-white">
            {title}
          </h2>

          <p className="mt-6 text-lg text-white/70">
            {description}
          </p>

          <ul className="mt-8 space-y-4">
            {bullets.map((item, index) => (
              <li
                key={index}
                className="flex items-start gap-3 text-white/80"
              >
                <span className="mt-1 h-2 w-2 rounded-full bg-indigo-400" />
                {item}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
