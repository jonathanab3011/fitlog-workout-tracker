'use client';

import { useState, useEffect } from "react";
import { CheckCircle2, X } from "lucide-react";

export interface ToastItem {
  id: string;
  message: string;
  isExiting?: boolean;
}

// Global helper function to trigger toast from anywhere in the app
export function showToast(message: string) {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("fitlog-toast", { detail: message }));
  }
}

export default function GlobalToast() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const removeToast = (id: string) => {
    setToasts((prev) =>
      prev.map((t) => (t.id === id ? { ...t, isExiting: true } : t))
    );

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 300);
  };

  useEffect(() => {
    const handleToastEvent = (event: Event) => {
      const customEvent = event as CustomEvent<string>;
      const newMessage = customEvent.detail;
      if (!newMessage) return;

      const id = `${Date.now()}-${Math.random()}`;

      setToasts((prev) => [...prev, { id, message: newMessage, isExiting: false }]);

      setTimeout(() => {
        removeToast(id);
      }, 3500);
    };

    window.addEventListener("fitlog-toast", handleToastEvent);
    return () => window.removeEventListener("fitlog-toast", handleToastEvent);
  }, []);

  if (toasts.length === 0) return null;

  return (
    <>
      <style jsx global>{`
        @keyframes bounceSlideInRight {
          0% {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          60% {
            opacity: 1;
            transform: translateY(-4px) scale(1.02);
          }
          80% {
            transform: translateY(2px) scale(0.99);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes idleSubtleBounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-3px);
          }
        }

        @keyframes slideOutRight {
          0% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
          100% {
            opacity: 0;
            transform: translateY(20px) scale(0.9);
          }
        }

        .toast-enter-bounce {
          animation: 
            bounceSlideInRight 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards,
            idleSubtleBounce 2s ease-in-out infinite 0.4s;
        }

        .toast-exit-slide {
          animation: slideOutRight 0.3s ease-in forwards !important;
        }
      `}</style>

      {/* Container: Responsive positioning for mobile & desktop */}
      <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 z-50 flex flex-col gap-2 sm:max-w-sm w-auto pointer-events-none p-1 sm:p-2 overflow-hidden">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto bg-[#ccff00] text-black font-black px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-2xl shadow-2xl flex items-center justify-between gap-2.5 sm:gap-3 border border-black/10 transition-all ${
              toast.isExiting ? "toast-exit-slide" : "toast-enter-bounce"
            }`}
          >
            <div className="flex items-center gap-2 sm:gap-2.5 text-xs tracking-tight">
              <CheckCircle2 className="w-4 h-4 text-black shrink-0" />
              <span className="line-clamp-2">{toast.message}</span>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="p-1 hover:bg-black/10 rounded-full transition-colors cursor-pointer shrink-0"
            >
              <X className="w-3.5 h-3.5 text-black" />
            </button>
          </div>
        ))}
      </div>
    </>
  );
}