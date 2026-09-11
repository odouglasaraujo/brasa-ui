import { Navbar } from "./components/navbar";
import { Hero } from "./components/hero";
import { Problem } from "./components/problem";
import { ComponentsShowcase } from "./components/components-showcase";
import { AIReady } from "./components/ai-ready";
import { CTA } from "./components/cta";
import { Footer } from "./components/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Problem />
        <ComponentsShowcase />
        <AIReady />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
