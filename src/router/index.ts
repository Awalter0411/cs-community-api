import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import app from "../app/app.js";
const __dirname = fileURLToPath(new URL(".", import.meta.url));

function loadRouter() {
  const files = fs
    .readdirSync(path.join(__dirname), { encoding: "utf-8" })
    .filter((file) => file !== "index.ts");
  files.map(async (filename) => {
    const f = filename.substring(0, filename.length - 3) + ".js";
    const res = await import(`./${f}`);
    app.use("/api", res.default);
  });
}

export default loadRouter;
