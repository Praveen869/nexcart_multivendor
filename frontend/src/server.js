const isLocalhost = typeof window !== "undefined" && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1");

export const server = isLocalhost 
  ? "http://localhost:8000/api/v2" 
  : "https://nexcart-backend-wkfk.onrender.com/api/v2";

export const backend_url = isLocalhost 
  ? "http://localhost:8000/" 
  : "https://nexcart-backend-wkfk.onrender.com/";

