const fs = require("fs");
const path = require("path");

const CONFIGPATH = path.resolve(__dirname, "../../../../config.svy");

if (!fs.existsSync(CONFIGPATH)) {
  console.error("[ERROR] Config not found");
  process.exit(1);
}

const CONFIG = JSON.parse(fs.readFileSync(CONFIGPATH));

const V = {
  v1: "SYV-A0324F55-DD88-4E5A-8DD7-516CC1CDA6E3",
};

const render = ["multidevice"];

if (!render.includes(CONFIG.render)) {
  console.error("[ERROR] Invalid Render Mode");
  process.exit(1);
}

if (!Object.values(V).includes(CONFIG.V)) {
  console.error("[ERROR] Invalid Version");
  process.exit(1);
}
