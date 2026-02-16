"use client"

import {
  ComponentPropsWithoutRef,
  useEffect,
  useId,
  useRef,
  useState,
  useCallback,
} from "react"
import { motion } from "motion/react"
import { cn } from "@/lib/utils"

export interface AnimatedGridPatternProps
  extends ComponentPropsWithoutRef<"svg"> {
  width?: number
  height?: number
  x?: number
  y?: number
  strokeDasharray?: number
  numSquares?: number
  maxOpacity?: number
  duration?: number
}

export function AnimatedGridPattern({
  width = 40,
  height = 40,
  x = -1,
  y = -1,
  strokeDasharray = 0,
  numSquares = 50,
  className,
  maxOpacity = 0.5,
  duration = 4,
  ...props
}: AnimatedGridPatternProps) {
  const id = useId()
  const containerRef = useRef<SVGSVGElement | null>(null)

  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [squares, setSquares] = useState<
    { id: number; pos: [number, number] }[]
  >([])

  /* ------------------ helpers (STABLE) ------------------ */

  const getPos = useCallback((): [number, number] => {
    if (!dimensions.width || !dimensions.height) return [0, 0]

    return [
      Math.floor((Math.random() * dimensions.width) / width),
      Math.floor((Math.random() * dimensions.height) / height),
    ]
  }, [dimensions.width, dimensions.height, width, height])

  const generateSquares = useCallback(
    (count: number) => {
      return Array.from({ length: count }, (_, i) => ({
        id: i,
        pos: getPos(),
      }))
    },
    [getPos]
  )

  /* ------------------ effects ------------------ */

  // generate squares ONLY when size or count changes
  useEffect(() => {
    if (!dimensions.width || !dimensions.height) return
    setSquares(generateSquares(numSquares))
  }, [dimensions.width, dimensions.height, numSquares, generateSquares])

  // resize observer
  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setDimensions({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        })
      }
    })

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current)
    }

    return () => resizeObserver.disconnect()
  }, [])

  /* ------------------ square animation update ------------------ */

  const updateSquarePosition = useCallback(
    (id: number) => {
      setSquares((prev) =>
        prev.map((sq) =>
          sq.id === id ? { ...sq, pos: getPos() } : sq
        )
      )
    },
    [getPos]
  )

  /* ------------------ render ------------------ */

  return (
    <svg
      ref={containerRef}
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full fill-gray-400/30 stroke-gray-400/30",
        className
      )}
      {...props}
    >
      <defs>
        <pattern
          id={id}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <path
            d={`M.5 ${height}V.5H${width}`}
            fill="none"
            strokeDasharray={strokeDasharray}
          />
        </pattern>
      </defs>

      <rect width="100%" height="100%" fill={`url(#${id})`} />

      <svg x={x} y={y} className="overflow-visible">
        {squares.map(({ pos: [px, py], id }, index) => (
          <motion.rect
            key={`${id}-${index}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: maxOpacity }}
            transition={{
              duration,
              repeat: 1,
              delay: index * 0.1,
              repeatType: "reverse",
            }}
            onAnimationComplete={() => updateSquarePosition(id)}
            width={width - 1}
            height={height - 1}
            x={px * width + 1}
            y={py * height + 1}
            fill="currentColor"
            strokeWidth="0"
          />
        ))}
      </svg>
    </svg>
  )
}
