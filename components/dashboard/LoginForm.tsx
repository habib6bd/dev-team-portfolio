"use client";

import { useActionState } from "react";
import { login, type LoginState } from "@/app/actions/auth";

const initialState: LoginState = { error: null };

export default function LoginForm() {
  const [state, formAction, pending] = useActionState(login, initialState);

  return (
    <form action={formAction} className="mt-8 grid gap-4">
      <div className="grid gap-2">
        <label htmlFor="password" className="text-sm font-semibold text-ink-800">
          Dashboard password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoFocus
          autoComplete="current-password"
          aria-invalid={Boolean(state.error)}
          aria-describedby={state.error ? "password-error" : undefined}
          className={`w-full rounded-xl border px-4 py-3 text-base outline-none transition-colors focus:ring-4 ${
            state.error
              ? "border-red-400 focus:border-red-500 focus:ring-red-500/10"
              : "border-ink-200 focus:border-brand-500 focus:ring-brand-500/10"
          }`}
          placeholder="••••••••••••"
        />
      </div>

      {state.error && (
        <p id="password-error" role="alert" className="text-sm font-medium text-red-600">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-ink-900 px-6 py-3.5 text-base font-semibold text-white transition-colors hover:bg-brand-600 disabled:opacity-60"
      >
        {pending ? "Checking…" : "Sign in"}
      </button>
    </form>
  );
}
