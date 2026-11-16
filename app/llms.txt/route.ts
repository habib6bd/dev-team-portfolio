import { contactDetails, faqs, services, site } from "@/data/siteData";
import { siteUrl } from "@/lib/site-url";

// Built once at build time from data/siteData.ts.
export const dynamic = "force-static";

/**
 * /llms.txt: a plain-text summary of the company for AI assistants, in the
 * llmstxt.org format. Generated from the same data as the pages, so it
 * cannot drift out of date.
 */
export function GET() {
  const lines = [
    `# ${site.name}`,
    "",
    `> ${site.description}`,
    "",
    `- Location: ${contactDetails.location}. ${contactDetails.remote}`,
    `- Hours: ${contactDetails.hours}`,
    `- Email: ${contactDetails.email}`,
    `- Phone / WhatsApp: ${contactDetails.phones.join(", ")}`,
    "",
    "## Services",
    "",
    ...services.map(
      (service) => `- [${service.title}](${siteUrl}${service.link}): ${service.summary}`,
    ),
    "",
    "## Company",
    "",
    `- [About](${siteUrl}/about): who we are and how we work`,
    `- [Projects](${siteUrl}/projects): recent client work`,
    `- [Contact](${siteUrl}/contact): email, phone and WhatsApp`,
    `- [Hire us](${siteUrl}/hire-us): send project details and get a quote within one working day`,
    "",
    "## Common questions",
    "",
    ...faqs.flatMap((faq) => [`### ${faq.question}`, "", faq.answer, ""]),
  ];

  return new Response(lines.join("\n"), {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
