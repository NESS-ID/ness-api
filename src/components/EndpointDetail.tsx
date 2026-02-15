import { motion } from "framer-motion";
import type { Endpoint } from "@/data/endpoints";
import { BASE_URL } from "@/data/endpoints";
import MethodBadge from "./MethodBadge";
import CodeBlock from "./CodeBlock";

const EndpointDetail = ({ endpoint }: { endpoint: Endpoint }) => {
  const curlExample = (() => {
    const bodyParams = endpoint.parameters.filter(p => p.location === "body");
    const queryParams = endpoint.parameters.filter(p => p.location === "query");
    let url = `${BASE_URL}${endpoint.path}`;
    if (queryParams.length > 0) {
      const qs = queryParams.map(p => `${p.name}=value`).join("&");
      url += `?${qs}`;
    }
    let cmd = `curl -X ${endpoint.method} "${url}"`;
    if (bodyParams.length > 0) {
      cmd += ` \\\n  -H "Content-Type: application/json"`;
      const body: Record<string, string> = {};
      bodyParams.forEach(p => { body[p.name] = `your_${p.name}`; });
      cmd += ` \\\n  -d '${JSON.stringify(body, null, 2)}'`;
    }
    return cmd;
  })();

  const fetchExample = (() => {
    const bodyParams = endpoint.parameters.filter(p => p.location === "body");
    const queryParams = endpoint.parameters.filter(p => p.location === "query");
    let url = `${BASE_URL}${endpoint.path}`;
    if (queryParams.length > 0) {
      const qs = queryParams.map(p => `${p.name}=value`).join("&");
      url += `?${qs}`;
    }
    let code = `const response = await fetch("${url}"`;
    if (bodyParams.length > 0) {
      const body: Record<string, string> = {};
      bodyParams.forEach(p => { body[p.name] = `your_${p.name}`; });
      code += `, {\n  method: "${endpoint.method}",\n  headers: { "Content-Type": "application/json" },\n  body: JSON.stringify(${JSON.stringify(body, null, 4)})\n}`;
    }
    code += `);\nconst data = await response.json();`;
    return code;
  })();

  return (
    <motion.div
      key={endpoint.id}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-2 flex-wrap">
          <MethodBadge method={endpoint.method} />
          <code className="text-lg font-mono font-semibold text-foreground">{endpoint.path}</code>
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2">{endpoint.title}</h2>
        <p className="text-muted-foreground">{endpoint.description}</p>
      </div>

      {/* Parameters */}
      {endpoint.parameters.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-3">Parameters</h3>
          <div className="border border-border rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-secondary/50">
                  <th className="text-left px-4 py-2.5 font-medium text-muted-foreground">Name</th>
                  <th className="text-left px-4 py-2.5 font-medium text-muted-foreground">Type</th>
                  <th className="text-left px-4 py-2.5 font-medium text-muted-foreground">In</th>
                  <th className="text-left px-4 py-2.5 font-medium text-muted-foreground">Required</th>
                  <th className="text-left px-4 py-2.5 font-medium text-muted-foreground">Description</th>
                </tr>
              </thead>
              <tbody>
                {endpoint.parameters.map((param, i) => (
                  <tr key={param.name} className={i % 2 === 0 ? "bg-card" : "bg-card/50"}>
                    <td className="px-4 py-2.5 font-mono text-primary text-xs">{param.name}</td>
                    <td className="px-4 py-2.5 font-mono text-xs text-muted-foreground">{param.type}</td>
                    <td className="px-4 py-2.5 text-xs text-muted-foreground">{param.location}</td>
                    <td className="px-4 py-2.5">
                      {param.required ? (
                        <span className="text-xs px-1.5 py-0.5 rounded bg-destructive/10 text-destructive font-medium">Required</span>
                      ) : (
                        <span className="text-xs text-muted-foreground">Optional</span>
                      )}
                    </td>
                    <td className="px-4 py-2.5 text-xs text-muted-foreground">{param.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Code Examples */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">Example Request</h3>
        <div className="grid gap-4">
          <CodeBlock code={curlExample} language="bash" title="cURL" />
          <CodeBlock code={fetchExample} language="javascript" title="JavaScript" />
        </div>
      </div>

      {/* Response */}
      <div>
        <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-3">Example Response</h3>
        <CodeBlock code={JSON.stringify(endpoint.exampleResponse, null, 2)} language="json" title="Response — 200 OK" />
      </div>
    </motion.div>
  );
};

export default EndpointDetail;
