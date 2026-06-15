/**
 * AccessGate.tsx
 *
 * Full-screen two-step auth gate: email/password login → OTP verification.
 * Session token persisted in localStorage until expiry.
 */

import { useState, useEffect, useRef, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import { login, verifyOtp } from "@/lib/authApi";
import {
    isTokenValid,
    getExpiresAt,
    setAuth,
    clearAuth,
} from "@/lib/authStorage";

type Step = "login" | "otp";

interface AccessGateProps {
    children: ReactNode;
    enabled?: boolean;
    onAuthed?: () => void;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CODE_REGEX = /^\d{6}$/;

export const AccessGate = ({
    children,
    enabled = true,
    onAuthed,
}: AccessGateProps) => {
    const [authed, setAuthed] = useState(false);
    const [checked, setChecked] = useState(false);

    const [step, setStep] = useState<Step>("login");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [code, setCode] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const expiryTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const handleExpiry = () => {
        clearAuth();
        setAuthed(false);
        setStep("login");
        setPassword("");
        setCode("");
        setError(null);
    };

    const scheduleExpiry = (expiresAt: number) => {
        if (expiryTimerRef.current) clearTimeout(expiryTimerRef.current);
        const msUntilExpiry = expiresAt - Date.now();
        if (msUntilExpiry <= 0) {
            handleExpiry();
            return;
        }
        expiryTimerRef.current = setTimeout(handleExpiry, msUntilExpiry);
    };

    const grantAccess = (expiresAt: number) => {
        scheduleExpiry(expiresAt);
        setAuthed(true);
        onAuthed?.();
    };

    useEffect(() => {
        if (!enabled) return;

        if (isTokenValid()) {
            grantAccess(getExpiresAt()!);
        }
        setChecked(true);

        return () => {
            if (expiryTimerRef.current) clearTimeout(expiryTimerRef.current);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [enabled]);

    const handleLogin = async () => {
        setError(null);
        const normalizedEmail = email.trim();
        if (!EMAIL_REGEX.test(normalizedEmail)) {
            setError("Please enter a valid email address.");
            return;
        }
        if (!password) {
            setError("Password is required.");
            return;
        }

        setLoading(true);
        try {
            const res = await login(normalizedEmail, password);
            if (res.ok) {
                setEmail(normalizedEmail);
                setStep("otp");
                setCode("");
            } else {
                setError(res.error ?? "Invalid credentials.");
            }
        } catch (err) {
            setError((err as Error).message ?? "Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOtp = async () => {
        setError(null);
        if (!CODE_REGEX.test(code)) {
            setError("Please enter the 6-digit code from your email.");
            return;
        }

        setLoading(true);
        try {
            const res = await verifyOtp(email, code);
            if (res.ok && res.token && res.expiresAt) {
                clearAuth();
                setAuth(res.token, res.expiresAt);
                grantAccess(res.expiresAt);
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
        if (!password) {
            setError("Please go back and sign in again to resend the code.");
            return;
        }
        setLoading(true);
        try {
            const res = await login(email, password);
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
        setStep("login");
        setCode("");
        setError(null);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key !== "Enter" || loading) return;
        if (step === "login") handleLogin();
        if (step === "otp") handleVerifyOtp();
    };

    return (
        <>
            {(!enabled || authed) && children}

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
                            <div className="mb-6 flex items-center gap-2">
                                <span style={brandGoldStyle}>3RD</span>
                                <span style={brandGreenStyle}>HARVEST</span>
                            </div>

                            {step === "login" && (
                                <>
                                    <h2 style={titleStyle}>Sign in to continue</h2>
                                    <p style={subtitleStyle}>
                                        Enter your email and password. We&apos;ll send a one-time code to your inbox.
                                    </p>

                                    <label htmlFor="ag-email" style={labelStyle}>Email address</label>
                                    <input
                                        id="ag-email"
                                        type="email"
                                        autoFocus
                                        autoComplete="email"
                                        placeholder="you@example.com"
                                        value={email}
                                        onChange={(e) => { setEmail(e.target.value); setError(null); }}
                                        disabled={loading}
                                        style={inputStyle}
                                    />

                                    <label htmlFor="ag-password" style={{ ...labelStyle, marginTop: "0.75rem" }}>Password</label>
                                    <div style={{ position: "relative" }}>
                                        <input
                                            id="ag-password"
                                            type={showPassword ? "text" : "password"}
                                            autoComplete="current-password"
                                            placeholder="••••••••"
                                            value={password}
                                            onChange={(e) => { setPassword(e.target.value); setError(null); }}
                                            disabled={loading}
                                            style={{ ...inputStyle, paddingRight: "2.8rem" }}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            style={eyeBtnStyle}
                                        >
                                            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                        </button>
                                    </div>

                                    {error && <ErrorMessage message={error} />}

                                    <button
                                        id="ag-login-btn"
                                        onClick={handleLogin}
                                        disabled={loading || !email.trim() || !password}
                                        style={primaryBtnStyle(loading || !email.trim() || !password)}
                                    >
                                        {loading ? <Spinner /> : "Continue"}
                                    </button>
                                </>
                            )}

                            {step === "otp" && (
                                <>
                                    <h2 style={titleStyle}>Check your inbox</h2>
                                    <p style={subtitleStyle}>
                                        We sent a 6-digit code to{" "}
                                        <strong style={{ color: "#1c3b2b" }}>{email}</strong>. Enter it below to continue.
                                    </p>

                                    <label htmlFor="ag-code" style={labelStyle}>One-time code</label>
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
                                        onClick={handleVerifyOtp}
                                        disabled={loading || code.length < 6}
                                        style={primaryBtnStyle(loading || code.length < 6)}
                                    >
                                        {loading ? <Spinner /> : "Verify & Enter"}
                                    </button>

                                    <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.75rem" }}>
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
                                            Back to sign in
                                        </button>
                                    </div>
                                </>
                            )}

                            <div
                                style={{
                                    position: "absolute",
                                    bottom: 0,
                                    left: "2.25rem",
                                    right: "2.25rem",
                                    height: "2px",
                                    background: "linear-gradient(90deg, #d4a858 0%, #1c3b2b 100%)",
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

const brandGoldStyle: React.CSSProperties = {
    fontFamily: "var(--font-serif)",
    fontWeight: 900,
    color: "#d4a858",
    fontSize: "1.15rem",
    letterSpacing: "-0.03em",
    textTransform: "uppercase",
};

const brandGreenStyle: React.CSSProperties = {
    fontFamily: "var(--font-serif)",
    fontWeight: 900,
    color: "#1c3b2b",
    fontSize: "1.15rem",
    letterSpacing: "-0.03em",
    textTransform: "uppercase",
};

const titleStyle: React.CSSProperties = {
    color: "#1c3b2b",
    fontSize: "1.35rem",
    fontWeight: 700,
    marginBottom: "0.35rem",
    lineHeight: 1.25,
};

const subtitleStyle: React.CSSProperties = {
    color: "#888",
    fontSize: "0.9rem",
    marginBottom: "1.5rem",
    lineHeight: 1.55,
};

const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: "0.8rem",
    fontWeight: 600,
    color: "#1c3b2b",
    marginBottom: "0.4rem",
    letterSpacing: "0.04em",
    textTransform: "uppercase",
};

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

const eyeBtnStyle: React.CSSProperties = {
    position: "absolute",
    right: "0.8rem",
    top: "50%",
    transform: "translateY(-50%)",
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "#888",
    padding: "0.2rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
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
    letterSpacing: "0.01em",
});

if (typeof document !== "undefined") {
    const styleId = "ag-spinner-style";
    if (!document.getElementById(styleId)) {
        const s = document.createElement("style");
        s.id = styleId;
        s.textContent = `@keyframes ag-spin { to { transform: rotate(360deg); } }`;
        document.head.appendChild(s);
    }
}
