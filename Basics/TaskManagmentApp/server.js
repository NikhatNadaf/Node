// backend/server.js
const http = require("http");
const { createClient } = require("@supabase/supabase-js");

// Supabase client
const supabase = createClient(
  "https://aapshvcoklnyzkqdgycx.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFhcHNodmNva2xueXprcWRneWN4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUxNTU2MzksImV4cCI6MjA3MDczMTYzOX0.9K0nygbFRiWED3z167iflsRwzVYkXnUxiXpEjHEdVwk"
);

const PORT = 5000;

// Helper: Send JSON response
function sendJson(res, status, data) {
  res.writeHead(status, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*", // Allow frontend
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  });
  res.end(JSON.stringify(data));
}

// Helper: Parse request body
function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => {
      try {
        resolve(JSON.parse(body || "{}"));
      } catch {
        reject(new Error("Invalid JSON"));
      }
    });
  });
}

const server = http.createServer(async (req, res) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    res.writeHead(204, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    });
    return res.end();
  }

  // ------------------ GET ALL TASKS ------------------
  if (req.url === "/tasks" && req.method === "GET") {
    const { data, error } = await supabase.from("tasks").select("*").order("id");
    if (error) return sendJson(res, 500, { error: error.message });
    return sendJson(res, 200, data);
  }

  // ------------------ CREATE TASK ------------------
  if (req.url === "/tasks" && req.method === "POST") {
    try {
      const { title } = await parseBody(req);
      const { data, error } = await supabase.from("tasks").insert([{ title }]).select().single();
      if (error) return sendJson(res, 500, { error: error.message });
      return sendJson(res, 201, data);
    } catch (err) {
      return sendJson(res, 400, { error: err.message });
    }
  }

  // ------------------ UPDATE TASK ------------------
  if (req.url.startsWith("/tasks/") && req.method === "PUT") {
    const id = req.url.split("/")[2];
    try {
      const { title } = await parseBody(req);
      const { data, error } = await supabase.from("tasks").update({ title }).eq("id", id).select().single();
      if (error) return sendJson(res, 500, { error: error.message });
      return sendJson(res, 200, data);
    } catch (err) {
      return sendJson(res, 400, { error: err.message });
    }
  }

  // ------------------ DELETE TASK ------------------
  if (req.url.startsWith("/tasks/") && req.method === "DELETE") {
    const id = req.url.split("/")[2];
    const { error } = await supabase.from("tasks").delete().eq("id", id);
    if (error) return sendJson(res, 500, { error: error.message });
    return sendJson(res, 200, { message: "Task deleted" });
  }

  // ------------------ DEFAULT ------------------
  sendJson(res, 404, { error: "Not found" });
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
