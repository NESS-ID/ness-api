import { useState } from "react";
import { Check, Copy } from "lucide-react";

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
}

const CodeBlock = ({ code, language = "json", title }: CodeBlockProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-xl border border-[hsl(var(--code-border))] bg-code overflow-hidden">
      {title && (
        <div className="flex items-center justify-between px-4 py-2 border-b border-[hsl(var(--code-border))] bg-secondary/30">
          <span className="text-xs font-medium text-muted-foreground">{title}</span>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground/60">{language}</span>
            <button
              onClick={handleCopy}
              className="p-1 rounded hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-method-get" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      )}
      <pre className="p-4 overflow-x-auto scrollbar-thin text-sm leading-relaxed">
        <code className="font-mono text-foreground/90">{code}</code>
      </pre>
    </div>
  );
};

export default CodeBlock;
