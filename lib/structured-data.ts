import {
  contactDetails,
  services,
  site,
  telHref,
  type Faq,
  type Service,
} from "@/data/siteData";
import { siteUrl } from "@/lib/site-url";

/**
 * schema.org JSON-LD builders. Everything is derived from data/siteData.ts,
 * and only describes what is visibly on the page it is rendered on.
 */

const ORGANIZATION_ID = `${siteUrl}/#organization`;
const WEBSITE_ID = `${siteUrl}/#website`;

const phoneNumber = (phone: string) => telHref(phone).replace("tel:", "");

/** Who Kodenvia is. Rendered on every public page. */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: site.name,
    url: siteUrl,
    logo: `${siteUrl}/icon.png`,
    image: `${siteUrl}/opengraph-image.png`,
    description: site.description,
    email: contactDetails.email,
    telephone: phoneNumber(contactDetails.phones[0]),
    address: {
      "@type": "PostalAddress",
      addressLocality: "Dhaka",
      addressCountry: "BD",
    },
    areaServed: ["Bangladesh", "Worldwide"],
    knowsAbout: services.map((service) => service.title),
    contactPoint: contactDetails.phones.map((phone) => ({
      "@type": "ContactPoint",
      contactType: "sales",
      telephone: phoneNumber(phone),
      email: contactDetails.email,
      availableLanguage: ["English", "Bengali"],
      hoursAvailable: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
        opens: "10:00",
        closes: "19:00",
      },
    })),
    ...(site.profiles.length > 0 ? { sameAs: site.profiles } : {}),
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: site.name,
    url: siteUrl,
    description: site.description,
    inLanguage: "en",
    publisher: { "@id": ORGANIZATION_ID },
  };
}

export function serviceSchema(service: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${siteUrl}${service.link}#service`,
    name: service.title,
    serviceType: service.title,
    description: service.summary,
    url: `${siteUrl}${service.link}`,
    image: service.image.src,
    provider: { "@id": ORGANIZATION_ID },
    areaServed:
      service.market === "bangladesh"
        ? { "@type": "Country", name: "Bangladesh" }
        : "Worldwide",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${service.title}: what is included`,
      itemListElement: service.deliverables.map((item) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: item },
      })),
    },
  };
}

export function faqSchema(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

/** `trail` runs from the top of the site down to the current page. */
export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.path === "/" ? "" : item.path}`,
    })),
  };
}

/** The list of services, for the /services hub. */
export function serviceListSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${site.name} services`,
    itemListElement: services.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: service.title,
      url: `${siteUrl}${service.link}`,
    })),
  };
}
