/**
 * AccessGate.tsx
 *
 * Full-screen OTP auth gate that wraps the existing app.
 *
 * Props
 * ─────
 *   children   – Site content rendered once authenticated.
 *   enabled    – Pass false to keep the gate dormant (e.g. while loading).
 *                Defaults to true.
 *   onAuthed   – Optional callback fired when auth succeeds.
 *
 * Flow
 * ────
 *   1. On mount (or when `enabled` flips to true), check localStorage for a
 *      valid token via isTokenValid(). If found, optionally confirm with the
 *      /api/auth/me endpoint, then grant access.
 *   2. If the token is absent/expired, show the modal overlay:
 *        Step A → user enters email → POST /api/auth/request-code
 *        Step B → user enters 6-digit code → POST /api/auth/verify-code
 *              → on success: persist token and grant access
 *   3. A setTimeout auto-logs the user out when the token expires.
 */

import { useState, useEffect, useRef, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { requestCode, verifyCode, me } from "@/lib/authApi";
import {
  isTokenValid,
  getToken,
  getExpiresAt,
  setAuth,
  clearAuth,
} from "@/lib/authStorage";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type Step = "email" | "code";

interface AccessGateProps {
  children: ReactNode;
  /** When false the gate stays hidden; useful while a loading animation runs */
  enabled?: boolean;
  onAuthed?: () => void;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CODE_REGEX = /^\d{6}$/;

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export const AccessGate = ({
  children,
  enabled = true,
  onAuthed,
}: AccessGateProps) => {
  const [authed, setAuthed] = useState(false);
  const [checked, setChecked] = useState(false); // true once we've done the initial localStorage check

  // Modal state
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [codeSent, setCodeSent] = useState(false);

  // Expiry timer
  const expiryTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Helpers ───────────────────────────────────────────────────────────────

  /** Schedule the auto-logout at token expiry */
  const scheduleExpiry = (expiresAt: number) => {
    if (expiryTimerRef.current) clearTimeout(expiryTimerRef.current);
    const msUntilExpiry = expiresAt - Date.now();
    if (msUntilExpiry <= 0) {
      handleExpiry();
      return;
    }
    expiryTimerRef.current = setTimeout(handleExpiry, msUntilExpiry);
  };

  const handleExpiry = () => {
    clearAuth();
    setAuthed(false);
    setStep("email");
    setCode("");
    setCodeSent(false);
    setError(null);
  };

  const grantAccess = (expiresAt: number) => {
    scheduleExpiry(expiresAt);
    setAuthed(true);
    onAuthed?.();
  };

  // ── Initial token check (runs when `enabled` becomes true) ───────────────

  useEffect(() => {
    if (!enabled) return;

    const checkAuth = async () => {
      if (isTokenValid()) {
        const token = getToken()!;
        const expiresAt = getExpiresAt()!;
        // Optimistically grant access to avoid a white flash between loading
        // screen exit and server token confirmation.
        grantAccess(expiresAt);

        // Optional: confirm with the server
        try {
          const result = await me(token);
          if (!result.ok) {
            clearAuth();
            setAuthed(false);
            setChecked(true);
            return;
          }
        } catch {
          // If the /me endpoint is unreachable, trust the local token
        }
      }
      setChecked(true);
    };

    checkAuth();

    return () => {
      if (expiryTimerRef.current) clearTimeout(expiryTimerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled]);

  // ── Step A: Send code ─────────────────────────────────────────────────────

  const handleRequestCode = async () => {
    setError(null);
    if (!EMAIL_REGEX.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    try {
      const res = await requestCode(email);
      if (res.ok) {
        setCodeSent(true);
        setStep("code");
      } else {
        setError(res.error ?? "Failed to send code. Please try again.");
      }
    } catch (err) {
      setError((err as Error).message ?? "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  // ── Step B: Verify code ───────────────────────────────────────────────────

  const handleVerifyCode = async () => {
    setError(null);
    if (!CODE_REGEX.test(code)) {
      setError("Please enter the 6-digit code from your email.");
      return;
    }

    setLoading(true);
    try {
      const res = await verifyCode(email, code);
      console.log(res);
      if (res.ok && res.token && res.expiresAt) {
        // Normalise: backend may return an ISO date string or a ms number
        const expiresAtMs =
          typeof res.expiresAt === "string"
            ? new Date(res.expiresAt).getTime()
            : res.expiresAt;
        setAuth(res.token, expiresAtMs);
        grantAccess(expiresAtMs);
      } else {
        setError(res.error ?? "Invalid code. Please try again.");
      }
    } catch (err) {
      setError((err as Error).message ?? "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setError(null);
    setCode("");
    setLoading(true);
    try {
      const res = await requestCode(email);
      if (!res.ok) {
        setError(res.error ?? "Could not resend code. Please try again.");
      }
    } catch (err) {
      setError((err as Error).message ?? "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleChangeEmail = () => {
    setStep("email");
    setCode("");
    setError(null);
    setCodeSent(false);
  };

  // ── Key handler ───────────────────────────────────────────────────────────

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      if (step === "email" && !loading) handleRequestCode();
      if (step === "code" && !loading) handleVerifyCode();
    }
  };

  // ── Render ────────────────────────────────────────────────────────────────

  // SECURITY: children are only mounted when:
  //   a) gate is disabled (!enabled) — loading animation is still running, or
  //   b) user is genuinely authenticated (authed === true).
  // While blocking, children are absent from the DOM — DevTools CSS removal reveals nothing.
  return (
    <>
      {(!enabled || authed) && children}

      {/* Solid opaque cover during token-check & gate phases — sits below modal (z-9000) */}
      {enabled && !authed && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 8999,
            background: "#f8f9f5",
          }}
        />
      )}

      <AnimatePresence>
        {enabled && checked && !authed && (
          <motion.div
            key="auth-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed inset-0 z-[9000] flex items-center justify-center"
            style={{ backdropFilter: "blur(8px)", backgroundColor: "rgba(0,0,0,0.45)" }}
          >
            {/* Modal card */}
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.97 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="relative w-full max-w-md mx-4"
              style={{
                background: "rgba(255,255,255,0.97)",
                borderRadius: "1.25rem",
                boxShadow:
                  "0 8px 40px 0 rgba(28,59,43,0.22), 0 2px 8px 0 rgba(28,59,43,0.10)",
                padding: "2.5rem 2.25rem 2rem",
              }}
              onKeyDown={handleKeyDown}
            >
              {/* Brand mark */}
              <div className="mb-6 flex items-center gap-2">
                <span
                  style={{
                    fontFamily: "\"Times New Roman\", Times, serif",
                    fontWeight: 900,
                    color: "#b3872f",
                    fontSize: "1.35rem",
                    letterSpacing: "-0.03em",
                    textTransform: "uppercase",
                  }}
                >
                  3
                  <sup
                    style={{
                      fontSize: "0.5em",
                      verticalAlign: "super",
                      lineHeight: 1,
                      textTransform: "lowercase",
                      color: "#b3872f",
                    }}
                  >
                    rd
                  </sup>
                </span>
                <span
                  style={{
                    fontFamily: "\"Times New Roman\", Times, serif",
                    fontWeight: 900,
                    color: "#496255",
                    fontSize: "1.15rem",
                    letterSpacing: "-0.03em",
                    textTransform: "none",
                  }}
                >
                  Harvest
                </span>
              </div>

              {/* ── STEP A: Email ───────────────────────────── */}
              {step === "email" && (
                <>
                  <h2
                    style={{
                      color: "#1c3b2b",
                      fontSize: "1.35rem",
                      fontWeight: 700,
                      marginBottom: "0.35rem",
                      lineHeight: 1.25,
                    }}
                  >
                    Email Authentication required
                  </h2>
                  <p
                    style={{
                      color: "#888",
                      fontSize: "0.9rem",
                      marginBottom: "1.5rem",
                      lineHeight: 1.55,
                    }}
                  >
                    Enter your email address and we'll send you a one-time
                    access code.
                  </p>

                  <label
                    htmlFor="ag-email"
                    style={{
                      display: "block",
                      fontSize: "0.8rem",
                      fontWeight: 600,
                      color: "#1c3b2b",
                      marginBottom: "0.4rem",
                      letterSpacing: "0.04em",
                      textTransform: "uppercase",
                    }}
                  >
                    Email address
                  </label>
                  <input
                    id="ag-email"
                    type="email"
                    autoFocus
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError(null);
                    }}
                    disabled={loading}
                    style={inputStyle}
                  />

                  {error && <ErrorMessage message={error} />}

                  <button
                    id="ag-send-code-btn"
                    onClick={handleRequestCode}
                    disabled={loading || !email.trim()}
                    style={primaryBtnStyle(loading || !email.trim())}
                  >
                    {loading ? <Spinner /> : "Send code"}
                  </button>
                </>
              )}

              {/* ── STEP B: Code ────────────────────────────── */}
              {step === "code" && (
                <>
                  <h2
                    style={{
                      color: "#1c3b2b",
                      fontSize: "1.35rem",
                      fontWeight: 700,
                      marginBottom: "0.35rem",
                      lineHeight: 1.25,
                    }}
                  >
                    Check your inbox
                  </h2>
                  <p
                    style={{
                      color: "#888",
                      fontSize: "0.9rem",
                      marginBottom: "1.5rem",
                      lineHeight: 1.55,
                    }}
                  >
                    We sent a 6-digit code to{" "}
                    <strong style={{ color: "#1c3b2b" }}>{email}</strong>. Enter
                    it below to continue.
                  </p>

                  <label
                    htmlFor="ag-code"
                    style={{
                      display: "block",
                      fontSize: "0.8rem",
                      fontWeight: 600,
                      color: "#1c3b2b",
                      marginBottom: "0.4rem",
                      letterSpacing: "0.04em",
                      textTransform: "uppercase",
                    }}
                  >
                    One-time code
                  </label>
                  <input
                    id="ag-code"
                    type="text"
                    inputMode="numeric"
                    autoFocus
                    autoComplete="one-time-code"
                    placeholder="123456"
                    maxLength={6}
                    value={code}
                    onChange={(e) => {
                      setCode(e.target.value.replace(/\D/g, "").slice(0, 6));
                      setError(null);
                    }}
                    disabled={loading}
                    style={{ ...inputStyle, letterSpacing: "0.25em", fontSize: "1.25rem" }}
                  />

                  {error && <ErrorMessage message={error} />}

                  <button
                    id="ag-verify-btn"
                    onClick={handleVerifyCode}
                    disabled={loading || code.length < 6}
                    style={primaryBtnStyle(loading || code.length < 6)}
                  >
                    {loading ? <Spinner /> : "Verify & Enter"}
                  </button>

                  {/* Secondary actions */}
                  <div
                    style={{
                      display: "flex",
                      gap: "0.75rem",
                      marginTop: "0.75rem",
                    }}
                  >
                    <button
                      id="ag-resend-btn"
                      onClick={handleResend}
                      disabled={loading}
                      style={outlineBtnStyle(loading)}
                    >
                      Resend code
                    </button>
                    <button
                      id="ag-change-email-btn"
                      onClick={handleChangeEmail}
                      disabled={loading}
                      style={outlineBtnStyle(loading)}
                    >
                      Change email
                    </button>
                  </div>
                </>
              )}

              {/* Decorative bottom accent */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: "2.25rem",
                  right: "2.25rem",
                  height: "2px",
                  background:
                    "linear-gradient(90deg, #d4a858 0%, #1c3b2b 100%)",
                  borderRadius: "0 0 1.25rem 1.25rem",
                  opacity: 0.75,
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// ---------------------------------------------------------------------------
// Sub-components & style helpers
// ---------------------------------------------------------------------------

const ErrorMessage = ({ message }: { message: string }) => (
  <motion.p
    initial={{ opacity: 0, y: -4 }}
    animate={{ opacity: 1, y: 0 }}
    style={{
      color: "#c0392b",
      fontSize: "0.82rem",
      marginTop: "0.5rem",
      marginBottom: "0.25rem",
      display: "flex",
      alignItems: "center",
      gap: "0.35rem",
    }}
  >
    <span aria-hidden>⚠</span> {message}
  </motion.p>
);

const Spinner = () => (
  <span
    style={{
      display: "inline-block",
      width: "1rem",
      height: "1rem",
      border: "2px solid rgba(255,255,255,0.35)",
      borderTopColor: "white",
      borderRadius: "50%",
      animation: "ag-spin 0.7s linear infinite",
    }}
  />
);

// ── Style objects ────────────────────────────────────────────────────────────

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.65rem 0.9rem",
  borderRadius: "0.6rem",
  border: "1.5px solid #dce5df",
  outline: "none",
  fontSize: "0.95rem",
  fontFamily: "var(--font-sans)",
  color: "#1c3b2b",
  background: "#f8f9f5",
  transition: "border-color 0.2s",
  boxSizing: "border-box",
  marginBottom: "0.25rem",
};

const primaryBtnStyle = (disabled: boolean): React.CSSProperties => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "0.5rem",
  width: "100%",
  marginTop: "1rem",
  padding: "0.75rem 1.25rem",
  borderRadius: "0.7rem",
  border: "none",
  background: disabled
    ? "#b7c9be"
    : "linear-gradient(135deg, #1c3b2b 0%, #2e5e43 100%)",
  color: "white",
  fontWeight: 700,
  fontSize: "0.95rem",
  fontFamily: "var(--font-sans)",
  cursor: disabled ? "not-allowed" : "pointer",
  transition: "opacity 0.2s, transform 0.15s",
  transform: disabled ? "none" : undefined,
  letterSpacing: "0.02em",
});

const outlineBtnStyle = (disabled: boolean): React.CSSProperties => ({
  flex: 1,
  padding: "0.6rem 0.75rem",
  borderRadius: "0.6rem",
  border: "1.5px solid #1c3b2b33",
  background: "transparent",
  color: "#1c3b2b",
  fontWeight: 600,
  fontSize: "0.82rem",
  fontFamily: "var(--font-sans)",
  cursor: disabled ? "not-allowed" : "pointer",
  opacity: disabled ? 0.5 : 1,
  transition: "border-color 0.2s, background 0.2s",
  letterSpacing: "0.01em",
});

// Inject the spinner keyframe once (avoids importing a CSS file)
if (typeof document !== "undefined") {
  const styleId = "ag-spinner-style";
  if (!document.getElementById(styleId)) {
    const s = document.createElement("style");
    s.id = styleId;
    s.textContent = `@keyframes ag-spin { to { transform: rotate(360deg); } }`;
    document.head.appendChild(s);
  }
}
