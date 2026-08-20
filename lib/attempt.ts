import "server-only";

export type Attempt<T> = { ok: true; data: T } | { ok: false; error: string };

/**
 * Runs a data load and turns a failure into a value instead of an exception.
 *
 * Dashboard pages use this so the failure path is decided *before* any JSX is
 * constructed — React does not render JSX eagerly, so a try/catch wrapped
 * around a `return <Component />` would never catch a render error anyway.
 */
export async function attempt<T>(scope: string, load: () => Promise<T>): Promise<Attempt<T>> {
  try {
    return { ok: true, data: await load() };
  } catch (error) {
    console.error(`[${scope}] query failed`, error);
    return { ok: false, error: error instanceof Error ? error.message : String(error) };
  }
}
