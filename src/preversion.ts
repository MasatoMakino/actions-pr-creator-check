import { execa } from "execa";

await execa("git", ["checkout", "main"]);
await execa("git", ["pull", "origin", "main"]);
await execa("npm", ["ci"]);

const resultTest = await execa("npm", ["test"]);
console.log(resultTest.stdout);
