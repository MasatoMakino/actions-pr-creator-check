import { execa } from "execa";
import { getTagBranchName } from "../getTagVersion.mjs";

await execa("git", ["fetch", "origin"]);
const branchName = await getTagBranchName();
const result = await execa("git", ["branch", "--merged", "origin/main"]);
if (!result.stdout.includes(branchName)) {
  throw new Error("Branch not merged");
}
