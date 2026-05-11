import SectionTitle from "@/components/SectionTitle";
import Link from "next/link";

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-16">
      <SectionTitle
        label="Contact"
        title="Let’s discuss your project."
        description="Contact us for web development, SEO setup, admin support, or long-term maintenance."
      />

      <div className="grid gap-8 md:grid-cols-2">
        <div className="rounded-3xl border p-6 shadow-sm">
          <h2 className="text-xl font-bold">Contact Information</h2>
          <div className="mt-5 space-y-3 text-slate-700">
            <p><strong>Email:</strong> hello@yourdomain.com</p>
            <p><strong>Phone:</strong> +880 0000-000000</p>
            <p><strong>Location:</strong> Dhaka, Bangladesh</p>
          </div>
        </div>

        <div className="rounded-3xl border bg-blue-50 p-6">
          <h2 className="text-xl font-bold">Need a project quote?</h2>
          <p className="mt-3 text-slate-600">
            Send your project details through our Hire Us form.
          </p>
          <Link href="/hire-us" className="mt-5 inline-block rounded-xl bg-blue-700 px-6 py-3 font-semibold text-white">
            Hire us
          </Link>
        </div>
      </div>
    </main>
  );
}