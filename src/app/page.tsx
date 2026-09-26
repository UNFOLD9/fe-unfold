import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Philosophy from "@/components/landing/Philosophy";
import Features from "@/components/landing/Features";
import HowItWorks from "@/components/landing/HowItWorks";
import Testimonials from "@/components/landing/Testimonials";
import Faq from "@/components/landing/Faq";
import CtaSection from "@/components/landing/CtaSection";
import Footer from "@/components/landing/Footer";

export default function RootPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8F7FC] text-[#25233A] selection:bg-[#A78BFA]/20 selection:text-[#25233A]">
      {/* Top Navigation */}
      <Navbar />

      <main className="flex-1">
        {/* Hero with live interactive reflection preview */}
        <Hero />

        {/* Core Philosophy & Empathy ("Mengapa UNFOLD?") */}
        <Philosophy />

        {/* Main Features */}
        <Features />

        {/* How It Works (3 Steps) */}
        <HowItWorks />

        {/* Stories / Testimonials */}
        <Testimonials />

        {/* Frequently Asked Questions */}
        <Faq />

        {/* Call to Action */}
        <CtaSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
