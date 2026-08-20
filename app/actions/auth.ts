"use server";

import { redirect } from "next/navigation";
import { createSession, destroySession, isDashboardPasswordSet, verifyPassword } from "@/lib/auth";

export type LoginState = { error: string | null };

export async function login(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const password = formData.get("password");

  if (typeof password !== "string" || password.length === 0) {
    return { error: "Please enter the dashboard password." };
  }

  if (!isDashboardPasswordSet()) {
    return {
      error: "No dashboard password is configured. Set DASHBOARD_PASSWORD in .env.local.",
    };
  }

  try {
    if (!verifyPassword(password)) {
      // Slow failed attempts down slightly so the endpoint is a poor
      // brute-force target.
      await new Promise((resolve) => setTimeout(resolve, 600));
      return { error: "That password is not correct." };
    }

    await createSession();
  } catch (error) {
    console.error("[login] failed", error);
    return {
      error: error instanceof Error ? error.message : "Could not sign you in. Please try again.",
    };
  }

  redirect("/dashboard");
}

export async function logout() {
  await destroySession();
  redirect("/login");
}
