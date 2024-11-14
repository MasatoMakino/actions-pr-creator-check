import { execa } from "execa";

export async function getTagVersion() {
  return await execa("git", ["describe", "--tags", "--abbrev=0"]);
}
