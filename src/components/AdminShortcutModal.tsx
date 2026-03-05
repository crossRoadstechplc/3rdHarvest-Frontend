/**
 * AdminShortcutModal.tsx
 *
 * Keyboard shortcut: Ctrl + Shift + 3 (Windows/Linux) or Cmd + Shift + 3 (Mac)
 *
 * Steps:
 *   1. Password screen  – POST /api/admin/login
 *   2. Emails screen    – GET  /api/auth/verified-emails
 *
 * The component is self-contained: registers its own keydown listener and
 * manages its own token state independently from the user-facing auth gate.
 */

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { adminLogin, fetchAdminEmails } from "@/lib/adminApi";
import {
    isAdminTokenValid,
    getAdminToken,
    setAdminAuth,
    clearAdminAuth,
} from "@/lib/adminStorage";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type Step = "password" | "emails";

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export const AdminShortcutModal = () => {
    const [open, setOpen] = useState(false);
    const [step, setStep] = useState<Step>("password");

    // Password step
    const [password, setPassword] = useState("");
    const [loginLoading, setLoginLoading] = useState(false);
    const [loginError, setLoginError] = useState<string | null>(null);

    // Emails step
    const [emails, setEmails] = useState<string[]>([]);
    const [emailsLoading, setEmailsLoading] = useState(false);
    const [emailsError, setEmailsError] = useState<string | null>(null);
    const [search, setSearch] = useState("");
    const [copied, setCopied] = useState(false);

    const overlayRef = useRef<HTMLDivElement>(null);

    // ── Derived ───────────────────────────────────────────────────────────────

    const filtered = emails.filter((e) =>
        e.toLowerCase().includes(search.toLowerCase())
    );

    // ── Keyboard shortcut ─────────────────────────────────────────────────────

    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            const modifier = e.ctrlKey || e.metaKey; // Ctrl on Win/Linux, Cmd on Mac
            // Use e.code (physical key) not e.key — Shift+3 changes e.key to "#"
            if (modifier && e.shiftKey && e.code === "Digit3") {
                e.preventDefault();
                setOpen((prev) => !prev);
            }
        };
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, []);

    // ── When modal opens: decide which step to show ───────────────────────────

    useEffect(() => {
        if (!open) return;

        if (isAdminTokenValid()) {
            setStep("emails");
            loadEmails(getAdminToken()!);
        } else {
            clearAdminAuth();
            setStep("password");
            setPassword("");
            setLoginError(null);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open]);

    // ── Close helpers ─────────────────────────────────────────────────────────

    const closeModal = useCallback(() => {
        setOpen(false);
        setSearch("");
        setCopied(false);
    }, []);

    const handleOverlayClick = (e: React.MouseEvent) => {
        if (e.target === overlayRef.current) closeModal();
    };

    // Esc key
    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") closeModal();
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [open, closeModal]);

    // ── Step 1: Login ─────────────────────────────────────────────────────────

    const handleLogin = async () => {
        setLoginError(null);
        if (!password.trim()) {
            setLoginError("Password is required.");
            return;
        }
        setLoginLoading(true);
        try {
            const res = await adminLogin(password);
            if (res.ok && res.token && res.expiresAt) {
                setAdminAuth(res.token, res.expiresAt);
                setStep("emails");
                loadEmails(res.token);
            } else {
                setLoginError(res.error ?? "Incorrect password.");
            }
        } catch (err) {
            setLoginError((err as Error).message ?? "Something went wrong.");
        } finally {
            setLoginLoading(false);
        }
    };

    // ── Step 2: Emails ────────────────────────────────────────────────────────

    const loadEmails = async (token: string) => {
        setEmailsLoading(true);
        setEmailsError(null);
        try {
            const res = await fetchAdminEmails(token);
            if (res.ok && res.emails) {
                setEmails(res.emails);
            } else if (!res.ok) {
                // 401 or explicit error → kick back to password step
                clearAdminAuth();
                setStep("password");
                setLoginError("Session expired. Please log in again.");
            } else {
                setEmailsError(res.error ?? "Failed to load emails.");
            }
        } catch (err) {
            setEmailsError((err as Error).message ?? "Something went wrong.");
        } finally {
            setEmailsLoading(false);
        }
    };

    const handleRefresh = () => {
        const token = getAdminToken();
        if (!token || !isAdminTokenValid()) {
            clearAdminAuth();
            setStep("password");
            return;
        }
        loadEmails(token);
    };

    const handleCopy = async () => {
        await navigator.clipboard.writeText(filtered.join("\n"));
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleExportTxt = () => {
        const blob = new Blob([filtered.join("\n")], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "verified-emails.txt";
        a.click();
        URL.revokeObjectURL(url);
    };

    const handleExportCsv = () => {
        const blob = new Blob(["email\n" + filtered.join("\n")], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "verified-emails.csv";
        a.click();
        URL.revokeObjectURL(url);
    };

    const handleLogout = () => {
        clearAdminAuth();
        setStep("password");
        setPassword("");
        setEmails([]);
        setSearch("");
        setLoginError(null);
    };

    // ── Render ────────────────────────────────────────────────────────────────

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    ref={overlayRef}
                    key="admin-overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    onClick={handleOverlayClick}
                    style={{
                        position: "fixed",
                        inset: 0,
                        zIndex: 9500,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backdropFilter: "blur(8px)",
                        backgroundColor: "rgba(0,0,0,0.5)",
                        padding: "1rem",
                    }}
                >
                    <motion.div
                        key={step}
                        initial={{ opacity: 0, y: 20, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -12, scale: 0.97 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        style={{
                            width: "100%",
                            maxWidth: step === "emails" ? "560px" : "420px",
                            background: "rgba(255,255,255,0.98)",
                            borderRadius: "1.25rem",
                            boxShadow:
                                "0 8px 48px 0 rgba(28,59,43,0.22), 0 2px 8px 0 rgba(28,59,43,0.10)",
                            overflow: "hidden",
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        {/* ── Header ─────────────────────────────────── */}
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                padding: "1.25rem 1.5rem 1rem",
                                borderBottom: "1px solid #e8eee9",
                            }}
                        >
                            <div>
                                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                                    {/* Shield icon */}
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1c3b2b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                    </svg>
                                    <h2
                                        style={{
                                            fontFamily: "var(--font-serif)",
                                            fontWeight: 800,
                                            fontSize: "1.1rem",
                                            color: "#1c3b2b",
                                            margin: 0,
                                            letterSpacing: "-0.02em",
                                        }}
                                    >
                                        Admin
                                    </h2>
                                </div>
                                <p style={{ fontSize: "0.72rem", color: "#aaa", margin: "2px 0 0", letterSpacing: "0.03em" }}>
                                    Ctrl + Shift + 3
                                </p>
                            </div>

                            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                                {step === "emails" && (
                                    <button
                                        onClick={handleLogout}
                                        title="Log out"
                                        style={ghostBtnStyle}
                                    >
                                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                                            <polyline points="16 17 21 12 16 7" />
                                            <line x1="21" y1="12" x2="9" y2="12" />
                                        </svg>
                                    </button>
                                )}
                                <button
                                    id="admin-modal-close"
                                    onClick={closeModal}
                                    title="Close"
                                    style={ghostBtnStyle}
                                >
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                                        <line x1="18" y1="6" x2="6" y2="18" />
                                        <line x1="6" y1="6" x2="18" y2="18" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* ── Body ───────────────────────────────────── */}
                        <div style={{ padding: "1.25rem 1.5rem 1.5rem" }}>

                            {/* STEP 1: Password */}
                            {step === "password" && (
                                <div>
                                    <p style={{ fontSize: "0.875rem", color: "#666", marginBottom: "1.25rem", lineHeight: 1.5 }}>
                                        Enter the admin password to unlock the dashboard.
                                    </p>

                                    <label style={labelStyle} htmlFor="admin-password">Password</label>
                                    <input
                                        id="admin-password"
                                        type="password"
                                        autoFocus
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => { setPassword(e.target.value); setLoginError(null); }}
                                        onKeyDown={(e) => { if (e.key === "Enter" && !loginLoading) handleLogin(); }}
                                        disabled={loginLoading}
                                        style={inputStyle}
                                    />

                                    {loginError && (
                                        <motion.p
                                            initial={{ opacity: 0, y: -4 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            style={errorStyle}
                                        >
                                            <span>⚠</span> {loginError}
                                        </motion.p>
                                    )}

                                    <button
                                        id="admin-unlock-btn"
                                        onClick={handleLogin}
                                        disabled={loginLoading || !password.trim()}
                                        style={primaryBtnStyle(loginLoading || !password.trim())}
                                    >
                                        {loginLoading ? <Spinner /> : (
                                            <>
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                                                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                                </svg>
                                                Unlock
                                            </>
                                        )}
                                    </button>
                                </div>
                            )}

                            {/* STEP 2: Emails */}
                            {step === "emails" && (
                                <div>
                                    {/* Search + action row */}
                                    <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.75rem", alignItems: "center" }}>
                                        <div style={{ position: "relative", flex: 1 }}>
                                            <svg
                                                width="14" height="14"
                                                viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2" strokeLinecap="round"
                                                style={{ position: "absolute", left: "0.7rem", top: "50%", transform: "translateY(-50%)" }}
                                            >
                                                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                                            </svg>
                                            <input
                                                id="admin-search"
                                                type="text"
                                                placeholder="Search emails…"
                                                value={search}
                                                onChange={(e) => setSearch(e.target.value)}
                                                style={{ ...inputStyle, paddingLeft: "2.1rem", marginBottom: 0 }}
                                            />
                                        </div>

                                        <ActionBtn onClick={handleRefresh} title="Refresh" disabled={emailsLoading}>
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                                                <polyline points="23 4 23 10 17 10" /><polyline points="1 20 1 14 7 14" />
                                                <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
                                            </svg>
                                        </ActionBtn>

                                        <ActionBtn onClick={handleCopy} title={copied ? "Copied!" : "Copy all"} disabled={filtered.length === 0}>
                                            {copied ? (
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1c3b2b" strokeWidth="2.5" strokeLinecap="round">
                                                    <polyline points="20 6 9 17 4 12" />
                                                </svg>
                                            ) : (
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                                                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                                                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                                                </svg>
                                            )}
                                        </ActionBtn>

                                        <ActionBtn onClick={handleExportTxt} title="Export .txt" disabled={filtered.length === 0}>
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                                <polyline points="7 10 12 15 17 10" />
                                                <line x1="12" y1="15" x2="12" y2="3" />
                                            </svg>
                                        </ActionBtn>

                                        <ActionBtn onClick={handleExportCsv} title="Export .csv" disabled={filtered.length === 0}>
                                            <span style={{ fontSize: "0.65rem", fontWeight: 700, color: "currentColor", letterSpacing: "-0.03em" }}>CSV</span>
                                        </ActionBtn>
                                    </div>

                                    {/* Count badge */}
                                    <div style={{ marginBottom: "0.5rem", display: "flex", alignItems: "center", gap: "0.4rem" }}>
                                        <span style={{
                                            fontSize: "0.72rem",
                                            fontWeight: 700,
                                            background: "#e8f0ec",
                                            color: "#1c3b2b",
                                            borderRadius: "999px",
                                            padding: "2px 10px",
                                            letterSpacing: "0.02em",
                                        }}>
                                            {emailsLoading ? "…" : `${filtered.length} ${filtered.length === 1 ? "email" : "emails"}`}
                                        </span>
                                        {search && (
                                            <span style={{ fontSize: "0.72rem", color: "#aaa" }}>
                                                filtered from {emails.length}
                                            </span>
                                        )}
                                    </div>

                                    {/* List */}
                                    <div
                                        style={{
                                            maxHeight: "50vh",
                                            overflowY: "auto",
                                            border: "1px solid #e8eee9",
                                            borderRadius: "0.65rem",
                                            background: "#f8f9f5",
                                        }}
                                    >
                                        {emailsLoading ? (
                                            <div style={{ padding: "2rem", textAlign: "center" }}>
                                                <Spinner color="#1c3b2b" />
                                            </div>
                                        ) : emailsError ? (
                                            <div style={{ padding: "1.5rem", textAlign: "center", color: "#c0392b", fontSize: "0.85rem" }}>
                                                ⚠ {emailsError}
                                            </div>
                                        ) : filtered.length === 0 ? (
                                            <div style={{ padding: "1.5rem", textAlign: "center", color: "#aaa", fontSize: "0.85rem" }}>
                                                {search ? "No emails match your search." : "No verified emails yet."}
                                            </div>
                                        ) : (
                                            <ul style={{ listStyle: "none", margin: 0, padding: "0.25rem 0" }}>
                                                {filtered.map((email, i) => (
                                                    <li
                                                        key={email}
                                                        style={{
                                                            display: "flex",
                                                            alignItems: "center",
                                                            gap: "0.6rem",
                                                            padding: "0.5rem 0.85rem",
                                                            borderBottom: i < filtered.length - 1 ? "1px solid #e8eee9" : "none",
                                                            fontSize: "0.85rem",
                                                            color: "#2d4a38",
                                                            fontFamily: "monospace",
                                                            letterSpacing: "0.01em",
                                                        }}
                                                    >
                                                        <span style={{
                                                            width: "6px", height: "6px", borderRadius: "50%",
                                                            background: "#d4a858", flexShrink: 0,
                                                        }} />
                                                        {email}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Decorative bottom accent */}
                        <div
                            style={{
                                height: "3px",
                                background: "linear-gradient(90deg, #d4a858 0%, #1c3b2b 100%)",
                                flexShrink: 0,
                            }}
                        />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

// ---------------------------------------------------------------------------
// Sub-components & style helpers
// ---------------------------------------------------------------------------

const ActionBtn = ({
    children,
    onClick,
    title,
    disabled,
}: {
    children: React.ReactNode;
    onClick: () => void;
    title?: string;
    disabled?: boolean;
}) => (
    <button
        onClick={onClick}
        title={title}
        disabled={disabled}
        style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "34px",
            height: "34px",
            borderRadius: "0.5rem",
            border: "1.5px solid #dce5df",
            background: "white",
            color: "#1c3b2b",
            cursor: disabled ? "not-allowed" : "pointer",
            opacity: disabled ? 0.4 : 1,
            flexShrink: 0,
            transition: "background 0.15s, border-color 0.15s",
        }}
    >
        {children}
    </button>
);

const Spinner = ({ color = "white" }: { color?: string }) => (
    <span
        style={{
            display: "inline-block",
            width: "1rem",
            height: "1rem",
            border: `2px solid ${color === "white" ? "rgba(255,255,255,0.35)" : "#c8d8cc"}`,
            borderTopColor: color,
            borderRadius: "50%",
            animation: "ag-spin 0.7s linear infinite",
        }}
    />
);

const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: "0.75rem",
    fontWeight: 700,
    color: "#1c3b2b",
    marginBottom: "0.4rem",
    letterSpacing: "0.05em",
    textTransform: "uppercase",
};

const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "0.65rem 0.9rem",
    borderRadius: "0.6rem",
    border: "1.5px solid #dce5df",
    outline: "none",
    fontSize: "0.9rem",
    fontFamily: "var(--font-sans)",
    color: "#1c3b2b",
    background: "#fff",
    transition: "border-color 0.2s",
    boxSizing: "border-box",
    marginBottom: "0.25rem",
};

const primaryBtnStyle = (disabled: boolean): React.CSSProperties => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.45rem",
    width: "100%",
    marginTop: "1rem",
    padding: "0.72rem 1.25rem",
    borderRadius: "0.7rem",
    border: "none",
    background: disabled
        ? "#b7c9be"
        : "linear-gradient(135deg, #1c3b2b 0%, #2e5e43 100%)",
    color: "white",
    fontWeight: 700,
    fontSize: "0.9rem",
    fontFamily: "var(--font-sans)",
    cursor: disabled ? "not-allowed" : "pointer",
    letterSpacing: "0.02em",
    transition: "opacity 0.2s",
});

const ghostBtnStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "30px",
    height: "30px",
    borderRadius: "0.45rem",
    border: "none",
    background: "transparent",
    color: "#888",
    cursor: "pointer",
    transition: "background 0.15s, color 0.15s",
};

const errorStyle: React.CSSProperties = {
    color: "#c0392b",
    fontSize: "0.82rem",
    marginTop: "0.5rem",
    marginBottom: "0.25rem",
    display: "flex",
    alignItems: "center",
    gap: "0.35rem",
};
