import { execa } from "execa";
import { getTagBranchName } from "../getTagVersion.mjs";

const branchName = await getTagBranchName();
const prResult = await execa("gh", [
  "pr",
  "create",
  "--fill",
  "--base",
  "main",
  "--head",
  branchName,
]);

console.log(prResult.stdout);

const result = await execa("gh", [
  "pr",
  "merge",
  branchName,
  "--merge",
  "--auto",
]);

if (result.stderr) {
  if (
    result.stderr ===
    "GraphQL: Pull request Protected branch rules not configured for this branch (enablePullRequestAutoMerge)"
  ) {
    console.log("open browser!");
  } else {
    console.error(result.stderr);
    process.exit(1);
  }
}
