import { useState } from "react";
import { motion } from "framer-motion";
import { endpoints } from "@/data/endpoints";
import EndpointSidebar from "./EndpointSidebar";
import EndpointDetail from "./EndpointDetail";
import { Menu, X } from "lucide-react";

const DocsSection = () => {
  const [selected, setSelected] = useState(endpoints[0]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <section id="endpoints" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-foreground mb-2">Endpoints</h2>
          <p className="text-muted-foreground mb-10">Complete reference for all available API endpoints.</p>
        </motion.div>

        <div className="flex gap-8 relative">
          {/* Mobile toggle */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden fixed bottom-6 right-6 z-50 p-3 rounded-full bg-primary text-primary-foreground shadow-lg glow-primary"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* Sidebar */}
          <div className={`
            ${sidebarOpen ? "fixed inset-0 z-40 bg-background/95 backdrop-blur-sm pt-20 px-6 overflow-y-auto" : "hidden"}
            lg:block lg:static lg:bg-transparent lg:p-0 lg:w-72 lg:shrink-0
          `}>
            <div className="lg:sticky lg:top-8">
              <EndpointSidebar
                selectedId={selected.id}
                onSelect={(ep) => {
                  setSelected(ep);
                  setSidebarOpen(false);
                }}
              />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <EndpointDetail endpoint={selected} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DocsSection;
