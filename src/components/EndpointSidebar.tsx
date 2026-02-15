import type { ApiEndpoint } from "@/data/endpoints";
import MethodBadge from "./MethodBadge";

interface EndpointSidebarProps {
  grouped: Record<string, ApiEndpoint[]>;
  selectedPath: string;
  onSelect: (endpoint: ApiEndpoint) => void;
}

const EndpointSidebar = ({
  grouped,
  selectedPath,
  onSelect,
}: EndpointSidebarProps) => {
  return (
    <nav className="w-full space-y-6">
      {Object.entries(grouped).map(([tag, endpoints]) => (
        <div key={tag}>
          <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2 px-3">
            {tag}
          </h3>

          <ul className="space-y-0.5">
            {endpoints.map((ep) => (
              <li key={ep.path}>
                <button
                  onClick={() => onSelect(ep)}
                  className={`w-full text-left flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all ${
                    selectedPath === ep.path
                      ? "bg-primary/10 text-foreground border-l-2 border-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                  }`}
                >
                  <MethodBadge method={ep.method} />
                  <span className="font-mono text-xs truncate">
                    {ep.path}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
};

export default EndpointSidebar;
