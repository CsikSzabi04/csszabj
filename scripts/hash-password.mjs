// Generates the AUTH_PASSWORD_HASH value for the owner login (and a fresh AUTH_SECRET).
// Usage:  node scripts/hash-password.mjs            (asks for the password, input hidden)
//         node scripts/hash-password.mjs --secret   (also prints a new AUTH_SECRET)
// Paste the printed lines into .env.local and into the hosting provider's environment variables.
import { randomBytes, scrypt } from "node:crypto";
import process from "node:process";

const N = 16384;
const r = 8;
const p = 1;
const KEY_LENGTH = 32;

function readHidden(prompt) {
  return new Promise((resolve) => {
    const { stdin, stdout } = process;
    stdout.write(prompt);
    if (!stdin.isTTY) {
      let data = "";
      stdin.setEncoding("utf8");
      stdin.on("data", (chunk) => (data += chunk));
      stdin.on("end", () => resolve(data.replace(/\r?\n$/, "")));
      return;
    }
    let value = "";
    stdin.setRawMode(true);
    stdin.resume();
    stdin.setEncoding("utf8");
    const onData = (char) => {
      if (char === "\r" || char === "\n" || char === "\u0004") {
        stdin.setRawMode(false);
        stdin.pause();
        stdin.off("data", onData);
        stdout.write("\n");
        resolve(value);
      } else if (char === "\u0003") {
        process.exit(130);
      } else if (char === "\u007f" || char === "\b") {
        value = value.slice(0, -1);
      } else {
        value += char;
      }
    };
    stdin.on("data", onData);
  });
}

const password = (await readHidden("Password: ")).normalize("NFC");
if (password.length < 10) {
  console.error("Use at least 10 characters.");
  process.exit(1);
}

const salt = randomBytes(16);
const hash = await new Promise((resolve, reject) =>
  scrypt(password, salt, KEY_LENGTH, { N, r, p, maxmem: 64 * 1024 * 1024 }, (err, key) => (err ? reject(err) : resolve(key))),
);

console.log(`AUTH_PASSWORD_HASH=scrypt:${N}:${r}:${p}:${salt.toString("hex")}:${hash.toString("hex")}`);
if (process.argv.includes("--secret")) console.log(`AUTH_SECRET=${randomBytes(32).toString("hex")}`);
