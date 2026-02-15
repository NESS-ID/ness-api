import { useState } from "react";
import { motion } from "framer-motion";
import { Play, Loader2 } from "lucide-react";
import { BASE_URL, type HttpMethod } from "@/data/endpoints";
import CodeBlock from "./CodeBlock";

const methods: HttpMethod[] = ["GET", "POST", "PUT", "DELETE"];

const ApiTester = () => {
  const [method, setMethod] = useState<HttpMethod>("GET");
  const [path, setPath] = useState("/health");
  const [body, setBody] = useState("");
  const [response, setResponse] = useState<string | null>(null);
  const [statusCode, setStatusCode] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    setLoading(true);
    setResponse(null);
    setStatusCode(null);
    try {
      const url = `${BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
      const options: RequestInit = { method };
      if (body && (method === "POST" || method === "PUT")) {
        options.headers = { "Content-Type": "application/json" };
        options.body = body;
      }
      const res = await fetch(url, options);
      setStatusCode(res.status);
      const text = await res.text();
      try {
        setResponse(JSON.stringify(JSON.parse(text), null, 2));
      } catch {
        setResponse(text);
      }
    } catch (err: any) {
      setResponse(JSON.stringify({ error: err.message || "Request failed" }, null, 2));
      setStatusCode(0);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="tester" className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-foreground mb-2">API Tester</h2>
          <p className="text-muted-foreground mb-8">Send requests directly to the Ness API and see live responses.</p>

          <div className="border border-border rounded-2xl bg-card overflow-hidden">
            {/* Input row */}
            <div className="flex flex-col sm:flex-row gap-0 border-b border-border">
              <select
                value={method}
                onChange={(e) => setMethod(e.target.value as HttpMethod)}
                className="px-4 py-3 bg-secondary/50 text-foreground font-mono text-sm font-bold border-b sm:border-b-0 sm:border-r border-border focus:outline-none"
              >
                {methods.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
              <div className="flex-1 flex items-center px-4 gap-2">
                <span className="text-muted-foreground text-sm font-mono shrink-0">{BASE_URL}</span>
                <input
                  type="text"
                  value={path}
                  onChange={(e) => setPath(e.target.value)}
                  placeholder="/endpoint"
                  className="flex-1 bg-transparent py-3 text-sm font-mono text-foreground focus:outline-none placeholder:text-muted-foreground/40"
                />
              </div>
              <button
                onClick={handleSend}
                disabled={loading}
                className="px-6 py-3 bg-primary text-primary-foreground font-semibold text-sm transition-all hover:opacity-90 disabled:opacity-50 flex items-center gap-2 justify-center"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
                Send
              </button>
            </div>

            {/* Body input */}
            {(method === "POST" || method === "PUT") && (
              <div className="border-b border-border">
                <textarea
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  placeholder='{ "key": "value" }'
                  rows={4}
                  className="w-full px-4 py-3 bg-code text-sm font-mono text-foreground focus:outline-none placeholder:text-muted-foreground/40 resize-none"
                />
              </div>
            )}

            {/* Response */}
            {response !== null && (
              <div className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-medium text-muted-foreground">Status:</span>
                  <span className={`text-xs font-bold font-mono px-2 py-0.5 rounded ${
                    statusCode && statusCode >= 200 && statusCode < 300
                      ? "bg-method-get/15 text-method-get"
                      : "bg-destructive/15 text-destructive"
                  }`}>
                    {statusCode === 0 ? "Error" : statusCode}
                  </span>
                </div>
                <CodeBlock code={response} language="json" title="Response" />
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ApiTester;
