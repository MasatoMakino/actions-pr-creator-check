import { execa } from "execa";

await execa("git", ["add", "package.json package-lock.json"]);
