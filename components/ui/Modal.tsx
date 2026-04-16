"use client"

import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils/cn"

interface ModalProps {
  open: boolean
  onClose: () => void
  children: React.ReactNode
  className?: string
}

export function Modal({ open, onClose, children, className }: ModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className={cn(
              "fixed z-[201] top-1/2 left-1/2 w-[90vw] max-w-lg bg-surface border border-border rounded-2xl p-8 shadow-2xl",
              className
            )}
            initial={{ opacity: 0, y: 20, x: "-50%", top: "50%" }}
            animate={{ opacity: 1, y: "-50%", x: "-50%", top: "50%" }}
            exit={{ opacity: 0, y: 20, x: "-50%", top: "50%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
