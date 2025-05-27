"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, Settings, Crown, CreditCard } from "lucide-react";
import Link from "next/link";

// Mock user data
const user = {
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
  avatar: "/placeholder.svg?height=32&width=32&query=user+avatar",
  plan: "Pro",
  planColor: "bg-gradient-to-r from-purple-500 to-pink-500",
};

const logout = () => {
  console.log("Logging out...");
};

// Animation variants
const containerVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    transition: {
      duration: 0.3,
      ease: "easeIn",
    },
  },
};

const textVariants = {
  hidden: { width: 0 },
  visible: {
    width: "auto",
    transition: {
      duration: 1.5,
      ease: "easeInOut",
    },
  },
  exit: {
    width: 0,
    transition: {
      duration: 1,
      ease: "easeInOut",
    },
  },
};

const cursorVariants = {
  blinking: {
    opacity: [0, 0, 1, 1],
    transition: {
      duration: 1,
      repeat: Number.POSITIVE_INFINITY,
      ease: "linear",
    },
  },
};

export default function AnimationText() {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isLooping, setIsLooping] = useState(true);
  const [animationPhase, setAnimationPhase] = useState<
    "entering" | "displaying" | "exiting"
  >("entering");
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);

  const texts = ["Request a service", "Check pricing"];

  // Clear all timeouts
  const clearAllTimeouts = () => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  };

  // Start animation cycle
  const startAnimationCycle = () => {
    if (!isLooping) return;

    clearAllTimeouts();

    // Initial delay
    const timer1 = setTimeout(() => {
      if (!isLooping) return;
      setIsVisible(true);
      setAnimationPhase("entering");
    }, 1000);
    timeoutsRef.current.push(timer1);

    // Display phase
    const timer2 = setTimeout(() => {
      if (!isLooping) return;
      setAnimationPhase("displaying");
    }, 2500);
    timeoutsRef.current.push(timer2);

    // Exit phase
    const timer3 = setTimeout(() => {
      if (!isLooping) return;
      setAnimationPhase("exiting");
    }, 4500);
    timeoutsRef.current.push(timer3);

    // Switch text and restart
    const timer4 = setTimeout(() => {
      if (!isLooping) return;
      setIsVisible(false);
      setCurrentTextIndex((prev) => (prev + 1) % texts.length);

      // Small delay before next cycle
      const timer5 = setTimeout(() => {
        if (!isLooping) return;
        startAnimationCycle();
      }, 500);
      timeoutsRef.current.push(timer5);
    }, 5500);
    timeoutsRef.current.push(timer4);
  };

  useEffect(() => {
    if (isLooping) {
      startAnimationCycle();
    } else {
      clearAllTimeouts();
      setIsVisible(false);
    }

    return () => {
      clearAllTimeouts();
    };
  }, [isLooping]);

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          key={currentTextIndex}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="relative"
        >
          <Link
            href={"/pricing"}
            className={`${user?.planColor} hover:underline cursor-pointer border-0 mx-4 text-sm text-white px-3 py-2 rounded transition-all duration-200 inline-flex items-center overflow-hidden`}
          >
            <motion.div
              variants={textVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="overflow-hidden whitespace-nowrap"
            >
              {texts[currentTextIndex]}
            </motion.div>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
