import { execa, ExecaError } from "execa";
import { getTagBranchName } from "../getTagVersion.js";

/**
 * create pull request and merge it
 */
export async function pullRequest(): Promise<void> {
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
  } catch (e: unknown) {
    if (isExecaError(e) && e.stderr.includes("(enablePullRequestAutoMerge)")) {
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

function isExecaError(e: unknown): e is ExecaError {
  return (e as ExecaError).name === "ExecaError";
}
