import { execa } from "execa";
import { getTagBranchName } from "../getTagVersion.mjs";

/**
 * create pull request and merge it
 */
export async function pullRequest() {
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

  try {
    const result = await execa("gh", [
      "pr",
      "merge",
      branchName,
      "--merge",
      "--auto",
    ]);
  } catch (e) {
    if (e.stderr.includes("(enablePullRequestAutoMerge)")) {
      const match = prResult.stdout.match(/\/pull\/(\d+)$/);
      if (match) {
        const prNumber = match[1];
        await execa("gh", ["browse", prNumber]);
      } else {
        throw e;
      }
    } else {
      throw e;
    }
  }
}
