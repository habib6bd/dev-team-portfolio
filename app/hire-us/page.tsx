import SectionTitle from "@/components/SectionTitle";

export default function HireUsPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-16">
      <SectionTitle
        label="Hire us"
        title="Tell us about your project"
        description="This form is currently frontend-only. Later you can connect it with EmailJS, Formspree, or a Next.js API route."
      />

      <form className="rounded-3xl border bg-white p-6 shadow-sm">
        <div className="grid gap-4">
          <label className="grid gap-2 text-sm font-semibold">
            Name
            <input className="rounded-xl border px-4 py-3 font-normal outline-none focus:border-blue-700" placeholder="Your name" />
          </label>

          <label className="grid gap-2 text-sm font-semibold">
            Email
            <input type="email" className="rounded-xl border px-4 py-3 font-normal outline-none focus:border-blue-700" placeholder="you@example.com" />
          </label>

          <label className="grid gap-2 text-sm font-semibold">
            Service needed
            <select className="rounded-xl border px-4 py-3 font-normal outline-none focus:border-blue-700">
              <option>Web Development</option>
              <option>SEO</option>
              <option>Admin Support</option>
              <option>Other</option>
            </select>
          </label>

          <label className="grid gap-2 text-sm font-semibold">
            Message
            <textarea rows={6} className="rounded-xl border px-4 py-3 font-normal outline-none focus:border-blue-700" placeholder="Write your project details" />
          </label>

          <button type="button" className="rounded-xl bg-blue-700 px-6 py-3 font-semibold text-white">
            Send message
          </button>
        </div>
      </form>
    </main>
  );
}