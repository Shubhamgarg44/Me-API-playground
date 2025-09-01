// index.js
const fs = require("fs");

// read JSON (file path or stdin)
const raw = process.argv[2] ? fs.readFileSync(process.argv[2], "utf8")
                            : fs.readFileSync(0, "utf8");
const data = JSON.parse(raw);

// robust base→BigInt (no parseInt radix quirks or size limits)
function baseToBigInt(str, base) {
  const s = str.trim().toLowerCase();
  const b = BigInt(base);
  let val = 0n;
  for (const ch of s) {
    let d = ch >= '0' && ch <= '9' ? BigInt(ch.charCodeAt(0) - 48)
          : ch >= 'a' && ch <= 'z' ? BigInt(10 + ch.charCodeAt(0) - 97)
          : null;
    if (d === null || d >= b) throw new Error(`Invalid digit '${ch}' for base ${base}`);
    val = val * b + d;
  }
  return val;
}

// collect and decode ALL roots (ignore "keys")
const decoded = [];
for (const k of Object.keys(data)) {
  if (k === "keys") continue;
  const { base, value } = data[k];
  decoded.push(baseToBigInt(String(value), Number(base)));
}

// multiply ALL roots → constant term c for monic polynomial with these roots
if (decoded.length === 0) {
  console.error("No roots provided.");
  process.exit(1);
}
let c = 1n;
for (const r of decoded) c *= r;

console.log(c.toString());
