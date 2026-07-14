import { HeroContent } from "@/components/hero/HeroContent";

export function Hero() {
  return (
    <section
      id="home"
      className="flex min-h-[60vh] flex-col justify-center lg:min-h-[70vh]"
    >
      <HeroContent />
    </section>
  );
}
