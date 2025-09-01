const fs = require("fs");

// Step 1: read JSON (from file or stdin)
let raw;
if (process.argv.length > 2) {
  raw = fs.readFileSync(process.argv[2], "utf8");
} else {
  raw = fs.readFileSync(0, "utf8"); // stdin
}
const data = JSON.parse(raw);

// Step 2: extract degree
const k = data.keys.k;
const degree = k - 1; // since k = m+1

// Step 3: collect roots (convert from base → decimal)
const decoded = [];
for (const key of Object.keys(data)) {
  if (key === "keys") continue;
  const base = parseInt(data[key].base, 10);
  const valueStr = data[key].value;
  const value = parseInt(valueStr, base);  // Number conversion with base
  decoded.push(BigInt(value));
}

// Debug log: show decoded roots
console.log("Decoded roots:", decoded.map(String));

// Step 4: need at least "degree" roots
if (decoded.length < degree) {
  console.error(`Need at least ${degree} roots`);
  process.exit(1);
}

// Step 5: compute product of first m roots
let product = 1n;
for (let i = 0; i < degree; i++) {
  product *= decoded[i];
}

// Step 6: print constant term
console.log("Constant term c =", product.toString());
