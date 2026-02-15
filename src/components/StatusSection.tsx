import { motion } from "framer-motion";
import { Activity, CheckCircle2 } from "lucide-react";

const StatusSection = () => {
  return (
    <section className="py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="border border-border rounded-2xl bg-card p-8 flex flex-col sm:flex-row items-center gap-6"
        >
          <div className="flex items-center gap-3">
            <div className="relative">
              <CheckCircle2 className="w-10 h-10 text-method-get" />
              <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-method-get rounded-full animate-pulse" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground">API Status</h3>
              <p className="text-method-get font-semibold text-sm">Operational</p>
            </div>
          </div>

          <div className="h-px sm:h-12 w-full sm:w-px bg-border" />

          <div className="flex items-center gap-3">
            <Activity className="w-8 h-8 text-primary" />
            <div>
              <p className="text-2xl font-bold text-foreground">99.98%</p>
              <p className="text-xs text-muted-foreground">Uptime (30 days)</p>
            </div>
          </div>

          <div className="h-px sm:h-12 w-full sm:w-px bg-border" />

          <div>
            <p className="text-2xl font-bold text-foreground">~45ms</p>
            <p className="text-xs text-muted-foreground">Avg Response Time</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default StatusSection;
