export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

export interface Parameter {
  name: string;
  type: string;
  required: boolean;
  description: string;
  location: "query" | "body" | "path";
}

export interface Endpoint {
  id: string;
  method: HttpMethod;
  path: string;
  title: string;
  description: string;
  category: string;
  parameters: Parameter[];
  exampleResponse: object;
}

export const categories = [
  { id: "auth", label: "Auth", icon: "🔐" },
  { id: "users", label: "Users", icon: "👤" },
  { id: "data", label: "Data", icon: "📦" },
  { id: "utility", label: "Utility", icon: "🔧" },
];

export const endpoints: Endpoint[] = [
  {
    id: "auth-login",
    method: "POST",
    path: "/auth/login",
    title: "Login",
    description: "Authenticate a user and receive an access token.",
    category: "auth",
    parameters: [
      { name: "email", type: "string", required: true, description: "User email address", location: "body" },
      { name: "password", type: "string", required: true, description: "User password", location: "body" },
    ],
    exampleResponse: {
      success: true,
      data: { token: "eyJhbGciOiJIUzI1NiIs...", expires_in: 3600 },
    },
  },
  {
    id: "auth-register",
    method: "POST",
    path: "/auth/register",
    title: "Register",
    description: "Create a new user account.",
    category: "auth",
    parameters: [
      { name: "name", type: "string", required: true, description: "Full name", location: "body" },
      { name: "email", type: "string", required: true, description: "Email address", location: "body" },
      { name: "password", type: "string", required: true, description: "Password (min 8 chars)", location: "body" },
    ],
    exampleResponse: {
      success: true,
      data: { id: "usr_abc123", name: "John Doe", email: "john@example.com" },
    },
  },
  {
    id: "users-list",
    method: "GET",
    path: "/users",
    title: "List Users",
    description: "Retrieve a paginated list of all users.",
    category: "users",
    parameters: [
      { name: "page", type: "number", required: false, description: "Page number (default: 1)", location: "query" },
      { name: "limit", type: "number", required: false, description: "Items per page (default: 20)", location: "query" },
    ],
    exampleResponse: {
      success: true,
      data: [
        { id: "usr_abc123", name: "John Doe", email: "john@example.com" },
        { id: "usr_def456", name: "Jane Smith", email: "jane@example.com" },
      ],
      meta: { page: 1, limit: 20, total: 42 },
    },
  },
  {
    id: "users-get",
    method: "GET",
    path: "/users/:id",
    title: "Get User",
    description: "Retrieve a single user by their ID.",
    category: "users",
    parameters: [
      { name: "id", type: "string", required: true, description: "User ID", location: "path" },
    ],
    exampleResponse: {
      success: true,
      data: { id: "usr_abc123", name: "John Doe", email: "john@example.com", created_at: "2026-01-15T10:00:00Z" },
    },
  },
  {
    id: "users-update",
    method: "PUT",
    path: "/users/:id",
    title: "Update User",
    description: "Update an existing user's information.",
    category: "users",
    parameters: [
      { name: "id", type: "string", required: true, description: "User ID", location: "path" },
      { name: "name", type: "string", required: false, description: "Updated name", location: "body" },
      { name: "email", type: "string", required: false, description: "Updated email", location: "body" },
    ],
    exampleResponse: {
      success: true,
      data: { id: "usr_abc123", name: "John Updated", email: "john.new@example.com" },
    },
  },
  {
    id: "users-delete",
    method: "DELETE",
    path: "/users/:id",
    title: "Delete User",
    description: "Permanently delete a user account.",
    category: "users",
    parameters: [
      { name: "id", type: "string", required: true, description: "User ID", location: "path" },
    ],
    exampleResponse: {
      success: true,
      message: "User deleted successfully",
    },
  },
  {
    id: "data-list",
    method: "GET",
    path: "/data",
    title: "List Data",
    description: "Retrieve all stored data entries.",
    category: "data",
    parameters: [
      { name: "sort", type: "string", required: false, description: "Sort by field (e.g., created_at)", location: "query" },
      { name: "order", type: "string", required: false, description: "Sort order: asc or desc", location: "query" },
    ],
    exampleResponse: {
      success: true,
      data: [
        { id: "dat_001", key: "config", value: { theme: "dark" }, created_at: "2026-01-10T08:00:00Z" },
      ],
    },
  },
  {
    id: "data-create",
    method: "POST",
    path: "/data",
    title: "Create Data",
    description: "Store a new data entry.",
    category: "data",
    parameters: [
      { name: "key", type: "string", required: true, description: "Unique key identifier", location: "body" },
      { name: "value", type: "object", required: true, description: "JSON value to store", location: "body" },
    ],
    exampleResponse: {
      success: true,
      data: { id: "dat_002", key: "settings", value: { lang: "en" }, created_at: "2026-02-15T12:00:00Z" },
    },
  },
  {
    id: "utility-health",
    method: "GET",
    path: "/health",
    title: "Health Check",
    description: "Check if the API is running and responsive.",
    category: "utility",
    parameters: [],
    exampleResponse: {
      status: "ok",
      uptime: "99.98%",
      version: "1.0.0",
    },
  },
  {
    id: "utility-ping",
    method: "GET",
    path: "/ping",
    title: "Ping",
    description: "Simple ping endpoint for connectivity testing.",
    category: "utility",
    parameters: [],
    exampleResponse: {
      pong: true,
      timestamp: "2026-02-15T12:00:00Z",
    },
  },
];

export const BASE_URL = "https://api.ness.biz.id";
