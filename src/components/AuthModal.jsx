import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const AuthModal = ({ isOpen, onClose, initialTab = "login" }) => {
  const [tab, setTab] = useState(initialTab);
  const overlayRef = useRef(null);
  const firstInputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTab(initialTab);
      setTimeout(() => firstInputRef.current?.focus(), 80);
    }
  }, [isOpen, initialTab]);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    isOpen && document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={overlayRef}
          onMouseDown={handleOverlayClick}
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

          {/* Modal */}
          <motion.div
            role="dialog"
            aria-modal="true"
            initial={{ y: 40, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 40, opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#6819ce] to-[#8f5bff] text-white px-6 py-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-11 w-11 rounded-full bg-white/20 flex items-center justify-center font-bold text-lg">
                    🎸
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Great Host Music</h3>
                    <p className="text-sm text-white/80">
                      Access your personal space
                    </p>
                  </div>
                </div>

                <button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-white/10 transition"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="px-6 py-6">
              {/* Tabs */}
              <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
                {["login", "signup"].map((t) => (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    className={`flex-1 py-2 rounded-lg text-sm font-medium transition ${
                      tab === t
                        ? "bg-white shadow text-[#6819ce]"
                        : "text-gray-500"
                    }`}
                  >
                    {t === "login" ? "Log in" : "Sign up"}
                  </button>
                ))}
              </div>

              {/* Forms */}
              {tab === "login" ? (
                <form className="space-y-4">
                  <Input
                    ref={firstInputRef}
                    label="Email address"
                    type="email"
                    placeholder="e.g. music@email.com"
                  />
                  <Input label="Password" type="password" />

                  <button className="w-full mt-2 bg-[#6819ce] hover:bg-[#5b14b0] text-white py-3 rounded-xl font-semibold transition">
                    Log in
                  </button>

                  <p className="text-sm text-center text-gray-500">
                    Don&apos;t have an account yet?{" "}
                    <button
                      type="button"
                      onClick={() => setTab("signup")}
                      className="text-[#6819ce] font-medium"
                    >
                      Sign up
                    </button>
                  </p>
                </form>
              ) : (
                <form className="space-y-4">
                  <Input
                    ref={firstInputRef}
                    label="Full name"
                    placeholder="Your name"
                  />
                  <Input label="Email address" type="email" />
                  <Input label="Password" type="password" />
                  <Input label="Confirm password" type="password" />

                  <button className="w-full mt-2 bg-[#6819ce] hover:bg-[#5b14b0] text-white py-3 rounded-xl font-semibold transition">
                    Create my account
                  </button>

                  <p className="text-sm text-center text-gray-500">
                    Already registered?{" "}
                    <button
                      type="button"
                      onClick={() => setTab("login")}
                      className="text-[#6819ce] font-medium"
                    >
                      Log in
                    </button>
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/* Reusable Input */
const Input = React.forwardRef(({ label, ...props }, ref) => (
  <div>
    <label className="text-sm text-gray-600">{label}</label>
    <input
      ref={ref}
      {...props}
      className="mt-1 w-full px-4 py-3 rounded-xl bg-gray-100 border border-transparent focus:border-[#6819ce] focus:ring-2 focus:ring-[#6819ce]/20 outline-none transition"
    />
  </div>
));

export default AuthModal;
