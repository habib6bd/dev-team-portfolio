import Footer from "@/components/Footer";
import Header from "@/components/Header";
import BackToTop from "@/components/BackToTop";
import JsonLd from "@/components/JsonLd";
import { organizationSchema } from "@/lib/structured-data";
import AnimationProvider from "@/components/animations/AnimationProvider";
import ScrollProgress from "@/components/animations/ScrollProgress";

/** Chrome for the public marketing pages. The dashboard has its own shell. */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-ink-900 focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>

      <JsonLd data={organizationSchema()} />
      <ScrollProgress />
      <Header />
      <AnimationProvider>
        <main id="main">{children}</main>
      </AnimationProvider>
      <Footer />
      <BackToTop />
    </>
  );
}
