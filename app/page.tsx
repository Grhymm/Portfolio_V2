import { Container } from "@/components/ui/Container";
import { Hero } from "@/components/hero/Hero";
import { About } from "@/components/about/About";
import { Education } from "@/components/education/Education";
import { Work } from "@/components/work/Work";
import { Services } from "@/components/services/Services";
import { Tech } from "@/components/tech/Tech";
import { Testimonials } from "@/components/testimonials/Testimonials";
import { Contact } from "@/components/contact/Contact";
import { LeftPanel } from "@/components/layout/LeftPanel";
import { Footer } from "@/components/layout/Footer";
import { WorkProvider } from "@/lib/work-context";

export default function Home() {
  return (
    <WorkProvider>
      <main className="flex-1 bg-background">
        <section className="relative pb-16 pt-4 sm:pb-20 sm:pt-10 lg:pb-24 lg:pt-12">
          <Container className="flex max-w-7xl flex-col gap-16 lg:flex-row lg:items-start">
            <LeftPanel />
            <div className="flex w-full min-w-0 flex-col gap-24 sm:gap-28 lg:flex-1 lg:gap-36">
              <Hero />
              <About />
              <Education />
              <Work />
              <Services />
              <Tech />
              <Testimonials />
              <Contact />
            </div>
          </Container>
        </section>
        <Footer />
      </main>
    </WorkProvider>
  );
}
