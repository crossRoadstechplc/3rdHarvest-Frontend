import { useState } from "react";
import { BrandWordmark } from "@/components/BrandWordmark";

type AdminLoginProps = {
  onLogin: (password: string) => Promise<void>;
};

export const AdminLogin = ({ onLogin }: AdminLoginProps) => {
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting || !password.trim()) {
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      await onLogin(password.trim());
      setPassword("");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Login failed";
      setErrorMessage(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="admin-app min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-black/10 bg-white p-7 shadow-[0_16px_34px_rgba(30,30,30,0.08)]">
        <p className="font-serif text-2xl font-bold uppercase tracking-tight text-bloomDarkCoffee">
          <BrandWordmark
            numberClassName="text-[#b3872f]"
            harvestClassName="text-[#496255]"
            superscriptClassName="ml-[0.02em]"
          />
        </p>
        <p className="mt-3 text-xs tracking-[0.18em] uppercase font-bold text-bloomGold">Admin Access</p>
        <h1 className="mt-2 mb-2 font-serif text-3xl font-bold text-bloomDarkCoffee">Sign in</h1>
        <p className="text-bloomDarkCoffee/70 text-sm mb-6">Enter the admin password to continue.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="admin-password" className="admin-label">
              Password
            </label>
            <input
              id="admin-password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
              className="admin-input mt-2 px-4 py-3"
              placeholder="••••••••"
            />
          </div>

          {errorMessage && (
            <p className="admin-error" role="alert">
              {errorMessage}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting || !password.trim()}
            className="admin-button-primary w-full px-5 py-3 tracking-[0.08em] uppercase disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
};
