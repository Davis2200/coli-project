"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface StepperProps {
  steps: string[];
  currentStep: number; // 0-indexed
}

export function RegistrationStepper({ steps, currentStep }: StepperProps) {
  return (
    <div className="w-full py-4 mb-4">
      <div className="flex items-center justify-between relative">
        {steps.map((step, index) => {
          const isActive = index === currentStep;
          const isCompleted = index < currentStep;

          return (
            <div key={index} className="flex flex-col items-center relative z-10">
              <motion.div
                initial={false}
                animate={{
                  backgroundColor: isActive || isCompleted ? "var(--color-primary)" : "rgba(255,255,255,0.1)",
                  borderColor: isActive || isCompleted ? "var(--color-primary)" : "rgba(255,255,255,0.2)",
                  color: isActive || isCompleted ? "#fff" : "rgba(255,255,255,0.5)",
                  scale: isActive ? 1.1 : 1,
                }}
                className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold text-sm transition-colors duration-300 ${
                  isActive || isCompleted
                    ? "bg-pink-600 border-pink-500 text-white shadow-[0_0_10px_rgba(228,0,124,0.5)]"
                    : "bg-white/5 border-white/20 text-muted-foreground"
                }`}
              >
                {isCompleted ? <Check className="w-4 h-4" /> : index + 1}
              </motion.div>
              <div className="absolute top-10 w-24 text-center">
                <span className={`text-xs font-medium transition-colors duration-300 ${isActive ? "text-pink-400" : "text-muted-foreground"}`}>
                  {step}
                </span>
              </div>
            </div>
          );
        })}

        {/* Background Track */}
        <div className="absolute top-4 left-0 w-full h-[2px] bg-white/10 -z-10" />
        
        {/* Active Track */}
        <motion.div
          className="absolute top-4 left-0 h-[2px] bg-gradient-to-r from-pink-600 to-purple-600 -z-10"
          initial={{ width: "0%" }}
          animate={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        />
      </div>
    </div>
  );
}
