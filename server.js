const crypto = require("crypto");
const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;
const contentPath = process.env.ARKAN_CONTENT_FILE || path.join(__dirname, "files", "site-content.json");
const adminPassword = process.env.ADMIN_PASSWORD;
const sessionSecret = process.env.SESSION_SECRET;

if (!adminPassword || !sessionSecret) throw new Error("ADMIN_PASSWORD and SESSION_SECRET must be set before starting the server.");

app.use(express.json({ limit: "20kb" }));
const legacyRoutes = {
  "/index.html": "/", "/Education.html": "/education", "/Events.html": "/programs", "/Donation.html": "/donate",
  "/Contactus.html": "/contact", "/AboutUs.html": "/about", "/timetable.html": "/prayer-times", "/admin.html": "/admin"
};
Object.entries(legacyRoutes).forEach(([legacy, clean]) => app.get(legacy, (req, res) => res.redirect(301, clean)));
app.use(express.static(__dirname, { setHeaders(res) { res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0"); res.setHeader("Pragma", "no-cache"); res.setHeader("Expires", "0"); } }));

function readContent() { return JSON.parse(fs.readFileSync(contentPath, "utf8")); }
function writeContent(content) { fs.writeFileSync(contentPath, JSON.stringify(content, null, 2)); }
function safeEqual(left, right) { const a = Buffer.from(String(left)); const b = Buffer.from(String(right)); return a.length === b.length && crypto.timingSafeEqual(a, b); }
function sign(value) { return crypto.createHmac("sha256", sessionSecret).update(value).digest("hex"); }
function isAdmin(req) { const token = req.headers.cookie?.split(";").map((part) => part.trim()).find((part) => part.startsWith("masjid_arkan_session="))?.split("=")[1]; return Boolean(token && safeEqual(token, sign("admin"))); }
function requireAdmin(req, res, next) { if (!isAdmin(req)) return res.status(401).json({ error: "Unauthorized" }); next(); }
function cleanTime(value) { return String(value || "").trim().slice(0, 30); }

app.get("/api/content", (req, res) => res.json(readContent()));
app.get("/api/admin/content", requireAdmin, (req, res) => res.json(readContent()));
app.post("/api/login", (req, res) => {
  if (!req.body?.password || !safeEqual(req.body.password, adminPassword)) return res.status(401).json({ error: "Incorrect password" });
  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
  res.setHeader("Set-Cookie", `masjid_arkan_session=${sign("admin")}; HttpOnly; SameSite=Strict; Path=/; Max-Age=28800${secure}`);
  res.json({ ok: true });
});
app.post("/api/logout", (req, res) => { res.setHeader("Set-Cookie", "masjid_arkan_session=; HttpOnly; SameSite=Strict; Path=/; Max-Age=0"); res.json({ ok: true }); });
app.put("/api/content", requireAdmin, (req, res) => {
  const source = req.body || {};
  const iqamaTimes = source.iqamaTimes || {};
  const content = {
    iqamaTimes: { fajr: cleanTime(iqamaTimes.fajr), dhuhr: cleanTime(iqamaTimes.dhuhr), asr: cleanTime(iqamaTimes.asr), maghrib: cleanTime(iqamaTimes.maghrib), isha: cleanTime(iqamaTimes.isha) },
    jumuah: cleanTime(source.jumuah),
    announcements: Array.isArray(source.announcements) ? source.announcements.slice(0, 3).map((line) => String(line || "").trim().slice(0, 160)).filter(Boolean) : []
  };
  if (Object.values(content.iqamaTimes).some((time) => !time)) return res.status(400).json({ error: "Please provide all five Iqamah times." });
  writeContent(content);
  res.json(content);
});
const pageRoutes = {
  "/education": "Education.html",
  "/programs": "Events.html",
  "/donate": "Donation.html",
  "/contact": "Contactus.html",
  "/about": "AboutUs.html",
  "/prayer-times": "timetable.html",
  "/admin": "admin.html"
};
Object.entries(pageRoutes).forEach(([clean, file]) => app.get(clean, (req, res) => res.sendFile(path.join(__dirname, file))));
app.listen(port, () => console.log(`Masjid Arkan running on port ${port}`));
