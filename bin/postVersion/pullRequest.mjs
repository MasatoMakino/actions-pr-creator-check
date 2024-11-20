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

try {
  const result = await execa("gh", [
    "pr",
    "merge",
    branchName,
    "--merge",
    "--auto",
  ]);
} catch (e) {
  if (
    e.stderr ===
    "GraphQL: Pull request Protected branch rules not configured for this branch (enablePullRequestAutoMerge)"
  ) {
    const match = prResult.stdout.match(/\/pull\/(\d+)$/);
    if (match) {
      const prNumber = match[1];
      await execa("gh", ["browse", prNumber]);
    } else {
      console.error(e);
      throw e;
    }
  } else {
    console.error(e);
    throw e;
  }
}