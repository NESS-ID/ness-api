import type { HttpMethod } from "@/data/endpoints";

const methodColors: Record<HttpMethod, string> = {
  GET: "bg-method-get/15 text-method-get border-method-get/30",
  POST: "bg-method-post/15 text-method-post border-method-post/30",
  PUT: "bg-method-put/15 text-method-put border-method-put/30",
  DELETE: "bg-method-delete/15 text-method-delete border-method-delete/30",
};

const MethodBadge = ({ method }: { method: HttpMethod }) => (
  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-bold font-mono border ${methodColors[method]}`}>
    {method}
  </span>
);

export default MethodBadge;
