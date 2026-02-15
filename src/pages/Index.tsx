import { useRef } from "react";
import HeroSection from "@/components/HeroSection";
import DocsSection from "@/components/DocsSection";
import ApiTester from "@/components/ApiTester";
import StatusSection from "@/components/StatusSection";
import Footer from "@/components/Footer";

const Index = () => {
  const docsRef = useRef<HTMLDivElement>(null);

  const scrollToEndpoints = () => {
    docsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      <HeroSection onViewEndpoints={scrollToEndpoints} />
      <StatusSection />
      <div ref={docsRef}>
        <DocsSection />
      </div>
      <ApiTester />
      <Footer />
    </div>
  );
};

export default Index;
