import { motion } from "framer-motion";
import { ArrowRight, Terminal } from "lucide-react";
import { BASE_URL } from "@/data/endpoints";

interface HeroSectionProps {
  onViewEndpoints: () => void;
}

const HeroSection = ({ onViewEndpoints }: HeroSectionProps) => {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center px-6 overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)`,
        backgroundSize: '60px 60px',
      }} />
      
      {/* Glow orb */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full opacity-20 blur-[120px]"
        style={{ background: 'radial-gradient(circle, hsl(var(--primary)), transparent 70%)' }} />

      <div className="relative z-10 text-center max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-glow bg-secondary/50 text-sm text-muted-foreground mb-8">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            v1.0 — Now Available
          </div>

          <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight mb-6">
            <span className="text-gradient">Ness</span>{" "}
            <span className="text-foreground">API</span>
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed">
            Simple and Powerful REST API. Build, integrate, and scale your applications with ease.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          <button
            onClick={onViewEndpoints}
            className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold text-base transition-all hover:glow-primary-lg hover:scale-[1.02] active:scale-[0.98]"
          >
            View Endpoints
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
          <a
            href="#tester"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl border border-border bg-secondary/50 text-secondary-foreground font-medium text-base transition-all hover:bg-secondary hover:border-primary/30"
          >
            <Terminal className="w-4 h-4" />
            Try it Live
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-code border border-[hsl(var(--code-border))] font-mono text-sm"
        >
          <span className="text-muted-foreground select-none">$</span>
          <span className="text-foreground">{BASE_URL}</span>
          <button
            onClick={() => navigator.clipboard.writeText(BASE_URL)}
            className="text-muted-foreground hover:text-primary transition-colors text-xs border border-border rounded px-2 py-0.5"
          >
            Copy
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
