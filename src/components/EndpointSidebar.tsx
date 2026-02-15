import { categories, endpoints, type Endpoint } from "@/data/endpoints";
import MethodBadge from "./MethodBadge";

interface EndpointSidebarProps {
  selectedId: string;
  onSelect: (endpoint: Endpoint) => void;
}

const EndpointSidebar = ({ selectedId, onSelect }: EndpointSidebarProps) => {
  return (
    <nav className="w-full space-y-6">
      {categories.map(cat => {
        const catEndpoints = endpoints.filter(e => e.category === cat.id);
        if (catEndpoints.length === 0) return null;
        return (
          <div key={cat.id}>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2 px-3">
              {cat.icon} {cat.label}
            </h3>
            <ul className="space-y-0.5">
              {catEndpoints.map(ep => (
                <li key={ep.id}>
                  <button
                    onClick={() => onSelect(ep)}
                    className={`w-full text-left flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all ${
                      selectedId === ep.id
                        ? "bg-primary/10 text-foreground border-l-2 border-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                    }`}
                  >
                    <MethodBadge method={ep.method} />
                    <span className="font-mono text-xs truncate">{ep.path}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </nav>
  );
};

export default EndpointSidebar;
