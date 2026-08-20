"use client";

import { usePathname } from "next/navigation";
import { useActionState, useEffect, useId, useRef } from "react";
import { submitLead } from "@/app/actions/leads";
import { EASE, gsap, prefersReducedMotion, useGSAP } from "@/components/animations/gsap";
import { contactDetails } from "@/data/siteData";
import { initialLeadFormState } from "@/lib/lead-form-state";
import { BUDGET_OPTIONS, SERVICE_OPTIONS, TIMELINE_OPTIONS } from "@/lib/validation";

const inputClass =
  "w-full rounded-xl border border-ink-200 bg-white px-4 py-3 text-base text-ink-900 outline-none transition-colors placeholder:text-ink-400 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10";

const errorInputClass = "border-red-400 focus:border-red-500 focus:ring-red-500/10";

function Field({
  label,
  htmlFor,
  error,
  hint,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-2">
      <label htmlFor={htmlFor} className="text-sm font-semibold text-ink-800">
        {label}
      </label>
      {children}
      {hint && !error && <p className="text-xs text-ink-500">{hint}</p>}
      {error && (
        <p id={`${htmlFor}-error`} role="alert" className="text-xs font-medium text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

export default function HireForm({ defaultService }: { defaultService?: string }) {
  const [state, formAction, pending] = useActionState(submitLead, initialLeadFormState);
  const pathname = usePathname();
  const id = useId();
  const statusRef = useRef<HTMLDivElement>(null);

  const fieldId = (name: string) => `${id}-${name}`;
  const errorFor = (name: string) => state.errors[name];
  const valueFor = (name: string) => state.values[name];

  // Move focus to the outcome message so it is announced and the reader is
  // taken to it rather than left at the bottom of a long form.
  useEffect(() => {
    if (state.status !== "idle") statusRef.current?.focus();
  }, [state.status]);

  useGSAP(
    () => {
      if (state.status === "idle" || prefersReducedMotion() || !statusRef.current) return;
      gsap.from(statusRef.current, { opacity: 0, y: -12, duration: 0.5, ease: EASE });
    },
    { dependencies: [state.status, state.message] },
  );

  if (state.status === "success") {
    return (
      <div
        ref={statusRef}
        tabIndex={-1}
        className="rounded-3xl border border-brand-200 bg-brand-50/60 p-10 text-center outline-none"
      >
        <span
          aria-hidden="true"
          className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-brand-600 text-2xl font-bold text-white"
        >
          ✓
        </span>
        <h2 className="mt-6 text-2xl font-bold text-ink-900">Message received</h2>
        <p className="mx-auto mt-3 max-w-md text-base leading-7 text-ink-600">{state.message}</p>
        <p className="mt-6 text-sm text-ink-500">
          In the meantime, feel free to email us directly at{" "}
          <a
            href={`mailto:${contactDetails.email}`}
            className="font-semibold text-brand-700 underline underline-offset-4"
          >
            {contactDetails.email}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="rounded-3xl border border-ink-100 bg-white p-7 shadow-soft sm:p-9">
      {/* Lets us see which page an enquiry came from. */}
      <input type="hidden" name="sourcePath" value={pathname} />

      {/* Honeypot — hidden from people, tempting to bots. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-px w-px overflow-hidden">
        <label htmlFor={fieldId("website")}>Leave this field empty</label>
        <input id={fieldId("website")} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {state.status === "error" && (
        <div
          ref={statusRef}
          tabIndex={-1}
          role="alert"
          className="mb-7 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700 outline-none"
        >
          {state.message}
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Your name *" htmlFor={fieldId("name")} error={errorFor("name")}>
          <input
            id={fieldId("name")}
            name="name"
            type="text"
            required
            autoComplete="name"
            defaultValue={valueFor("name")}
            aria-invalid={Boolean(errorFor("name"))}
            aria-describedby={errorFor("name") ? `${fieldId("name")}-error` : undefined}
            className={`${inputClass} ${errorFor("name") ? errorInputClass : ""}`}
            placeholder="Jane Cooper"
          />
        </Field>

        <Field label="Email *" htmlFor={fieldId("email")} error={errorFor("email")}>
          <input
            id={fieldId("email")}
            name="email"
            type="email"
            required
            autoComplete="email"
            defaultValue={valueFor("email")}
            aria-invalid={Boolean(errorFor("email"))}
            aria-describedby={errorFor("email") ? `${fieldId("email")}-error` : undefined}
            className={`${inputClass} ${errorFor("email") ? errorInputClass : ""}`}
            placeholder="jane@company.com"
          />
        </Field>

        <Field label="Company" htmlFor={fieldId("company")} error={errorFor("company")}>
          <input
            id={fieldId("company")}
            name="company"
            type="text"
            autoComplete="organization"
            defaultValue={valueFor("company")}
            className={inputClass}
            placeholder="Optional"
          />
        </Field>

        <Field label="Phone / WhatsApp" htmlFor={fieldId("phone")} error={errorFor("phone")}>
          <input
            id={fieldId("phone")}
            name="phone"
            type="tel"
            autoComplete="tel"
            defaultValue={valueFor("phone")}
            className={inputClass}
            placeholder="Optional"
          />
        </Field>

        <Field label="Service needed *" htmlFor={fieldId("service")} error={errorFor("service")}>
          <select
            id={fieldId("service")}
            name="service"
            required
            defaultValue={valueFor("service") ?? defaultService ?? SERVICE_OPTIONS[0]}
            aria-invalid={Boolean(errorFor("service"))}
            className={`${inputClass} ${errorFor("service") ? errorInputClass : ""}`}
          >
            {SERVICE_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Budget range" htmlFor={fieldId("budget")} hint="Helps us scope realistically.">
          <select
            id={fieldId("budget")}
            name="budget"
            defaultValue={valueFor("budget") ?? ""}
            className={inputClass}
          >
            <option value="">Prefer not to say</option>
            {BUDGET_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </Field>

        <div className="sm:col-span-2">
          <Field label="Timeline" htmlFor={fieldId("timeline")}>
            <select
              id={fieldId("timeline")}
              name="timeline"
              defaultValue={valueFor("timeline") ?? ""}
              className={inputClass}
            >
              <option value="">Not sure</option>
              {TIMELINE_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <div className="sm:col-span-2">
          <Field
            label="Project details *"
            htmlFor={fieldId("message")}
            error={errorFor("message")}
            hint="What are you building, who is it for, and what does success look like?"
          >
            <textarea
              id={fieldId("message")}
              name="message"
              rows={6}
              required
              minLength={20}
              defaultValue={valueFor("message")}
              aria-invalid={Boolean(errorFor("message"))}
              aria-describedby={errorFor("message") ? `${fieldId("message")}-error` : undefined}
              className={`${inputClass} resize-y ${errorFor("message") ? errorInputClass : ""}`}
              placeholder="We need a new website for our accounting firm. Around 8 pages, we want it to rank for local searches, and we'd like to launch before the end of the quarter."
            />
          </Field>
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-4 border-t border-ink-100 pt-7 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-6 text-ink-500">
          We use your details only to reply to this enquiry.
          <br className="hidden sm:block" /> No newsletter, no sharing with third parties.
        </p>

        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-ink-900 px-8 py-4 text-base font-semibold text-white transition-all duration-300 hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? (
            <>
              <span
                aria-hidden="true"
                className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"
              />
              Sending…
            </>
          ) : (
            <>
              Send message
              <span aria-hidden="true">→</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
